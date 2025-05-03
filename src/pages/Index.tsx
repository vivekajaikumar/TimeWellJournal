
import React, { useState, useEffect } from 'react';
import LandingPage from './LandingPage';
import JournalPage from './JournalPage';
import { User } from '@/types/journal';
import { getCurrentUser } from '@/services/mockDataService';

const Index = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    setIsLoading(false);
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return currentUser ? (
    <JournalPage user={currentUser} onLogout={handleLogout} />
  ) : (
    <LandingPage onLogin={handleLogin} />
  );
};

export default Index;
