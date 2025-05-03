
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { JournalEntry, User } from "@/types/journal";
import EntriesList from "@/components/journal/EntriesList";
import EntryEditor from "@/components/journal/EntryEditor";
import EntryDetail from "@/components/journal/EntryDetail";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { createEntry, getEntriesByUser, logout, updateEntry } from "@/services/mockDataService";

interface JournalPageProps {
  user: User;
  onLogout: () => void;
}

enum View {
  LIST,
  DETAIL,
  EDIT,
  NEW,
}

const JournalPage: React.FC<JournalPageProps> = ({ user, onLogout }) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentView, setCurrentView] = useState<View>(View.LIST);
  const [currentEntry, setCurrentEntry] = useState<JournalEntry | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadEntries();
  }, [user.id]);

  const loadEntries = async () => {
    try {
      setIsLoading(true);
      const userEntries = await getEntriesByUser(user.id);
      setEntries(userEntries);
    } catch (error) {
      toast({
        title: "Error loading entries",
        description: "Could not load your journal entries",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEntryClick = (entry: JournalEntry) => {
    setCurrentEntry(entry);
    setCurrentView(View.DETAIL);
  };

  const handleNewEntry = () => {
    setCurrentEntry(undefined);
    setCurrentView(View.NEW);
  };

  const handleEditEntry = () => {
    setCurrentView(View.EDIT);
  };

  const handleSaveEntry = async (entryData: Omit<JournalEntry, "id">) => {
    try {
      if (currentView === View.EDIT && currentEntry) {
        const updated = await updateEntry(currentEntry.id, entryData);
        setEntries(entries.map(e => (e.id === updated.id ? updated : e)));
        setCurrentEntry(updated);
        setCurrentView(View.DETAIL);
        toast({ title: "Entry updated", description: "Your journal entry has been updated" });
      } else {
        const newEntry = await createEntry(user.id, entryData);
        setEntries([newEntry, ...entries]);
        setCurrentEntry(newEntry);
        setCurrentView(View.DETAIL);
        toast({ title: "Entry saved", description: "Your journal entry has been saved" });
      }
    } catch (error) {
      toast({
        title: "Error saving entry",
        description: "Could not save your journal entry",
        variant: "destructive",
      });
    }
  };

  const handleBack = () => {
    setCurrentView(View.LIST);
  };

  const handleLogout = async () => {
    try {
      await logout();
      onLogout();
      toast({ title: "Signed out", description: "You have been signed out successfully" });
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "Could not sign you out",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar user={user} onLogout={handleLogout} />
      
      <main className="container mx-auto px-4 pt-24 pb-12 flex-1">
        {currentView === View.LIST && (
          <EntriesList 
            entries={entries} 
            onEntryClick={handleEntryClick} 
            onNewEntry={handleNewEntry} 
          />
        )}
        
        {currentView === View.DETAIL && currentEntry && (
          <EntryDetail 
            entry={currentEntry} 
            onBack={handleBack} 
            onEdit={handleEditEntry} 
          />
        )}
        
        {currentView === View.EDIT && currentEntry && (
          <div className="space-y-4">
            <button 
              onClick={handleBack}
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              ← Back
            </button>
            <EntryEditor 
              entry={currentEntry} 
              onSave={handleSaveEntry} 
              onCancel={() => setCurrentView(View.DETAIL)} 
            />
          </div>
        )}
        
        {currentView === View.NEW && (
          <div className="space-y-4">
            <button 
              onClick={handleBack}
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              ← Back
            </button>
            <EntryEditor onSave={handleSaveEntry} onCancel={handleBack} />
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default JournalPage;
