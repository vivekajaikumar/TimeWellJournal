
import { JournalEntry, User } from "@/types/journal";
import { v4 as uuidv4 } from "uuid";

// Mock users
const users: User[] = [
  {
    id: "1",
    email: "demo@example.com",
    name: "Demo User",
  },
];

// Mock journal entries
const journalEntries: JournalEntry[] = [
  {
    id: "1",
    title: "My First Journal Entry",
    content: "Today I started using TimeWell Journal to record my thoughts and experiences. I'm excited to build a journaling habit and see how it helps my mental clarity over time.\n\nI've read that consistent journaling can improve mindfulness and reduce stress. Looking forward to this journey!",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    userId: "1",
  },
  {
    id: "2",
    title: "Reflections on Yesterday",
    content: "Yesterday was quite productive. I managed to complete that project I've been putting off for weeks. It feels good to finally have it done.\n\nI also went for a long walk in the evening which really helped clear my mind.",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    userId: "1",
  },
];

// Mock local storage for persistence
const localStorageKeys = {
  users: "timewell_users",
  entries: "timewell_entries",
  currentUser: "timewell_current_user",
};

// Initialize from localStorage or use defaults
const initFromStorage = () => {
  try {
    const storedUsers = localStorage.getItem(localStorageKeys.users);
    const storedEntries = localStorage.getItem(localStorageKeys.entries);
    
    if (storedUsers) {
      users.length = 0;
      users.push(...JSON.parse(storedUsers));
    } else {
      localStorage.setItem(localStorageKeys.users, JSON.stringify(users));
    }
    
    if (storedEntries) {
      journalEntries.length = 0;
      journalEntries.push(...JSON.parse(storedEntries));
    } else {
      localStorage.setItem(localStorageKeys.entries, JSON.stringify(journalEntries));
    }
  } catch (error) {
    console.error("Error initializing from storage:", error);
  }
};

// Save to localStorage
const saveToStorage = () => {
  try {
    localStorage.setItem(localStorageKeys.users, JSON.stringify(users));
    localStorage.setItem(localStorageKeys.entries, JSON.stringify(journalEntries));
  } catch (error) {
    console.error("Error saving to storage:", error);
  }
};

// Auth functions
export const getCurrentUser = (): User | null => {
  try {
    const storedUser = localStorage.getItem(localStorageKeys.currentUser);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

export const login = (email: string, password: string): Promise<User> => {
  // In a mock service, we just check if the email exists and "authenticate"
  return new Promise((resolve, reject) => {
    initFromStorage();
    setTimeout(() => {
      const user = users.find((u) => u.email === email);
      if (user) {
        localStorage.setItem(localStorageKeys.currentUser, JSON.stringify(user));
        resolve(user);
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 500);
  });
};

export const signup = (email: string, password: string, name: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    initFromStorage();
    setTimeout(() => {
      const existingUser = users.find((u) => u.email === email);
      if (existingUser) {
        reject(new Error("Email already in use"));
      } else {
        const newUser: User = {
          id: uuidv4(),
          email,
          name,
        };
        users.push(newUser);
        saveToStorage();
        localStorage.setItem(localStorageKeys.currentUser, JSON.stringify(newUser));
        resolve(newUser);
      }
    }, 500);
  });
};

export const logout = (): Promise<void> => {
  return new Promise((resolve) => {
    localStorage.removeItem(localStorageKeys.currentUser);
    resolve();
  });
};

// Journal entry functions
export const getEntriesByUser = (userId: string): Promise<JournalEntry[]> => {
  return new Promise((resolve) => {
    initFromStorage();
    setTimeout(() => {
      const userEntries = journalEntries
        .filter((entry) => entry.userId === userId)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      resolve(userEntries);
    }, 500);
  });
};

export const getEntryById = (entryId: string): Promise<JournalEntry | null> => {
  return new Promise((resolve) => {
    initFromStorage();
    setTimeout(() => {
      const entry = journalEntries.find((e) => e.id === entryId) || null;
      resolve(entry);
    }, 300);
  });
};

export const createEntry = (userId: string, entry: Omit<JournalEntry, "id" | "userId">): Promise<JournalEntry> => {
  return new Promise((resolve) => {
    initFromStorage();
    setTimeout(() => {
      const newEntry: JournalEntry = {
        ...entry,
        id: uuidv4(),
        userId,
      };
      journalEntries.push(newEntry);
      saveToStorage();
      resolve(newEntry);
    }, 500);
  });
};

export const updateEntry = (entryId: string, updates: Partial<JournalEntry>): Promise<JournalEntry> => {
  return new Promise((resolve, reject) => {
    initFromStorage();
    setTimeout(() => {
      const index = journalEntries.findIndex((e) => e.id === entryId);
      if (index !== -1) {
        const updatedEntry = {
          ...journalEntries[index],
          ...updates,
          updatedAt: new Date().toISOString(),
        };
        journalEntries[index] = updatedEntry;
        saveToStorage();
        resolve(updatedEntry);
      } else {
        reject(new Error("Entry not found"));
      }
    }, 500);
  });
};

export const deleteEntry = (entryId: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    initFromStorage();
    setTimeout(() => {
      const index = journalEntries.findIndex((e) => e.id === entryId);
      if (index !== -1) {
        journalEntries.splice(index, 1);
        saveToStorage();
        resolve();
      } else {
        reject(new Error("Entry not found"));
      }
    }, 500);
  });
};
