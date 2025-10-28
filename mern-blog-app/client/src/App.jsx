import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      <h1>My MERN Blog</h1>
      <hr />
      <main>
        <Outlet />
      </main>
    </div>
  );
}