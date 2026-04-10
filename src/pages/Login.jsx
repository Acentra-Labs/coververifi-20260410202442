import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/shared/Toast';
import { Shield, Eye, EyeOff } from 'lucide-react';
import { validateEmail, validateRequired } from '../utils/validators';

export default function Login() {
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    const emailErr = validateEmail(email);
    const passErr = validateRequired(password, 'Password');
    if (emailErr) newErrors.email = emailErr;
    if (passErr) newErrors.password = passErr;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    // Simulate network delay
    setTimeout(() => {
      const result = login(email, password);
      setLoading(false);
      if (result.success) {
        addToast('Welcome to CoverVerifi!', 'success');
        navigate('/dashboard');
      } else {
        setErrors({ form: result.error });
        addToast(result.error, 'error');
      }
    }, 600);
  };

  const fillDemo = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-navy-lighter flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-electric to-cyan mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">CoverVerifi</h1>
          <p className="text-gray-400 mt-1">Subcontractor Insurance Compliance</p>
        </div>

        {/* Login form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Sign in to your account</h2>

          {errors.form && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: undefined })); }}
                className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-electric/50 focus:border-electric ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
                placeholder="you@company.com"
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: undefined })); }}
                  className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-electric/50 focus:border-electric pr-10 ${errors.password ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-electric hover:bg-electric-dark text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-3 font-medium uppercase tracking-wider">Demo Accounts</p>
            <div className="space-y-2">
              <button
                onClick={() => fillDemo('dawn@coververifi.com', 'admin123')}
                className="w-full text-left px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-sm"
              >
                <span className="font-medium text-gray-700">Admin:</span>{' '}
                <span className="text-gray-500">dawn@coververifi.com / admin123</span>
              </button>
              <button
                onClick={() => fillDemo('mike@treasurevalley.com', 'gc123')}
                className="w-full text-left px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-sm"
              >
                <span className="font-medium text-gray-700">GC:</span>{' '}
                <span className="text-gray-500">mike@treasurevalley.com / gc123</span>
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-500 text-xs mt-6">
          Built by Acentra Labs &mdash; Idaho Construction Compliance
        </p>
      </div>
    </div>
  );
}
