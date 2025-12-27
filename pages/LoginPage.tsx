
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { useTheme } from '../context/ThemeContext';

const LoginPage: React.FC = () => {
  const { login, isLoading } = useAuth();
  const { isDark } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.MEMBER);
  const [error, setError] = useState('');
  const [showDemo, setShowDemo] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    await login(email, role);
  };

  const fillDemo = (r: UserRole) => {
    setRole(r);
    setEmail(r === UserRole.ADMIN ? 'admin@apexgym.com' : 'member@apexgym.com');
    setPassword('demo123');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 space-y-8">
      {showDemo && (
        <div className={`w-full max-w-md p-4 rounded-2xl border flex flex-col space-y-2 animate-in slide-in-from-top-4 duration-500 ${isDark ? 'bg-blue-900/10 border-blue-800 text-blue-300' : 'bg-blue-50 border-blue-200 text-blue-700'}`}>
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-widest">Demo Credentials</span>
            <button onClick={() => setShowDemo(false)} className="text-xs opacity-50 hover:opacity-100">Dismiss</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => fillDemo(UserRole.ADMIN)} className="p-2 border border-current rounded-lg text-[10px] font-bold hover:bg-blue-500/10 transition-colors uppercase">
              Auto-fill Admin
            </button>
            <button onClick={() => fillDemo(UserRole.MEMBER)} className="p-2 border border-current rounded-lg text-[10px] font-bold hover:bg-blue-500/10 transition-colors uppercase">
              Auto-fill Member
            </button>
          </div>
          <p className="text-[10px] opacity-70 italic mt-1 text-center">Passwords are simulated, any text will work.</p>
        </div>
      )}

      <div className={`w-full max-w-md p-8 rounded-3xl border ${isDark ? 'bg-[#1e1e1e] border-slate-800' : 'bg-white border-gray-200'} shadow-2xl animate-in zoom-in-95 duration-500`}>
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-red-700 rounded-2xl mx-auto flex items-center justify-center mb-4 rotate-3 shadow-lg shadow-red-900/30">
            <span className="text-3xl text-white font-black">A</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight">APEX LOGIN</h1>
          <p className="text-slate-500 mt-2">Enter your credentials to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-900/10 border border-red-900/20 text-red-500 text-sm rounded-lg flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Role Type</label>
            <div className="flex p-1 bg-slate-800/50 rounded-xl">
              <button 
                type="button" 
                onClick={() => setRole(UserRole.MEMBER)}
                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${role === UserRole.MEMBER ? 'bg-red-700 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
              >
                MEMBER
              </button>
              <button 
                type="button" 
                onClick={() => setRole(UserRole.ADMIN)}
                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${role === UserRole.ADMIN ? 'bg-red-700 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
              >
                ADMIN
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email / Member ID</label>
            <input 
              type="text" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-red-600/50 transition-all ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-200'}`}
              placeholder="Enter your registered email"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Password</label>
              <a href="#" className="text-[10px] text-red-500 hover:underline">Forgot?</a>
            </div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-red-600/50 transition-all ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-200'}`}
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-red-700 hover:bg-red-800 disabled:opacity-50 text-white rounded-xl font-bold text-lg transition-all shadow-xl shadow-red-900/30 flex items-center justify-center hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            ) : (
              'LOGIN TO APEX'
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-slate-500">
          Not a member yet? <a href="#" className="text-red-500 font-bold hover:underline">Join the community</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
