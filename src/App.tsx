import { useState } from 'react';
import Header from './components/Header';
import CollectionChips from './components/CollectionChips';
import Hero from './components/Hero';
import Story from './components/Story';
import ProductGrid from './components/ProductGrid';
import FilterPanel from './components/FilterPanel';
import Footer from './components/Footer';
import { motion } from 'motion/react';

export default function App() {
  const [activeCollection, setActiveCollection] = useState("전통공예");

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header onChangeCollection={setActiveCollection} />
      
      <main className="flex-1">
        <CollectionChips 
          activeCollection={activeCollection} 
          onChangeCollection={setActiveCollection} 
        />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Hero />
          
          <div className="h-[72px] flex justify-between items-center px-6 md:px-12 bg-gradient-to-b from-[#c9c4c2] to-brand-bg font-bold">
            <div className="flex gap-6">
              <span className="opacity-80">{activeCollection}</span>
              <span className="cursor-pointer hover:opacity-60 transition-opacity">아이템⌄</span>
            </div>
            <div className="cursor-pointer hover:opacity-60 transition-opacity uppercase tracking-widest text-sm">필터 ☷</div>
          </div>

          <Story />
          <ProductGrid activeCollection={activeCollection} />
          <FilterPanel />
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
