"use client";

import React, { createContext, useContext, useState } from 'react';

interface User {
  name: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);

  const setUser = (user: User) => {
    setUserState(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setUserState(null);
    localStorage.removeItem('user');
  };

  React.useEffect(() => {
    const data = localStorage.getItem('user');
    if (data) setUserState(JSON.parse(data));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
