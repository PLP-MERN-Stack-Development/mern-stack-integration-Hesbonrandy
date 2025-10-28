import { Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Link } from 'react-router-dom';

export default function App() {
  const { user, logout } = useAuth();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>My Blog</h1>
        {user ? (
          <div>
            <span>{user.email}</span>
            <button onClick={logout} style={{ marginLeft: '1rem' }}>Logout</button>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </header>
      <hr />
      <main>
        <Outlet />
      </main>
    </div>
  );
}