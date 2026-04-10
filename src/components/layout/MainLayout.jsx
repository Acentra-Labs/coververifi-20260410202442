import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard, Building2, HardHat, Shield, Users, Mail,
  FileText, LogOut, Menu, X, ChevronDown, Bell
} from 'lucide-react';

const NAV_ADMIN = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/contractors', label: 'Contractors', icon: Building2 },
  { to: '/subcontractors', label: 'Subcontractors', icon: HardHat },
  { to: '/policies', label: 'Policies', icon: Shield },
  { to: '/agents', label: 'Agents', icon: Users },
  { to: '/verifications', label: 'Verifications', icon: FileText },
  { to: '/emails', label: 'Email Log', icon: Mail },
];

const NAV_GC = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/subcontractors', label: 'My Subcontractors', icon: HardHat },
  { to: '/policies', label: 'Policies', icon: Shield },
  { to: '/verifications', label: 'Verifications', icon: FileText },
];

export default function MainLayout() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navItems = isAdmin ? NAV_ADMIN : NAV_GC;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-electric/10 text-electric'
        : 'text-gray-300 hover:bg-white/5 hover:text-white'
    }`;

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-navy z-40 flex flex-col transition-transform duration-200
        lg:translate-x-0 lg:static lg:z-auto
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric to-cyan flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold text-lg">CoverVerifi</span>
          </div>
          <button
            className="lg:hidden text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={linkClasses}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-electric/20 flex items-center justify-center text-electric text-xs font-bold">
              {user?.avatar_initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white font-medium truncate">{user?.name}</p>
              <p className="text-xs text-gray-400 truncate capitalize">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-6">
          <button
            className="lg:hidden p-2 -ml-2 rounded-md hover:bg-gray-100"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>

          <div className="hidden lg:block">
            <h1 className="text-sm font-medium text-gray-400">
              Idaho Subcontractor Insurance Compliance
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5 text-gray-500" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="relative">
              <button
                onClick={() => setProfileOpen(p => !p)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-navy flex items-center justify-center text-white text-xs font-bold">
                  {user?.avatar_initials}
                </div>
                <span className="hidden sm:block text-sm font-medium text-gray-700">{user?.name}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              {profileOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white px-4 lg:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
            <p>CoverVerifi &copy; {new Date().getFullYear()} &mdash; Built by Acentra Labs</p>
            <p>Idaho Subcontractor Insurance Compliance Platform</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
