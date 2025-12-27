
import { User, UserRole, Member, AttendanceRecord, Program } from '../types';

const INITIAL_MEMBERS: Member[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: UserRole.MEMBER, memberId: 'MEM001', joinDate: '2023-01-15', expiryDate: '2024-01-15', status: 'active', plan: 'Gold' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: UserRole.MEMBER, memberId: 'MEM002', joinDate: '2023-03-10', expiryDate: '2024-03-10', status: 'active', plan: 'Silver' },
  { id: '3', name: 'Mike Ross', email: 'mike@example.com', role: UserRole.ADMIN, memberId: 'ADM001', joinDate: '2022-01-01', expiryDate: '2099-12-31', status: 'active', plan: 'Staff' }
];

const INITIAL_PROGRAMS: Program[] = [
  { id: 'p1', name: 'High Intensity Interval Training', trainerId: 't1', trainerName: 'Alex Rivera', schedule: 'Mon, Wed, Fri - 08:00 AM', category: 'Cardio' },
  { id: 'p2', name: 'Power Lifting Essentials', trainerId: 't2', trainerName: 'Sarah Jenkins', schedule: 'Tue, Thu, Sat - 05:00 PM', category: 'Strength' },
  { id: 'p3', name: 'Zen Yoga Flow', trainerId: 't3', trainerName: 'Emily Chen', schedule: 'Everyday - 07:00 AM', category: 'Flexibility' }
];

// LocalStorage helpers
const getStoredData = <T,>(key: string, initial: T): T => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : initial;
};

const setStoredData = <T,>(key: string, data: T): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const api = {
  getMembers: async (): Promise<Member[]> => {
    return getStoredData('gym_members', INITIAL_MEMBERS);
  },
  
  updateMember: async (member: Member): Promise<void> => {
    const members = getStoredData('gym_members', INITIAL_MEMBERS);
    const index = members.findIndex(m => m.id === member.id);
    if (index !== -1) {
      members[index] = member;
      setStoredData('gym_members', members);
    }
  },

  getAttendance: async (): Promise<AttendanceRecord[]> => {
    return getStoredData('gym_attendance', []);
  },

  checkIn: async (user: User): Promise<AttendanceRecord> => {
    const records = getStoredData('gym_attendance', [] as AttendanceRecord[]);
    const today = new Date().toISOString().split('T')[0];
    
    // Simple duplicate check for today
    const alreadyCheckedIn = records.find(r => r.userId === user.id && r.date === today);
    if (alreadyCheckedIn) {
      throw new Error("You've already checked in today.");
    }

    const newRecord: AttendanceRecord = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      userName: user.name,
      memberId: (user as Member).memberId || 'N/A',
      date: today,
      checkInTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    records.push(newRecord);
    setStoredData('gym_attendance', records);
    return newRecord;
  },

  getPrograms: async (): Promise<Program[]> => {
    return getStoredData('gym_programs', INITIAL_PROGRAMS);
  }
};
