import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editingCatId, setEditingCatId] = useState(null);
  const [editCatName, setEditCatName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // Load categories
  useEffect(() => {
    fetchCategories();
  }, []);

  // Load post if editing
  useEffect(() => {
    if (id) {
      setIsEditing(true);
      axios.get(`/api/posts/${id}`)
        .then(res => {
          setTitle(res.data.title);
          setContent(res.data.content);
          setCategory(res.data.category._id);
        })
        .catch(err => {
          console.error(err);
          navigate('/');
        });
    }
  }, [id, navigate]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Error loading categories:', err);
    }
  };

  // Create post
  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = { title, content, category };

    try {
      if (isEditing) {
        await axios.put(`/api/posts/${id}`, postData);
      } else {
        await axios.post('/api/posts', postData);
      }
      navigate('/');
    } catch (err) {
      alert('Failed to save post. Please select a valid category.');
    }
  };

  // Add new category
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    try {
      await axios.post('/api/categories', { name: newCategory.trim() });
      setNewCategory('');
      fetchCategories();
    } catch (err) {
      alert('Failed to create category. It may already exist.');
    }
  };

  // Start editing a category
  const startEditCategory = (cat) => {
    setEditingCatId(cat._id);
    setEditCatName(cat.name);
  };

  // Save edited category
  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/categories/${editingCatId}`, { name: editCatName });
      setEditingCatId(null);
      setEditCatName('');
      fetchCategories();
    } catch (err) {
      alert('Failed to update category.');
    }
  };

  // Delete category
  const handleDeleteCategory = async (catId, catName) => {
    if (!window.confirm(`Delete category "${catName}"? All posts in this category will lose their category.`)) return;

    try {
      await axios.delete(`/api/categories/${catId}`);
      fetchCategories();
      // If deleted category was selected, clear selection
      if (category === catId) setCategory('');
    } catch (err) {
      alert('Failed to delete category.');
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <h2>{isEditing ? 'Edit Post' : 'Create New Post'}</h2>

      {/* 🗂️ Category Management */}
      <div style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
        <h3 style={{ marginTop: 0 }}>Manage Categories</h3>

        {/* ➕ Add Category */}
        <form onSubmit={handleCreateCategory} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Add new category (e.g., Technology)"
            required
            style={{ flex: 1, padding: '0.6rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button type="submit" style={{ padding: '0.6rem 1rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Add
          </button>
        </form>

        {/* 📋 Category List */}
        <div>
          <h4>Existing Categories ({categories.length})</h4>
          {categories.length === 0 ? (
            <p>No categories yet.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {categories.map(cat => (
                <li key={cat._id} style={{ display: 'flex', alignItems: 'center', padding: '0.5rem', borderBottom: '1px solid #eee' }}>
                  {editingCatId === cat._id ? (
                    // Edit mode
                    <form onSubmit={handleUpdateCategory} style={{ display: 'flex', gap: '0.5rem', flex: 1 }}>
                      <input
                        type="text"
                        value={editCatName}
                        onChange={(e) => setEditCatName(e.target.value)}
                        required
                        style={{ flex: 1, padding: '0.4rem', borderRadius: '4px', border: '1px solid #ccc' }}
                      />
                      <button type="submit" style={{ padding: '0.4rem 0.8rem', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '4px' }}>
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingCatId(null)}
                        style={{ padding: '0.4rem 0.8rem', backgroundColor: '#9E9E9E', color: 'white', border: 'none', borderRadius: '4px', marginLeft: '0.5rem' }}
                      >
                        Cancel
                      </button>
                    </form>
                  ) : (
                    // View mode
                    <>
                      <span style={{ flex: 1 }}>{cat.name}</span>
                      <button
                        onClick={() => startEditCategory(cat)}
                        style={{ padding: '0.3rem 0.6rem', marginRight: '0.5rem', backgroundColor: '#FF9800', color: 'white', border: 'none', borderRadius: '4px' }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(cat._id, cat.name)}
                        style={{ padding: '0.3rem 0.6rem', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px' }}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* 📝 Post Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <div>
          <label><strong>Title:</strong></label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: '0.7rem', marginTop: '0.3rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div>
          <label><strong>Category:</strong></label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            style={{ width: '100%', padding: '0.7rem', marginTop: '0.3rem', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="">-- Select Category --</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label><strong>Content:</strong></label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="10"
            style={{ width: '100%', padding: '0.7rem', marginTop: '0.3rem', borderRadius: '4px', border: '1px solid #ccc', fontFamily: 'inherit' }}
          />
        </div>

        <div>
          <button type="submit" style={{ padding: '0.8rem 2rem', fontSize: '1.1rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            {isEditing ? 'Update Post' : 'Create Post'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            style={{ marginLeft: '1rem', padding: '0.8rem 2rem', fontSize: '1.1rem', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}