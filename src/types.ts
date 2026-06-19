export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  category: "art" | "coding" | "music";
}

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  timestamp: string;
  avatarId: string;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  genre: string;
  mood: string;
}
