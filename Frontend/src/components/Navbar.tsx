
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Calendar, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Settings,
  Gift
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  const userLinks = [
    { to: '/services', label: 'Services', icon: Home },
    { to: '/book', label: 'Book Now', icon: Calendar },
    { to: '/appointments', label: 'My Appointments', icon: Calendar },
    { to: '/vouchers', label: 'Vouchers', icon: Gift },
    { to: '/feedback', label: 'Feedback', icon: User },
  ];

  const adminLinks = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: Home },
    { to: '/admin/services', label: 'Services', icon: Settings },
    { to: '/admin/appointments', label: 'Appointments', icon: Calendar },
    { to: '/admin/vouchers', label: 'Vouchers', icon: Gift },
    { to: '/admin/feedback', label: 'Feedback', icon: User },
  ];

  const links = user?.role === 'admin' ? adminLinks : userLinks;

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-rose-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-purple-600 rounded-lg flex items-center justify-center overflow-hidden">
          <img
            src="/favicon.ico"  // Path to your icon file
            alt="Salon Bliss Logo"
            className="w-5 h-5"
          />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
          Salon Bliss
        </span>
      </Link>


          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                {links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                        isActive(link.to)
                          ? 'bg-rose-100 text-rose-700'
                          : 'text-gray-600 hover:text-rose-600 hover:bg-rose-50'
                      }`}
                    >
                      <Icon size={16} />
                      <span className="text-sm font-medium">{link.label}</span>
                    </Link>
                  );
                })}
                <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-gray-200">
                  <span className="text-sm text-gray-600">
                    Welcome, {user.name}
                  </span>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-1"
                  >
                    <LogOut size={14} />
                    <span>Logout</span>
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/services" className="text-gray-600 hover:text-rose-600 transition-colors">
                  Services
                </Link>
                <Link
                  to="/login"
                  className="text-rose-600 hover:text-rose-700 font-medium transition-colors"
                >
                  Login
                </Link>
                <Button asChild className="bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700">
                  <Link to="/register">Get Started</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-rose-600 hover:bg-rose-50"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 pt-2">
            {user ? (
              <>
                <div className="space-y-2">
                  {links.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                          isActive(link.to)
                            ? 'bg-rose-100 text-rose-700'
                            : 'text-gray-600 hover:text-rose-600 hover:bg-rose-50'
                        }`}
                      >
                        <Icon size={16} />
                        <span className="font-medium">{link.label}</span>
                      </Link>
                    );
                  })}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Welcome, {user.name}</p>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-1 w-full"
                  >
                    <LogOut size={14} />
                    <span>Logout</span>
                  </Button>
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <Link
                  to="/services"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 text-gray-600 hover:text-rose-600 transition-colors"
                >
                  Services
                </Link>
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 text-rose-600 font-medium"
                >
                  Login
                </Link>
                <Button asChild className="w-full bg-gradient-to-r from-rose-500 to-purple-600">
                  <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
