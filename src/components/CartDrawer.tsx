import { useEffect } from 'react';
import { useCart } from '@/hooks/useCart';
import { X, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, itemCount, total, increment, decrement, removeItem, clear } = useCart();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-plum-950/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div className="relative flex h-full w-full max-w-md flex-col bg-cream-50 shadow-2xl animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cream-200 px-4 py-4 sm:px-5">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-saffron-600" />
            <h2 className="font-serif text-lg font-bold text-plum-900">Your Cart</h2>
            {itemCount > 0 && (
              <span className="rounded-full bg-saffron-100 px-2 py-0.5 text-[10px] font-bold text-saffron-700">
                {itemCount} item{itemCount !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-charcoal-500 transition-colors hover:bg-cream-200 hover:text-plum-700"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cream-200">
              <ShoppingCart className="h-7 w-7 text-charcoal-400" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-plum-700">
              Your cart is empty
            </h3>
            <p className="mt-2 max-w-xs text-sm text-charcoal-500">
              Browse the menu and add some delicious dishes to your cart.
            </p>
            <button
              onClick={onClose}
              className="mt-5 rounded-full bg-plum-900 px-5 py-2.5 text-sm font-medium text-cream-50 transition-all hover:bg-plum-800 active:scale-95"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-3 sm:px-5">
              <ul className="space-y-3">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="rounded-xl border border-cream-200 bg-white p-3 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h4 className="font-serif text-sm font-semibold text-plum-900">
                          {item.name}
                        </h4>
                        <p className="mt-0.5 text-xs text-charcoal-500">
                          &#8377;{item.price} each
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-charcoal-400 transition-colors hover:bg-maroon-50 hover:text-maroon-600"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between">
                      <div className="flex items-center rounded-lg border border-saffron-200 bg-saffron-50">
                        <button
                          type="button"
                          onClick={() => decrement(item.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-l-lg text-saffron-700 transition-colors hover:bg-saffron-100 active:scale-90"
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-8 text-center text-sm font-bold text-saffron-700">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => increment(item.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-r-lg text-saffron-700 transition-colors hover:bg-saffron-100 active:scale-90"
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="font-serif text-sm font-bold text-saffron-600">
                        &#8377;{item.price * item.quantity}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={clear}
                className="mt-4 w-full rounded-lg py-2 text-xs font-medium text-maroon-600 transition-colors hover:bg-maroon-50"
              >
                Clear cart
              </button>
            </div>

            {/* Footer with total */}
            <div className="border-t border-cream-200 bg-white px-4 py-4 sm:px-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium text-charcoal-600">
                  Total ({itemCount} item{itemCount !== 1 ? 's' : ''})
                </span>
                <span className="font-serif text-xl font-bold text-plum-900">
                  &#8377;{total}
                </span>
              </div>
              <p className="text-center text-[10px] text-charcoal-400">
                Taxes included. Pickup / ordering options coming soon.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
