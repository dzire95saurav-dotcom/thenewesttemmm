import { useCart } from '@/hooks/useCart';
import type { MenuItem } from '@/types';
import { Minus, Plus } from 'lucide-react';

interface AddToCartButtonProps {
  item: MenuItem;
}

export function AddToCartButton({ item }: AddToCartButtonProps) {
  const { getQuantity, addItem, increment, decrement } = useCart();
  const qty = getQuantity(item.id);
  const isAvailable = item.isAvailable !== false;

  if (!isAvailable) {
    return (
      <button
        type="button"
        disabled
        className="mt-auto w-full cursor-not-allowed rounded-lg bg-charcoal-200 py-2 text-xs font-semibold text-charcoal-500"
      >
        Unavailable
      </button>
    );
  }

  if (qty === 0) {
    return (
      <button
        type="button"
        onClick={() => addItem(item)}
        className="mt-auto w-full rounded-lg bg-saffron-500 py-2 text-xs font-semibold text-white transition-colors hover:bg-saffron-600 active:scale-95"
      >
        Add to Cart
      </button>
    );
  }

  return (
    <div className="mt-auto flex items-center justify-between rounded-lg border border-saffron-200 bg-saffron-50">
      <button
        type="button"
        onClick={() => decrement(item.id)}
        className="flex h-8 w-9 items-center justify-center rounded-l-lg text-saffron-700 transition-colors hover:bg-saffron-100 active:scale-90"
        aria-label={`Decrease ${item.name} quantity`}
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="text-sm font-bold text-saffron-700">{qty}</span>
      <button
        type="button"
        onClick={() => increment(item.id)}
        className="flex h-8 w-9 items-center justify-center rounded-r-lg text-saffron-700 transition-colors hover:bg-saffron-100 active:scale-90"
        aria-label={`Increase ${item.name} quantity`}
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
