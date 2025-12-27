
import React, { useState, useEffect } from 'react';
import { api } from '../services/mockApi';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { AttendanceRecord, Program } from '../types';

const MemberDashboard: React.FC = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [checkingIn, setCheckingIn] = useState(false);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [toast, setToast] = useState<{message: string, type: 'success'|'error'} | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const [att, progs] = await Promise.all([api.getAttendance(), api.getPrograms()]);
      setAttendance(att.filter(a => a.userId === user?.id));
      setPrograms(progs);
    };
    fetchData();
  }, [user?.id]);

  const handleCheckIn = async () => {
    if (!user) return;
    setCheckingIn(true);
    try {
      const record = await api.checkIn(user);
      setAttendance(prev => [record, ...prev]);
      setToast({ message: "Check-in successful! Have a great workout.", type: 'success' });
    } catch (error: any) {
      setToast({ message: error.message, type: 'error' });
    } finally {
      setCheckingIn(false);
      setTimeout(() => setToast(null), 3000);
    }
  };

  const memberInfo = user as any; // Mock mapping

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-8 right-8 px-6 py-3 rounded-xl shadow-2xl z-50 flex items-center space-x-3 border animate-in slide-in-from-right-4
          ${toast.type === 'success' ? 'bg-green-600 border-green-500 text-white' : 'bg-red-600 border-red-500 text-white'}`}>
          {toast.type === 'success' ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          )}
          <span className="font-medium">{toast.message}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.name.split(' ')[0]}!</h1>
          <p className="text-slate-500 mt-1">Ready to crush your goals today?</p>
        </div>
        <button 
          onClick={handleCheckIn}
          disabled={checkingIn}
          className={`group relative overflow-hidden px-8 py-4 bg-red-700 hover:bg-red-800 text-white rounded-2xl transition-all shadow-lg shadow-red-900/20 flex items-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {checkingIn ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <svg className="group-hover:scale-110 transition-transform" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m17 19-5 3-5-3"/><path d="M2 12h20"/><path d="m5 7-3 5 3 5"/><path d="m19 7 3 5-3 5"/></svg>
          )}
          <span className="text-lg font-bold">DAILY CHECK-IN</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Membership & Status */}
        <div className="space-y-6">
          <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#1e1e1e] border-slate-800' : 'bg-white border-gray-200'} shadow-sm`}>
            <h2 className="text-lg font-bold mb-4 flex items-center space-x-2">
              <svg className="text-red-600" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"/></svg>
              <span>Membership Status</span>
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Member ID</span>
                <span className="font-mono font-bold tracking-wider">{memberInfo?.memberId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Plan</span>
                <span className="px-2 py-1 bg-red-600/10 text-red-500 rounded text-xs font-bold uppercase">{memberInfo?.plan}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Expires On</span>
                <span className="font-medium">{memberInfo?.expiryDate}</span>
              </div>
              <div className="pt-2">
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className="bg-red-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <p className="text-[10px] text-slate-500 mt-1 uppercase text-right tracking-widest">75% Season Progress</p>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#1e1e1e] border-slate-800' : 'bg-white border-gray-200'} shadow-sm`}>
            <h2 className="text-lg font-bold mb-4 flex items-center space-x-2">
              <svg className="text-red-600" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
              <span>Attendance History</span>
            </h2>
            <div className="space-y-3">
              {attendance.slice(0, 5).map(rec => (
                <div key={rec.id} className="flex items-center justify-between py-2 border-b border-slate-800/50 last:border-0">
                  <span className="text-sm font-medium">{rec.date}</span>
                  <span className="text-xs text-slate-500 bg-slate-800/50 px-2 py-0.5 rounded">{rec.checkInTime}</span>
                </div>
              ))}
              {attendance.length === 0 && <p className="text-center py-4 text-slate-500 italic">No activity yet.</p>}
            </div>
          </div>
        </div>

        {/* Right Column: Programs & Schedule */}
        <div className="lg:col-span-2 space-y-6">
          <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#1e1e1e] border-slate-800' : 'bg-white border-gray-200'} shadow-sm`}>
            <h2 className="text-xl font-bold mb-6">Explore Gym Programs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {programs.map(prog => (
                <div key={prog.id} className={`p-5 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-gray-50 border-gray-200'} group hover:border-red-600/50 transition-all cursor-pointer`}>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-red-500">{prog.category}</span>
                    <button className="text-slate-400 group-hover:text-red-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
                    </button>
                  </div>
                  <h3 className="font-bold text-lg mb-1">{prog.name}</h3>
                  <p className="text-sm text-slate-400 mb-4">Lead by {prog.trainerName}</p>
                  <div className="flex items-center text-xs text-slate-500 space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    <span>{prog.schedule}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#1e1e1e] border-slate-800' : 'bg-white border-gray-200'} shadow-sm bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]`}>
              <h3 className="font-bold text-lg mb-2">Today's Goal</h3>
              <p className="text-sm text-slate-500 mb-4">"Success usually comes to those who are too busy to be looking for it."</p>
              <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors">Log Workout</button>
            </div>
            <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#1e1e1e] border-slate-800' : 'bg-white border-gray-200'} shadow-sm`}>
              <h3 className="font-bold text-lg mb-2">Trainer Tip</h3>
              <p className="text-sm text-slate-500 italic">"Focus on form over weight. Mind-muscle connection is the key to hypertrophy."</p>
              <div className="flex items-center mt-4 space-x-3">
                <div className="w-8 h-8 rounded-full bg-slate-700"></div>
                <span className="text-xs font-medium">Coach Alex Rivera</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
