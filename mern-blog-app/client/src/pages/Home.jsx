import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleDelete = async (id) => {
  if (window.confirm('Delete this post?')) {
    try {
      await axios.delete(`/api/posts/${id}`);
      setPosts(posts.filter(post => post._id !== id));
    } catch (err) {
      alert('Failed to delete post');
    }
  }
};

  useEffect(() => {
    axios.get('/api/posts')
      .then(res => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching posts:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading posts...</p>;

  return (
    <div>
      <h2>Blog Posts</h2>
      <Link to="/posts/new" style={{ display: 'block', marginBottom: '1rem' }}>
        ➕ Create New Post
      </Link>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map(post => (
          <div key={post._id} style={{ border: '1px solid #eee', padding: '1rem', margin: '1rem 0' }}>
            <h3><Link to={`/posts/${post._id}`}>{post.title}</Link></h3>
            <p>Category: {post.category?.name || 'Uncategorized'}</p>
            <button onClick={() => handleDelete(post._id)}>Delete</button>
            <small>{new Date(post.createdAt).toLocaleDateString()}</small>
          </div>
        ))
      )}
    </div>
  );
}