
export enum UserRole {
  ADMIN = 'ADMIN',
  TRAINER = 'TRAINER',
  MEMBER = 'MEMBER'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Member extends User {
  memberId: string;
  joinDate: string;
  expiryDate: string;
  status: 'active' | 'inactive' | 'pending';
  plan: string;
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  userName: string;
  memberId: string;
  date: string;
  checkInTime: string;
}

export interface Program {
  id: string;
  name: string;
  trainerId: string;
  trainerName: string;
  schedule: string;
  category: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
