export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: "Web Development" | "Systems" | "UI/UX" | string;
  tech?: string[];
  live_url?: string;
  demo_url?: string;
}