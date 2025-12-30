
export enum ProjectType {
  CODE = 'CODE',
  FILE = 'FILE'
}

export interface Project {
  id: string;
  name: string;
  language: string;
  type: ProjectType;
  content: string; // The code itself or the file description/URL
  notes?: string;
  previewUrl: string;
  likes: number;
  downloads: number;
  authorId: string;
  createdAt: number;
}

export interface Admin {
  id: string;
  username: string;
  name: string;
  role: 'Admin' | 'Owner';
  quote: string;
  hashtags: string[];
  photoUrl: string;
  password?: string; // Only used in state
}

export interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  isAdmin: boolean;
  timestamp: number;
}
