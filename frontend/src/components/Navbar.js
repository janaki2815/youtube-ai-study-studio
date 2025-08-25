import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User, Sparkles, Home } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="border-b bg-gradient-to-r from-primary-600/90 via-primary-600 to-primary-700 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-white/20 backdrop-blur-xs grid place-items-center shadow-glass animate-float">
                <span className="text-white font-bold">AI</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight">
                Learning Hub
              </h1>
            </div>
            
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              <Link
                to="/dashboard"
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  isActive('/dashboard') 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              
              <Link
                to="/summarizer"
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  isActive('/summarizer') 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Sparkles className="h-4 w-4" />
                <span>Summarizer</span>
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2 text-white/90 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-xs">
              <User size={18} />
              <span className="font-medium">{user?.username}</span>
            </div>
            
            <button
              onClick={logout}
              className="btn-ghost bg-white/10 text-white hover:bg-white/20 rounded-lg"
            >
              <LogOut size={18} />
              <span className="ml-2">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
