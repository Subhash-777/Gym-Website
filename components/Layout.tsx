
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark bg-[#121212] text-slate-200' : 'bg-gray-50 text-slate-900'}`}>
      {/* Navigation Bar */}
      {isAuthenticated && (
        <nav className={`sticky top-0 z-50 border-b ${isDark ? 'bg-[#1e1e1e]/80 border-slate-700' : 'bg-white/80 border-gray-200'} backdrop-blur-md`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-700 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
                <span className="text-xl font-bold tracking-tight">APEX GYM</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <button 
                  onClick={toggleTheme}
                  className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-gray-100 text-gray-500'}`}
                  title="Toggle Theme"
                >
                  {isDark ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                  )}
                </button>

                <div className="flex items-center space-x-3 ml-4 border-l pl-4 border-slate-700/50">
                  <div className="hidden sm:block text-right">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-slate-500 capitalize">{user?.role.toLowerCase()}</p>
                  </div>
                  <button 
                    onClick={logout}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-md transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Mobile-first bottom nav could go here if needed for mobile */}
    </div>
  );
};

export default Layout;
