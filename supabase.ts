import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface MenuCategoryRow {
  id: string;
  label: string;
  short_label: string;
  sort_order: number;
  is_combo: boolean;
}

export interface MenuItemRow {
  id: string;
  category_id: string;
  name: string;
  description: string;
  price: number;
  price_full: number | null;
  image: string;
  image_alt: string;
  diet: 'veg' | 'non-veg' | 'egg';
  spice: 'mild' | 'medium' | 'hot' | null;
  popular: boolean;
  chef_special: boolean;
  serves: string | null;
  sort_order: number;
}

export interface ComboThaliRow {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  image_alt: string;
  diet: 'veg' | 'non-veg' | 'egg';
  serves: string;
  items: string[];
  popular: boolean;
  sort_order: number;
}
