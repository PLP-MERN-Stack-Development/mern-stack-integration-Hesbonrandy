import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // Load categories
  useEffect(() => {
    axios.get('/api/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error('Error loading categories:', err));
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
          alert('Failed to load post for editing');
          navigate('/');
        });
    }
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const postData = { title, content, category };

    try {
      if (isEditing) {
        await axios.put(`/api/posts/${id}`, postData);
      } else {
        await axios.post('/api/posts', postData);
      }
      navigate('/');
    } catch (err) {
      console.error('Save error:', err.response?.data || err.message);
      alert('Failed to save post. Please check the form.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEditing ? 'Edit Post' : 'Create New Post'}</h2>
      <div style={{ marginBottom: '1rem' }}>
        <label>Title:</label><br />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>Category:</label><br />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          style={{ width: '100%', padding: '0.5rem' }}
        >
          <option value="">-- Select Category --</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>Content:</label><br />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows="10"
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : isEditing ? 'Update Post' : 'Create Post'}
      </button>
      <button type="button" onClick={() => navigate('/')} style={{ marginLeft: '1rem' }}>
        Cancel
      </button>
    </form>
  );
}