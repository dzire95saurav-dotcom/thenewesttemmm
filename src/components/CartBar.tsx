import { useCart } from '@/hooks/useCart';
import { ShoppingCart } from 'lucide-react';

interface CartBarProps {
  onOpen: () => void;
}

export function CartBar({ onOpen }: CartBarProps) {
  const { itemCount, total } = useCart();

  if (itemCount === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-3 pb-3 sm:px-4 sm:pb-4">
      <button
        type="button"
        onClick={onOpen}
        className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl bg-plum-900 px-4 py-3 text-cream-50 shadow-2xl ring-1 ring-plum-700 transition-all hover:bg-plum-800 active:scale-[0.98] sm:px-6 sm:py-3.5"
      >
        <span className="flex items-center gap-2.5">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-saffron-500">
            <ShoppingCart className="h-4 w-4 text-white" />
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-maroon-500 px-1 text-[10px] font-bold text-white">
              {itemCount}
            </span>
          </span>
          <span className="text-sm font-semibold sm:text-base">View Cart</span>
        </span>
        <span className="font-serif text-base font-bold text-saffron-300 sm:text-lg">
          &#8377;{total}
        </span>
      </button>
    </div>
  );
}
