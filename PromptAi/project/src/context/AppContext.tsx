import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Prompt } from '../types';
import { mockUser, prompts } from '../data/mockData';

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  prompts: Prompt[];
  favorites: string[];
  isDarkMode: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  toggleFavorite: (promptId: string) => void;
  toggleDarkMode: () => void;
  searchPrompts: (query: string) => Prompt[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(mockUser);
  const [favorites, setFavorites] = useState<string[]>(mockUser.favorites);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const isAuthenticated = user !== null;

  const login = (email: string, password: string) => {
    // Mock login - in real app, this would call an API
    setUser(mockUser);
    setFavorites(mockUser.favorites);
  };

  const logout = () => {
    setUser(null);
    setFavorites([]);
  };

  const toggleFavorite = (promptId: string) => {
    if (!user) return;
    
    const newFavorites = favorites.includes(promptId)
      ? favorites.filter(id => id !== promptId)
      : [...favorites, promptId];
    
    setFavorites(newFavorites);
    setUser({ ...user, favorites: newFavorites });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const searchPrompts = (query: string): Prompt[] => {
    if (!query.trim()) return prompts;
    
    const lowercaseQuery = query.toLowerCase();
    return prompts.filter(prompt =>
      prompt.title.toLowerCase().includes(lowercaseQuery) ||
      prompt.description.toLowerCase().includes(lowercaseQuery) ||
      prompt.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      prompt.category.toLowerCase().includes(lowercaseQuery)
    );
  };

  const value = {
    user,
    isAuthenticated,
    prompts,
    favorites,
    isDarkMode,
    login,
    logout,
    toggleFavorite,
    toggleDarkMode,
    searchPrompts
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};