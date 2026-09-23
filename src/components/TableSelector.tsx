import { useCart } from '@/hooks/useCart';

export function TableSelector() {
  const { selectedTable, selectTable, clearTable } = useCart();
  const tableNumbers = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <div className="rounded-xl border border-cream-200 bg-white p-3 shadow-sm sm:p-4">
      <div className="mb-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-plum-700">
            Table Number
          </span>
        </div>
        {selectedTable !== null && (
          <button
            type="button"
            onClick={clearTable}
            className="text-[10px] font-medium text-maroon-600 transition-colors hover:text-maroon-700"
          >
            Clear
          </button>
        )}
      </div>

      <div className="grid grid-cols-5 gap-1.5 sm:grid-cols-7 sm:gap-2">
        {tableNumbers.map((num) => {
          const isSelected = selectedTable === num;
          return (
            <button
              key={num}
              type="button"
              onClick={() => selectTable(num)}
              className={`flex h-9 items-center justify-center rounded-lg text-sm font-semibold transition-all active:scale-90 sm:h-10 sm:text-base ${
                isSelected
                  ? 'bg-saffron-500 text-white shadow-md ring-2 ring-saffron-300'
                  : 'border border-cream-300 bg-cream-50 text-charcoal-600 hover:border-saffron-300 hover:text-saffron-600'
              }`}
              aria-label={`Select Table ${num}`}
              aria-pressed={isSelected}
            >
              {num}
            </button>
          );
        })}
      </div>

      {selectedTable !== null ? (
        <p className="mt-2.5 text-xs font-medium text-saffron-700">
          Selected table: <span className="font-bold">Table {selectedTable}</span>
        </p>
      ) : (
        <p className="mt-2.5 text-xs font-medium text-maroon-600">
          Please select your table number.
        </p>
      )}
    </div>
  );
}
