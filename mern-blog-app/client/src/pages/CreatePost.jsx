import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/categories')
      .then(res => setCategories(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/posts', { title, content, category });
      navigate('/');
    } catch (err) {
      alert('Error saving post');
      console.error(err);
    }
  };

  <div>
  <h3>Create Category</h3>
  <form onSubmit={handleCreateCategory} style={{ display: 'flex', gap: '0.5rem' }}>
    <input
      type="text"
      value={newCategory}
      onChange={(e) => setNewCategory(e.target.value)}
      placeholder="New category name"
      required
    />
    <button type="submit">Add Category</button>
  </form>
</div>
  const [newCategory, setNewCategory] = useState('');

  const handleCreateCategory = async (e) => {
  e.preventDefault();
  try {
    await axios.post('/api/categories', { name: newCategory });
    setNewCategory('');
    // Refresh categories
    const res = await axios.get('/api/categories');
    setCategories(res.data);
  } catch (err) {
    alert('Failed to create category');
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Post</h2>
      <div>
        <label>Title:</label>
        <input value={title} onChange={e => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Category:</label>
        <select value={category} onChange={e => setCategory(e.target.value)} required>
          <option value="">Select</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Content:</label>
        <textarea value={content} onChange={e => setContent(e.target.value)} required rows="5" />
      </div>
      <button type="submit">Create Post</button>
    </form>
  );
}