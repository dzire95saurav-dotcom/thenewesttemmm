import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { CartItem, MenuItem } from '@/types';

const STORAGE_KEY = 'popular-dineout-cart';
const TABLE_STORAGE_KEY = 'popular-dineout-table';

export const TOTAL_TABLES = 20;

export interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  total: number;
  selectedTable: number | null;
  selectTable: (table: number) => void;
  clearTable: () => void;
  getQuantity: (id: string) => number;
  addItem: (item: MenuItem) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  removeItem: (id: string) => void;
  clear: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (c): c is CartItem =>
        typeof c?.id === 'string' &&
        typeof c?.name === 'string' &&
        typeof c?.price === 'number' &&
        typeof c?.quantity === 'number'
    );
  } catch {
    return [];
  }
}

function loadTable(): number | null {
  try {
    const raw = localStorage.getItem(TABLE_STORAGE_KEY);
    if (!raw) return null;
    const num = Number(raw);
    return Number.isInteger(num) && num >= 1 && num <= TOTAL_TABLES ? num : null;
  } catch {
    return null;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart);
  const [selectedTable, setSelectedTable] = useState<number | null>(loadTable);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore quota errors
    }
  }, [items]);

  useEffect(() => {
    try {
      if (selectedTable !== null) {
        localStorage.setItem(TABLE_STORAGE_KEY, String(selectedTable));
      } else {
        localStorage.removeItem(TABLE_STORAGE_KEY);
      }
    } catch {
      // ignore quota errors
    }
  }, [selectedTable]);

  const getQuantity = useCallback(
    (id: string) => items.find((i) => i.id === id)?.quantity ?? 0,
    [items]
  );

  const addItem = useCallback((item: MenuItem) => {
    if (item.isAvailable === false) return;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
        },
      ];
    });
  }, []);

  const increment = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
    );
  }, []);

  const decrement = useCallback((id: string) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const selectTable = useCallback((table: number) => {
    setSelectedTable(table);
  }, []);

  const clearTable = useCallback(() => {
    setSelectedTable(null);
  }, []);

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount,
      total,
      selectedTable,
      selectTable,
      clearTable,
      getQuantity,
      addItem,
      increment,
      decrement,
      removeItem,
      clear,
    }),
    [items, itemCount, total, selectedTable, selectTable, clearTable, getQuantity, addItem, increment, decrement, removeItem, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
