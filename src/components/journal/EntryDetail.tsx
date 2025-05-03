
import React from 'react';
import { Button } from "@/components/ui/button";
import { JournalEntry } from "@/types/journal";
import { format } from "date-fns";
import { ArrowLeft, Calendar, Clock, Pencil } from "lucide-react";

interface EntryDetailProps {
  entry: JournalEntry;
  onBack: () => void;
  onEdit: () => void;
}

const EntryDetail: React.FC<EntryDetailProps> = ({ entry, onBack, onEdit }) => {
  const { title, content, createdAt } = entry;
  const date = new Date(createdAt);
  
  const formattedDate = format(date, 'MMMM d, yyyy');
  const formattedTime = format(date, 'h:mm a');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={onBack} className="p-0 h-auto" size="sm">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back</span>
        </Button>
        <Button variant="outline" onClick={onEdit} size="sm">
          <Pencil className="h-3.5 w-3.5 mr-1.5" />
          <span>Edit</span>
        </Button>
      </div>
      
      <h1 className="text-2xl font-bold">{title || "Untitled Entry"}</h1>
      
      <div className="flex items-center text-muted-foreground text-sm gap-4">
        <div className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          <span>{formattedTime}</span>
        </div>
      </div>
      
      <div className="pt-4 whitespace-pre-wrap">
        {content.split('\n').map((paragraph, i) => (
          <p key={i} className={`mb-4 ${i === 0 ? 'text-lg' : ''}`}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default EntryDetail;
