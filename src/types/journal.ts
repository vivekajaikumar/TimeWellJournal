
export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}
