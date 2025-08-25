import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="border-b bg-gradient-to-r from-primary-600/90 via-primary-600 to-primary-700 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-white/20 backdrop-blur-xs grid place-items-center shadow-glass animate-float">
                <span className="text-white font-bold">AI</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight">
                Learning Hub
              </h1>
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
