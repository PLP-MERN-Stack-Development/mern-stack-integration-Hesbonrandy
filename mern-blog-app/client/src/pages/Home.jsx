import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/posts')
      .then(res => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this post?')) {
      try {
        await axios.delete(`/api/posts/${id}`);
        setPosts(posts.filter(post => post._id !== id));
      } catch (err) {
        alert('Failed to delete');
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Posts</h2>
      <Link to="/posts/new">➕ New Post</Link>
      {posts.map(post => (
        <div key={post._id} style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
          <h3><Link to={`/posts/${post._id}`}>{post.title}</Link></h3>
          <p>Category: {post.category?.name}</p>
          <button onClick={() => handleDelete(post._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}