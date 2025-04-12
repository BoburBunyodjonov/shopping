'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type User = {
  id: number;
  name: string;
  phone_number: string;
  access: boolean;
  location: string;
  // boshqa user fieldlari...
};

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  hasAccess: () => boolean; // Yangi funksiya
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
  hasAccess: () => false
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      const access = localStorage.getItem('access'); // Access ni o'qiymiz
      
      if (token && userData) {
        setIsLoggedIn(true);
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        
        // Agar access localStorage'da saqlangan bo'lsa
        if (access) {
          parsedUser.access = access === 'true';
          setUser(parsedUser);
        }
      }
    }
  }, []);

  const login = (token: string, user: User) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('access', String(user.access)); // Access ni alohida saqlaymiz
      setIsLoggedIn(true);
      setUser(user);
    }
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('access'); // Access ni ham o'chiramiz
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const hasAccess = () => {
    if (typeof window !== 'undefined') {
      const storedAccess = localStorage.getItem('access');
      return storedAccess === 'true' || (user?.access === true);
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, hasAccess }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};