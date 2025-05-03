
import React from 'react';
import { Button } from "@/components/ui/button";
import { Book, LogIn } from "lucide-react";

interface NavBarProps {
  user?: { name: string };
  onLogin?: () => void;
  onLogout?: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ user, onLogin, onLogout }) => {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm fixed top-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center h-16 px-4">
        <div className="flex items-center gap-2">
          <Book className="h-6 w-6 text-primary" />
          <h1 className="font-bold text-xl">TimeWell Journal</h1>
        </div>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-muted-foreground hidden sm:inline">
                Hello, {user.name}
              </span>
              <Button variant="outline" size="sm" onClick={onLogout}>
                Sign out
              </Button>
            </>
          ) : (
            <Button size="sm" onClick={onLogin}>
              <LogIn className="mr-2 h-4 w-4" />
              Sign in
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
