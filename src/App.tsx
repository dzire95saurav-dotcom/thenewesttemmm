import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { OpeningAnimation } from '@/components/OpeningAnimation';
import { Header } from '@/components/Header';
import { HeroCard } from '@/components/HeroCard';
import { ChefSpecials } from '@/components/ChefSpecials';
import { SearchBar } from '@/components/SearchBar';
import { CategoryNav } from '@/components/CategoryNav';
import { MenuSection } from '@/components/MenuSection';
import { EndOfMenu } from '@/components/EndOfMenu';
import { Footer } from '@/components/Footer';
import { MenuItemCard } from '@/components/MenuItemCard';
import { CartBar } from '@/components/CartBar';
import { CartDrawer } from '@/components/CartDrawer';
import { CartProvider } from '@/context/CartContext';
import { useMenuData } from '@/hooks/useMenuData';
import type { MenuCategory } from '@/types';
import { Search as SearchIcon } from 'lucide-react';

function MenuApp() {
  const { categories: menuCategories, loading } = useMenuData();
  const [showOpening, setShowOpening] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [footerMounted, setFooterMounted] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const stickyRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  const isSearching = searchQuery.trim().length > 0;
  const normalizedQuery = searchQuery.trim().toLowerCase();

  // All sections in order — matches the category nav order
  const allSections = useMemo(
    () => [
      ...menuCategories.map((cat) => ({
        id: cat.id,
        label: cat.label,
        shortLabel: cat.shortLabel,
      })),
    ],
    [menuCategories]
  );

  const activeIndex = allSections.findIndex((s) => s.id === activeCategory);
  const isLastSection = activeIndex === allSections.length - 1;
  const activeMenuCategory = menuCategories.find((c) => c.id === activeCategory);
  // Bolt badge hatane ke liye
  useEffect(() => {
    const interval = setInterval(() => {
      const badge = document.querySelector('a[href*="bolt.new"]') as HTMLElement;
      if (badge) {
        badge.style.display = 'none';
        badge.remove();
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (!activeCategory && menuCategories.length > 0) {
      setActiveCategory(menuCategories[0].id);
    }
  }, [activeCategory, menuCategories]);

  // Search filtering (unchanged)
  const filteredCategories: MenuCategory[] = useMemo(() => {
    if (!isSearching) return menuCategories;

    return menuCategories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            item.name.toLowerCase().includes(normalizedQuery) ||
            item.description.toLowerCase().includes(normalizedQuery) ||
            cat.label.toLowerCase().includes(normalizedQuery)
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [isSearching, normalizedQuery, menuCategories]);

  const totalResults = useMemo(
    () => filteredCategories.reduce((sum, cat) => sum + cat.items.length, 0),
    [filteredCategories]
  );

  // Scroll to top of the section area when the active section changes
  useEffect(() => {
    if (isSearching || showOpening) return;

    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    requestAnimationFrame(() => {
      const el = stickyRef.current;
      if (el) {
        window.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
      }
    });
  }, [activeCategory, isSearching, showOpening]);

  // Unmount footer when leaving the last section
  useEffect(() => {
    if (!isLastSection) {
      setFooterMounted(false);
      setFooterVisible(false);
    }
  }, [isLastSection]);

  // Handle category nav click
  const handleCategorySelect = useCallback((id: string) => {
    setActiveCategory(id);
  }, []);

  // Handle "Next Section" — advance to next section or show footer on last
  const handleNextSection = useCallback(() => {
    if (isLastSection) {
      setFooterMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setFooterVisible(true);
        });
      });
    } else {
      const next = allSections[activeIndex + 1];
      if (next) {
        setActiveCategory(next.id);
      }
    }
  }, [isLastSection, activeIndex, allSections]);

  // After the footer finishes its transition, scroll to it
  const handleFooterTransitionEnd = useCallback(() => {
    if (footerVisible) {
      const footer = document.getElementById('footer');
      footer?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [footerVisible]);

  if (showOpening) {
    return <OpeningAnimation onComplete={() => setShowOpening(false)} />;
  }

  if (loading || !activeCategory) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream-50">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-saffron-300 border-t-saffron-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-cream-50">
      <Header />

      <HeroCard />

      <ChefSpecials />

      {/* Sticky search + nav container */}
      <div ref={stickyRef} className="sticky top-0 z-40 mt-6 sm:mt-8">
        <div className="bg-cream-50/95 px-4 pb-3 pt-4 backdrop-blur-lg sm:px-6">
          <div className="mx-auto max-w-6xl">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              resultCount={totalResults}
              isSearching={isSearching}
            />
          </div>
        </div>

        {!isSearching && (
          <CategoryNav
            categories={allSections}
            activeId={activeCategory}
            onSelect={handleCategorySelect}
          />
        )}
      </div>

      {/* Main content */}
      <main className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        {isSearching ? (
          /* Search results view — shows matches across all categories */
          <div className="py-6">
            {totalResults > 0 ? (
              <>
                {filteredCategories.map((cat) => (
                  <div key={cat.id} className="mb-8">
                    <h2 className="mb-4 flex items-center gap-2 font-serif text-xl font-bold text-plum-900 sm:text-2xl">
                      <span className="h-px w-5 bg-saffron-500" />
                      {cat.label}
                    </h2>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5">
                      {cat.items.map((item, index) => (
                        <MenuItemCard key={item.id} item={item} index={index} />
                      ))}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cream-200">
                  <SearchIcon className="h-7 w-7 text-charcoal-400" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-plum-700">
                  No dishes found
                </h3>
                <p className="mt-2 max-w-xs text-sm text-charcoal-500">
                  We couldn't find anything matching "{searchQuery}". Try searching for biryani, tandoor, or curry.
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-5 rounded-full bg-plum-900 px-5 py-2.5 text-sm font-medium text-cream-50 transition-all hover:bg-plum-800 active:scale-95"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Normal browsing — one section at a time */
          <>
            {activeMenuCategory ? (
              <MenuSection key={activeMenuCategory.id} category={activeMenuCategory} />
            ) : null}

            {/* End-of-section card — always shown after the active section */}
            <EndOfMenu onNext={handleNextSection} isLastSection={isLastSection} />
          </>
        )}
      </main>

      {/* Footer — only mounts after the user clicks the button on the last section */}
      {footerMounted && (
        <div
          className={`transition-all duration-700 ease-out ${
            footerVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`
          }
          onTransitionEnd={handleFooterTransitionEnd}
        >
          <Footer />
        </div>
      )}

      {/* Floating cart bar + drawer */}
      <CartBar onOpen={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MenuApp />
    </CartProvider>
  );
}
