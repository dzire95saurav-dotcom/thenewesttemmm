import { useEffect, useState } from 'react';
import { menuCategories, comboThalis } from '@/data/menu';
import type { MenuCategory, MenuItem, Thali } from '@/types';
import { fetchSheetMenu } from '@/utils/sheetApi';

const categoryOrder = [
  'beverages',
  'soups-shakes',
  'quick-bites',
  'indo-chinese',
  'tandoor-veg',
  'tandoor-nonveg',
  'veg-main',
  'nonveg-main',
  'breads',
  'salad-raita',
  'desserts',
  'rice-biryani',
  'noodles',
  'thali',
];

const categoryAliases: Record<string, string> = {
  beverage: 'beverages',
  beverages: 'beverages',
  soups: 'soups-shakes',
  'soups-shakes': 'soups-shakes',
  'soul-warming-soup-shakes': 'soups-shakes',
  'quick-bites': 'quick-bites',
  'quick bites': 'quick-bites',
  'quick-bites-rolls-sandwiches-snacks': 'quick-bites',
  'indo-chinese': 'indo-chinese',
  'appetizers-indo-chinese-starters': 'indo-chinese',
  'tandoor-veg': 'tandoor-veg',
  'tandoor-se-vegetarian-starters': 'tandoor-veg',
  'tandoor-nonveg': 'tandoor-nonveg',
  'tandoor-se-non-veg-starters': 'tandoor-nonveg',
  'veg-main': 'veg-main',
  'vegetarian-delights-indian-main-course': 'veg-main',
  'nonveg-main': 'nonveg-main',
  'royal-curries-non-veg-main-course': 'nonveg-main',
  breads: 'breads',
  'breads-and-roti-fresh-from-the-tandoor': 'breads',
  'salad-raita': 'salad-raita',
  'fresh-greens-salad-raita': 'salad-raita',
  desserts: 'desserts',
  'rice-biryani': 'rice-biryani',
  'rice-and-biryani-classics-with-a-citrus-twist': 'rice-biryani',
  noodles: 'noodles',
  'noodles-wok-classics': 'noodles',
  thali: 'thali',
  'thali-combos': 'thali',
};

const categoryLabels: Record<string, string> = {
  thali: 'Thali & Combos',
};

function normalizeCategory(category: string): string {
  const key = category.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return categoryAliases[key] ?? key;
}

function toMenuItem(item: Thali, fallback?: MenuItem): MenuItem {
  return {
    id: item.id,
    name: item.name,
    description: fallback?.description ?? '',
    price: item.price,
    image: item.image || fallback?.image || '',
    imageAlt: fallback?.imageAlt ?? item.name,
    diet: fallback?.diet ?? 'veg',
    spice: fallback?.spice,
    popular: fallback?.popular,
    chefSpecial: fallback?.chefSpecial,
    serves: fallback?.serves,
    priceFull: fallback?.priceFull,
    isAvailable: item.is_available,
  };
}

function localRows(): Thali[] {
  return [
    ...menuCategories.flatMap((category) => category.items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      category: category.id,
      is_available: true,
      image: item.image,
    }))),
    ...comboThalis.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      category: 'thali',
      is_available: true,
      image: item.image,
    })),
  ];
}

function groupRows(rows: Thali[]): MenuCategory[] {
  const localItems = menuCategories.flatMap((category) => category.items);
  const grouped = new Map<string, MenuItem[]>();

  for (const row of rows) {
    if (!row.is_available) continue;
    const categoryId = normalizeCategory(row.category);
    const fallback = localItems.find(
      (item) => item.id === row.id || item.name.toLowerCase() === row.name.toLowerCase()
    );
    const items = grouped.get(categoryId) ?? [];
    items.push(toMenuItem(row, fallback));
    grouped.set(categoryId, items);
  }

  return categoryOrder
    .map((categoryId) => {
      const fallbackCategory = menuCategories.find((category) => category.id === categoryId);
      const items = grouped.get(categoryId) ?? [];
      if (!items.length) return null;
      return {
        id: categoryId,
        label: fallbackCategory?.label ?? categoryLabels[categoryId] ?? categoryId,
        shortLabel: fallbackCategory?.shortLabel ?? categoryLabels[categoryId] ?? categoryId,
        items,
      };
    })
    .filter((category): category is MenuCategory => category !== null);
}

export interface MenuData {
  categories: MenuCategory[];
  loading: boolean;
}

export function useMenuData(): MenuData {
  const [data, setData] = useState<MenuData>({
    categories: groupRows(localRows()),
    loading: true,
  });

  useEffect(() => {
    let cancelled = false;

    fetchSheetMenu()
      .then((rows) => {
        if (!cancelled && rows.length > 0) {
          setData({ categories: groupRows(rows), loading: false });
        }
      })
      .catch(() => {
        if (!cancelled) setData({ categories: groupRows(localRows()), loading: false });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return data;
}
