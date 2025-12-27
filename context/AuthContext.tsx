
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      setState({
        user: JSON.parse(storedUser),
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, role: UserRole) => {
    setState(prev => ({ ...prev, isLoading: true }));
    // Simulate API call
    setTimeout(() => {
      const mockUser: User = {
        id: role === UserRole.ADMIN ? 'admin_1' : 'member_1',
        name: role === UserRole.ADMIN ? 'Admin Staff' : 'Premium Member',
        email,
        role,
        avatar: `https://picsum.photos/seed/${role}/100/100`
      };
      
      // Inject some member-specific properties if it's a member
      if (role === UserRole.MEMBER) {
        (mockUser as any).memberId = 'MEM889';
        (mockUser as any).expiryDate = '2025-12-31';
        (mockUser as any).plan = 'Elite Yearly';
      }

      setState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
      });
      localStorage.setItem('auth_user', JSON.stringify(mockUser));
    }, 800);
  };

  const logout = () => {
    setState({ user: null, isAuthenticated: false, isLoading: false });
    localStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
