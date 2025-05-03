
import React from 'react';
import { JournalEntry } from "@/types/journal";
import EntryCard from "./EntryCard";
import { Button } from "@/components/ui/button";
import { CalendarIcon, PenIcon, BookIcon } from "lucide-react";

interface EntriesListProps {
  entries: JournalEntry[];
  onEntryClick: (entry: JournalEntry) => void;
  onNewEntry: () => void;
}

const EntriesList: React.FC<EntriesListProps> = ({ entries, onEntryClick, onNewEntry }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <BookIcon className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-semibold">Your Journal</h1>
        </div>
        
        <Button onClick={onNewEntry}>
          <PenIcon className="mr-2 h-4 w-4" />
          New Entry
        </Button>
      </div>
      
      {entries.length === 0 ? (
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <CalendarIcon className="h-12 w-12 text-muted-foreground/30" />
          </div>
          <h3 className="text-lg font-medium text-muted-foreground">No entries yet</h3>
          <p className="text-muted-foreground/70 mt-1 mb-4">
            Start writing your first journal entry
          </p>
          <Button onClick={onNewEntry} variant="secondary">
            <PenIcon className="mr-2 h-4 w-4" />
            Create your first entry
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {entries.map((entry) => (
            <EntryCard
              key={entry.id}
              entry={entry}
              onClick={() => onEntryClick(entry)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EntriesList;
