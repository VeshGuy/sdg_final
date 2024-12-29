export interface Project {
  title: string;
  location: string;
  description: string;
  volunteer_count: number;
  progress: number;
  categories: string[];
  goals: string[];
  updates: { date: string; content: string }[];
}