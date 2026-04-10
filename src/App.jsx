import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { ToastProvider } from './components/shared/Toast';
import MainLayout from './components/layout/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Contractors from './pages/Contractors';
import Subcontractors from './pages/Subcontractors';
import Policies from './pages/Policies';
import Agents from './pages/Agents';
import Verifications from './pages/Verifications';
import EmailLog from './pages/EmailLog';

function ProtectedRoute({ children, adminOnly = false }) {
  const { user, isAdmin } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && !isAdmin) return <Navigate to="/dashboard" replace />;
  return children;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contractors" element={<ProtectedRoute adminOnly><Contractors /></ProtectedRoute>} />
        <Route path="/subcontractors" element={<Subcontractors />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="/agents" element={<ProtectedRoute adminOnly><Agents /></ProtectedRoute>} />
        <Route path="/verifications" element={<Verifications />} />
        <Route path="/emails" element={<ProtectedRoute adminOnly><EmailLog /></ProtectedRoute>} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <DataProvider>
            <AppRoutes />
          </DataProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
