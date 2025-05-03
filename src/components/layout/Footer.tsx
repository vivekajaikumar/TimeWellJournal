
import React from 'react';
import { Book } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="border-t py-6 mt-auto bg-secondary/50">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Book className="h-5 w-5 text-primary" />
          <span className="font-medium">TimeWell Journal</span>
        </div>
        
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} TimeWell Journal. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
