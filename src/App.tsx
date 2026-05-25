import { useState } from 'react';
import Header from './components/Header';
import CollectionChips from './components/CollectionChips';
import Hero from './components/Hero';
import Story from './components/Story';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import { motion } from 'motion/react';

export default function App() {
  const [activeCollection, setActiveCollection] = useState("꽃 컬렉션");

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
              <span className="opacity-85">{activeCollection} 컬렉션</span>
            </div>
            <div className="uppercase tracking-widest text-xs opacity-60 font-mono">2026 GENTLE 結</div>
          </div>

          <Story />
          <ProductGrid activeCollection={activeCollection} />
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
