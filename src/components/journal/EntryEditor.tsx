
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { JournalEntry } from "@/types/journal";
import { Save } from "lucide-react";

interface EntryEditorProps {
  entry?: JournalEntry;
  onSave: (entry: Omit<JournalEntry, 'id'>) => void;
  onCancel?: () => void;
}

const EntryEditor: React.FC<EntryEditorProps> = ({ entry, onSave, onCancel }) => {
  const [title, setTitle] = useState(entry?.title || "");
  const [content, setContent] = useState(entry?.content || "");
  const { toast } = useToast();

  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      setContent(entry.content);
    }
  }, [entry]);

  const handleSave = () => {
    if (!content.trim()) {
      toast({
        title: "Empty entry",
        description: "Your journal entry cannot be empty",
        variant: "destructive",
      });
      return;
    }

    onSave({
      title: title.trim() || "Untitled Entry",
      content,
      createdAt: entry?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: entry?.userId || "",
    });
  };

  return (
    <Card className="border-0 shadow-lg rounded-md bg-white/90 backdrop-blur">
      <CardHeader>
        <Input
          type="text"
          placeholder="Title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-xl font-medium border-0 border-b focus-visible:ring-0 rounded-none px-0 focus-visible:border-primary/30 placeholder:text-muted-foreground/50"
        />
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="What's on your mind today?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[300px] focus-visible:ring-0 border-0 resize-none text-base"
          autoFocus
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        {onCancel && (
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button onClick={handleSave} className="ml-auto">
          <Save className="mr-2 h-4 w-4" />
          Save
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EntryEditor;
