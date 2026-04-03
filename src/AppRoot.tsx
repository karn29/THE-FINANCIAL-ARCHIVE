import { useState, useEffect } from 'react';
import { AuthPage } from './components/AuthPage';
import App from './App';

export default function AppRoot() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedInUser');
    if (loggedIn) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuthenticated = (_user: { name: string; email: string }) => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <AuthPage onAuthenticated={handleAuthenticated} />;
  }

  return <App />;
}
