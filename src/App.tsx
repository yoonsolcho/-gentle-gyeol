import { useState } from 'react';
import Header from './components/Header';
import CollectionChips from './components/CollectionChips';
import Hero from './components/Hero';
import Story from './components/Story';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeCollection, setActiveCollection] = useState("꽃 컬렉션");
  const [view, setView] = useState<'home' | 'story'>('home');
  const [searchQuery, setSearchQuery] = useState("");

  const handleNavigate = (newView: 'home' | 'story') => {
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-brand-bg text-brand-ink">
      <Header 
        onChangeCollection={setActiveCollection} 
        onChangeView={handleNavigate}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {view === 'home' ? (
            <motion.div
              key="home-page"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <CollectionChips 
                activeCollection={activeCollection} 
                onChangeCollection={setActiveCollection} 
                onSearchClear={() => setSearchQuery("")}
                isSearching={!!searchQuery}
              />
              
              <Hero onOpenStory={() => handleNavigate('story')} />

              <ProductGrid activeCollection={activeCollection} searchQuery={searchQuery} />
            </motion.div>
          ) : (
            <motion.div
              key="story-page"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Story onBack={() => handleNavigate('home')} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
