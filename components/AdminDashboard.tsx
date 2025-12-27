
import React, { useState, useEffect } from 'react';
import { api } from '../services/mockApi';
import { excelService } from '../services/excelService';
import { Member, AttendanceRecord, UserRole } from '../types';
import { useTheme } from '../context/ThemeContext';

const AdminDashboard: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [membersData, attendanceData] = await Promise.all([
          api.getMembers(),
          api.getAttendance()
        ]);
        setMembers(membersData);
        setAttendance(attendanceData);
      } catch (error) {
        console.error("Failed to load admin data", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const stats = {
    total: members.length,
    active: members.filter(m => m.status === 'active').length,
    todayAttendance: attendance.filter(a => a.date === new Date().toISOString().split('T')[0]).length
  };

  const handleExport = () => {
    excelService.exportAttendance(attendance);
  };

  if (loading) return <div className="animate-pulse space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map(i => <div key={i} className="h-32 bg-slate-800 rounded-xl" />)}
    </div>
    <div className="h-64 bg-slate-800 rounded-xl" />
  </div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Admin Console</h1>
          <p className="text-slate-500 mt-1">Manage operations and track membership activity.</p>
        </div>
        <button 
          onClick={handleExport}
          className="flex items-center justify-center space-x-2 px-6 py-2.5 bg-red-700 hover:bg-red-800 text-white rounded-lg transition-all font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          <span>Export Excel Report</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#1e1e1e] border-slate-800' : 'bg-white border-gray-200'} shadow-sm`}>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Members</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#1e1e1e] border-slate-800' : 'bg-white border-gray-200'} shadow-sm`}>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-500/10 text-green-500 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Active Members</p>
              <p className="text-2xl font-bold">{stats.active}</p>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#1e1e1e] border-slate-800' : 'bg-white border-gray-200'} shadow-sm`}>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-red-500/10 text-red-500 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m17 19-5 3-5-3"/><path d="M2 12h20"/><path d="m5 7-3 5 3 5"/><path d="m19 7 3 5-3 5"/></svg>
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Today's Check-ins</p>
              <p className="text-2xl font-bold">{stats.todayAttendance}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className={`rounded-2xl border ${isDark ? 'bg-[#1e1e1e] border-slate-800' : 'bg-white border-gray-200'} overflow-hidden shadow-sm`}>
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="font-semibold text-lg">Recent Attendance</h2>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500">Auto-refreshing live logs</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className={`text-xs uppercase tracking-wider ${isDark ? 'bg-slate-800/50 text-slate-500' : 'bg-gray-50 text-gray-500'}`}>
              <tr>
                <th className="px-6 py-4">Member Name</th>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Time</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {attendance.slice().reverse().map((record) => (
                <tr key={record.id} className={`${isDark ? 'hover:bg-slate-800/30' : 'hover:bg-gray-50/50'} transition-colors`}>
                  <td className="px-6 py-4 font-medium">{record.userName}</td>
                  <td className="px-6 py-4 text-slate-500">{record.memberId}</td>
                  <td className="px-6 py-4">{record.date}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300">
                      {record.checkInTime}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-500 hover:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                    </button>
                  </td>
                </tr>
              ))}
              {attendance.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">No attendance records found for today.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
