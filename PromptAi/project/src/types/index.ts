export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  favorites: string[];
  collections: Collection[];
  createdAt: Date;
}

export interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  aiModel: string[];
  rating: number;
  usage: number;
  author: string;
  isPublic: boolean;
  variables: Variable[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Variable {
  name: string;
  placeholder: string;
  required: boolean;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  prompts: string[];
  isPublic: boolean;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  promptCount: number;
  color: string;
}

export interface SearchFilters {
  category?: string;
  aiModel?: string;
  rating?: number;
  tags?: string[];
  sortBy?: 'popular' | 'newest' | 'rating' | 'usage';
}