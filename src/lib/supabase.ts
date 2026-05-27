import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Category = 'actualites' | 'evenements' | 'tutoriels' | 'photos-videos';

export interface Article {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: Category;
  excerpt: string;
  cover_image: string;
  content: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  'actualites': 'Actualités',
  'evenements': 'Événements',
  'tutoriels': 'Tutoriels',
  'photos-videos': 'Photos & Vidéos',
};
