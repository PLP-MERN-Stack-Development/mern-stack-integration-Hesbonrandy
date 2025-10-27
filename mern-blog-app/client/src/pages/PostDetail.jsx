import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/posts/${id}`)
      .then(res => {
        setPost(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching post:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading post...</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p><strong>Category:</strong> {post.category?.name}</p>
      <p>{post.content}</p>
      <p><em>By {post.author} on {new Date(post.createdAt).toLocaleDateString()}</em></p>
      <Link to="/">← Back to Posts</Link>
    </div>
  );
}