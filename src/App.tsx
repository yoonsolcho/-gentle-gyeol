import { useState, useEffect } from 'react';
import Header from './components/Header';
import CollectionChips from './components/CollectionChips';
import Hero from './components/Hero';
import Story from './components/Story';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import StoreMap from './components/StoreMap';
import Footer from './components/Footer';
import { motion, AnimatePresence } from 'motion/react';
import { Product, productsData } from './data/products';
import CartModal, { CartItem } from './components/CartModal';

export default function App() {
  const [activeCollection, setActiveCollection] = useState("홈");
  const [view, setView] = useState<'home' | 'story' | 'store'>('home');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Central Shopping Bag & Wishlist States
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartActiveTab, setCartActiveTab] = useState<'cart' | 'wishlist'>('cart');

  // Background Image Preloading Optimization
  useEffect(() => {
    const imagesToPreload = [
      // Crucial Fallbacks & Story Media
      '/assets/products/꽃/매화/매화_제품상세컷2.jpeg',
      '/assets/sections/hero_bg.jpeg',
      
      // Product Thumbnail Assets across all collections for instanced rendering
      '/assets/products/꽃/매화/매화_대각선.png',
      '/assets/products/꽃/연꽃/연꽃_대각선.png',
      '/assets/products/꽃/국화/국화_대각선-1.png',
      '/assets/products/궁궐/기와/기와_대각선-1.png',
      '/assets/products/궁궐/창호/창호_대각선-1.jpeg',
      '/assets/products/궁궐/단청/단청_대각선-1.png',
      '/assets/products/날개/비상/비상_대각선-1.png',
      '/assets/products/날개/천공/천공_대각선-1.png',
      '/assets/products/날개/바람/바람_대각선-1.png',
      '/assets/products/문양/연화문/연화문_대각선-1.png',
      '/assets/products/문양/당초문/당초문_대각선-1.png',
      '/assets/products/문양/격자문/격자문_대각선.png'
    ];

    const preloadAll = () => {
      imagesToPreload.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    };

    // Use requestIdleCallback if available, fallback to passive setTimeout
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => preloadAll());
    } else {
      setTimeout(preloadAll, 800);
    }
  }, []);

  const handleNavigate = (newView: 'home' | 'story' | 'store') => {
    setView(newView);
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleSelectCollection = (collection: string) => {
    setActiveCollection(collection);
    setSelectedProduct(null);
    setView('home');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setSelectedProduct(null);
    setView('home');
  };

  const handleSelectProduct = (prod: Product) => {
    setSelectedProduct(prod);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Heart (Wishlist) Toggle Handler
  const handleToggleWishlist = (product: Product) => {
    setWishlistItems((prev) => {
      const exists = prev.some((w) => w.id === product.id);
      if (exists) {
        return prev.filter((w) => w.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  // Add To Cart Handler
  const handleAddToCart = (product: Product, colorName: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + 1,
        };
        return next;
      } else {
        return [...prev, { product, colorName, quantity: 1 }];
      }
    });
    setCartActiveTab('cart');
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlistItems((prev) => prev.filter((w) => w.id !== productId));
  };

  const handleAddToCartFromWishlist = (product: Product) => {
    handleAddToCart(product, '기본 색상');
    handleRemoveFromWishlist(product.id);
  };

  const handleOpenCart = (tab: 'cart' | 'wishlist') => {
    setCartActiveTab(tab);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-brand-bg text-brand-ink">
      <Header 
        onChangeCollection={handleSelectCollection} 
        onChangeView={handleNavigate}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlistItems.length}
        onOpenCart={handleOpenCart}
      />
      
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {selectedProduct ? (
            <motion.div
              key="detail-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <ProductDetail 
                product={selectedProduct} 
                onBack={() => setSelectedProduct(null)}
                onSelectProduct={handleSelectProduct}
                allProducts={productsData}
                wishlistItems={wishlistItems}
                onToggleWishlist={handleToggleWishlist}
                onAddToCart={handleAddToCart}
              />
            </motion.div>
          ) : view === 'home' ? (
            <motion.div
              key="home-page"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <CollectionChips 
                activeCollection={activeCollection} 
                onChangeCollection={handleSelectCollection} 
                onSearchClear={() => setSearchQuery("")}
                isSearching={!!searchQuery}
                onOpenStory={() => handleNavigate('story')}
              />
              
              {activeCollection === "홈" && (
                <Hero onOpenStory={() => handleNavigate('story')} />
              )}

              <ProductGrid 
                activeCollection={activeCollection} 
                searchQuery={searchQuery} 
                onSelectProduct={handleSelectProduct}
                wishlistItems={wishlistItems}
                onToggleWishlist={handleToggleWishlist}
                onChangeCollection={handleSelectCollection}
              />
            </motion.div>
          ) : view === 'story' ? (
            <motion.div
              key="story-page"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Story onBack={() => handleNavigate('home')} />
            </motion.div>
          ) : (
            <motion.div
              key="store-page"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <StoreMap onBack={() => handleNavigate('home')} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />

      <AnimatePresence>
        {isCartOpen && (
          <CartModal
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cartItems}
            wishlistItems={wishlistItems}
            onUpdateCartQuantity={handleUpdateCartQuantity}
            onRemoveFromCart={handleRemoveFromCart}
            onRemoveFromWishlist={handleRemoveFromWishlist}
            onAddToCartFromWishlist={handleAddToCartFromWishlist}
            onSelectProduct={handleSelectProduct}
            activeTab={cartActiveTab}
            setActiveTab={setCartActiveTab}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
