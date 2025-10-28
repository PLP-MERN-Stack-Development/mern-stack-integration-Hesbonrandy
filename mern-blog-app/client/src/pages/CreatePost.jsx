import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState(''); // For new category input
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // Load categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('/api/categories');
        setCategories(res.data);
      } catch (err) {
        console.error('Error loading categories:', err);
      }
    };
    fetchCategories();
  }, []);

  // If editing, load post data
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
          console.error('Error loading post:', err);
          alert('Failed to load post');
          navigate('/');
        });
    }
  }, [id, navigate]);

  // Handle post creation/update
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
      alert('Failed to save post. Please ensure a category is selected.');
      console.error(err);
    }
  };

  // Handle new category creation
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    try {
      await axios.post('/api/categories', { name: newCategory.trim() });
      setNewCategory('');

      // Refresh category list
      const res = await axios.get('/api/categories');
      setCategories(res.data);

      // Optionally auto-select the new category
      const newCat = res.data.find(cat => cat.name === newCategory.trim());
      if (newCat) setCategory(newCat._id);
    } catch (err) {
      alert('Failed to create category. It may already exist.');
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>{isEditing ? 'Edit Post' : 'Create New Post'}</h2>

      {/* ➕ Add Category Section */}
      <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '4px' }}>
        <h3>Add New Category</h3>
        <form onSubmit={handleCreateCategory} style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="e.g., Technology, Travel, Food"
            required
            style={{ flex: 1, padding: '0.5rem' }}
          />
          <button type="submit" style={{ padding: '0.5rem 1rem' }}>
            Add Category
          </button>
        </form>
      </div>

      {/* 📝 Post Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div>
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
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
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="8"
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div>
          <button type="submit" style={{ padding: '0.75rem 1.5rem', fontSize: '1rem' }}>
            {isEditing ? 'Update Post' : 'Create Post'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            style={{ marginLeft: '1rem', padding: '0.75rem 1.5rem' }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}