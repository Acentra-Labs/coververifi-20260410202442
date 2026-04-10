import { createContext, useContext, useState, useCallback } from 'react';
import { users } from '../data/mockData';

const AuthContext = createContext(null);

const CREDENTIALS = {
  'dawn@coververifi.com': { password: 'admin123', userId: 'usr-001' },
  'mike@treasurevalley.com': { password: 'gc123', userId: 'usr-002' },
  'sarah@boisebuild.com': { password: 'gc123', userId: 'usr-003' },
  'demo@coververifi.com': { password: 'demo123', userId: 'usr-004' },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem('cv_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback((email, password) => {
    const cred = CREDENTIALS[email.toLowerCase()];
    if (!cred || cred.password !== password) {
      return { success: false, error: 'Invalid email or password' };
    }
    const userData = users.find(u => u.id === cred.userId);
    if (!userData) {
      return { success: false, error: 'User account not found' };
    }
    setUser(userData);
    sessionStorage.setItem('cv_user', JSON.stringify(userData));
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem('cv_user');
  }, []);

  const isAdmin = user?.role === 'admin';
  const isGC = user?.role === 'gc';

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, isGC }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
