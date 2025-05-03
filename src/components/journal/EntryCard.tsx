
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { JournalEntry } from "@/types/journal";

interface EntryCardProps {
  entry: JournalEntry;
  onClick: () => void;
}

const EntryCard: React.FC<EntryCardProps> = ({ entry, onClick }) => {
  const { title, content, createdAt } = entry;
  const preview = content.length > 150 ? content.substring(0, 150) + "..." : content;
  
  return (
    <Card 
      onClick={onClick}
      className="cursor-pointer transition-all hover:shadow-md hover:border-primary/20 hover:-translate-y-1"
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium line-clamp-1">{title || "Untitled Entry"}</CardTitle>
          <div className="flex items-center text-xs text-muted-foreground gap-1">
            <CalendarIcon className="h-3 w-3" />
            <span>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-3 text-sm text-muted-foreground">
          {preview}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default EntryCard;
