import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface AuthContextType {
  studentId: string | null;
  hashedStudentId: string | null;
  login: (id: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hash function to match backend
const hashStudentId = async (studentId: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(studentId);
  const hash = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hash));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [studentId, setStudentId] = useState<string | null>(null);
  const [hashedStudentId, setHashedStudentId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for stored token and student ID on mount
    const token = localStorage.getItem('access_token');
    const storedStudentId = localStorage.getItem('studentId');
    const storedHashedId = localStorage.getItem('hashedStudentId');
    
    if (token && storedStudentId && storedHashedId) {
      setStudentId(storedStudentId);
      setHashedStudentId(storedHashedId);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  const login = async (id: string) => {
    const hashedId = await hashStudentId(id);
    setStudentId(id);
    setHashedStudentId(hashedId);
    localStorage.setItem('studentId', id);
    localStorage.setItem('hashedStudentId', hashedId);
  };

  const logout = () => {
    // Clear all auth-related data
    setStudentId(null);
    setHashedStudentId(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('studentId');
    localStorage.removeItem('hashedStudentId');
    localStorage.removeItem('rememberedUser');
    delete axios.defaults.headers.common['Authorization'];
    
    // Redirect to login page
    navigate('/login');
  };

  const isAuthenticated = !!studentId && !!hashedStudentId;

  return (
    <AuthContext.Provider value={{ 
      studentId, 
      hashedStudentId,
      login, 
      logout, 
      isAuthenticated 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 