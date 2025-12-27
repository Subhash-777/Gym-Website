
import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { UserRole } from './types';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import MemberDashboard from './components/MemberDashboard';

const AppContent: React.FC = () => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const [currentView, setCurrentView] = useState<'landing' | 'login'>('landing');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-red-700 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-slate-500 font-medium tracking-widest text-xs uppercase">Initializing Apex Systems...</span>
        </div>
      </div>
    );
  }

  // If authenticated, show the appropriate dashboard
  if (isAuthenticated && user) {
    return (
      <Layout>
        {user.role === UserRole.ADMIN ? <AdminDashboard /> : <MemberDashboard />}
      </Layout>
    );
  }

  // Otherwise, handle public landing/login states
  return (
    <Layout>
      {currentView === 'landing' ? (
        <LandingPage onLoginClick={() => setCurrentView('login')} />
      ) : (
        <LoginPage />
      )}
      
      {/* View Switcher for Auth Pages */}
      {currentView === 'login' && !isAuthenticated && (
        <button 
          onClick={() => setCurrentView('landing')}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-2 text-slate-500 hover:text-white transition-colors text-sm font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          <span>Back to Home</span>
        </button>
      )}
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
