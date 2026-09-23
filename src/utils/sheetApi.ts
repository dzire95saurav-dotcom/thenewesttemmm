import type { Thali } from '@/types';

const SHEET_API_URL = 'https://script.google.com/macros/s/AKfycbzqzmwYlij6n4OJ6b6xwtRpqFpYN1UtLkdwThsyrH25tN4_yEKIVf80o2JtWNHm-_-l/exec';

export interface SheetRow {
  id: string | number;
  name: string;
  price: number | string;
  category: string;
  is_available: boolean | string;
  image?: string;
}

interface SheetResponse {
  thalis?: SheetRow[];
  items?: SheetRow[];
  data?: SheetRow[];
}

function toBoolean(value: SheetRow['is_available']): boolean {
  if (typeof value === 'string') return value.trim().toLowerCase() === 'true';
  return value === true;
}

export async function fetchSheetMenu(): Promise<Thali[]> {
  const response = await fetch(SHEET_API_URL);
  if (!response.ok) throw new Error(`Sheet API request failed: ${response.status}`);

  const payload = (await response.json()) as SheetResponse | SheetRow[];
  const rows = Array.isArray(payload) ? payload : payload.thalis ?? payload.items ?? payload.data ?? [];

  return rows.map((row) => ({
    id: String(row.id),
    name: row.name,
    price: Number(row.price) || 0,
    category: row.category,
    is_available: toBoolean(row.is_available),
    image: row.image ?? '',
  }));
}
