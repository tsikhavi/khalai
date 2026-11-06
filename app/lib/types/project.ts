export type ProjectCategory = 'fullstack' | 'frontend' | 'ai' | 'seo' | 'aieo';

export type ProjectStatus = 'shipped' | 'pilot' | 'ongoing' | 'archived';

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string | null; // ← add this
  category: ProjectCategory;
  tags: string[];
  thumbnail: string | null; // backend sends null, not undefined
  url: string | null;
  repo: string | null;
  featured: boolean;
  published: boolean;
  year: number | null;
  order: number;
  country: string | null;
  region: string | null;
  sector: string | null;
  client: string | null;
  status: ProjectStatus;
  createdAt: string; // ← add this
  updatedAt: string; // ← add this
}

export interface ProjectsResponse {
  items: Project[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
