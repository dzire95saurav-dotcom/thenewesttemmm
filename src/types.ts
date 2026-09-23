export type DietType = 'veg' | 'non-veg' | 'egg';

export type SpiceLevel = 'mild' | 'medium' | 'hot';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  imageAlt: string;
  diet: DietType;
  spice?: SpiceLevel;
  popular?: boolean;
  chefSpecial?: boolean;
  serves?: string;
  priceFull?: number;
}

export interface ComboItem {
  label: string;
}

export interface Thali {
  id: string;
  name: string;
  price: number;
  category: string;
  is_available: boolean;
  image: string;
}

export interface ComboThali {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  imageAlt: string;
  diet: DietType;
  serves: string;
  items: string[];
  popular?: boolean;
}
export interface MenuCategory {
  id: string;
  label: string;
  shortLabel: string;
  items: MenuItem[];
}

export interface RestaurantInfo {
  name: string;
  subtitle: string;
  tagline: string;
  address: string;
  phones: string[];
  heroImage: string;
  heroImageAlt: string;
}
