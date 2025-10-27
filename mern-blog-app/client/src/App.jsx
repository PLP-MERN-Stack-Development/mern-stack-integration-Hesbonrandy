import { Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

function App() {
  const { user, logout } = useAuth();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>My MERN Blog</h1>
        {user ? (
          <div>
            <span>Welcome, {user.email}</span>
            <button onClick={logout} style={{ marginLeft: '1rem' }}>Logout</button>
          </div>
        ) : (
          <span>Not logged in</span>
        )}
      </header>
      <hr style={{ margin: '1rem 0' }} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;