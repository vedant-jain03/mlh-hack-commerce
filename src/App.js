import './App.css';
import Dashboard from './components/Dashboard';
import LoginButton from './components/Login';
import LogoutButton from './components/Logout';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="App">
      <Navbar />
      <Dashboard />
    </div>
  );
}

export default App;
