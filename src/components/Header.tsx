import { useState } from 'react';
import { Search, Heart, Square } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  onChangeCollection?: (collection: string) => void;
}

export default function Header({ onChangeCollection }: Props) {
  const [isSunglassesHovered, setIsSunglassesHovered] = useState(false);
  const [isMoreHovered, setIsMoreHovered] = useState(false);

  const handleSelectCollection = (name: string) => {
    if (onChangeCollection) {
      onChangeCollection(name);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full h-[72px] bg-brand-bg/90 backdrop-blur-xl z-[1000] flex items-center justify-between px-6 md:px-12 border-b border-black/5">
      <nav className="hidden lg:flex items-center gap-8 text-[15px] font-semibold tracking-tight h-full">
        <div
          className="relative h-full flex items-center"
          onMouseEnter={() => setIsSunglassesHovered(true)}
          onMouseLeave={() => setIsSunglassesHovered(false)}
        >
          <a href="#" className="hover:opacity-60 transition-opacity h-full flex items-center">
            선글라스
          </a>
          
          <AnimatePresence>
            {isSunglassesHovered && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 2 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute top-[72px] -left-6 bg-brand-bg border-x border-b border-black/5 shadow-xl rounded-b-xl px-8 py-6 flex flex-col gap-4 text-[15px] font-semibold text-brand-ink z-[1100]"
              >
                <button 
                  onClick={() => handleSelectCollection("전통공예")}
                  className="text-left hover:opacity-100 opacity-60 transition-all duration-200 tracking-tight whitespace-nowrap"
                >
                  전체보기
                </button>
                <button 
                  onClick={() => handleSelectCollection("꽃 컬렉션")}
                  className="text-left hover:opacity-100 opacity-60 transition-all duration-200 tracking-tight whitespace-nowrap"
                >
                  꽃 컬렉션
                </button>
                <button 
                  onClick={() => handleSelectCollection("궁궐 컬렉션")}
                  className="text-left hover:opacity-100 opacity-60 transition-all duration-200 tracking-tight whitespace-nowrap"
                >
                  궁궐 컬렉션
                </button>
                <button 
                  onClick={() => handleSelectCollection("날개 컬렉션")}
                  className="text-left hover:opacity-100 opacity-60 transition-all duration-200 tracking-tight whitespace-nowrap"
                >
                  날개 컬렉션
                </button>
                <button 
                  onClick={() => handleSelectCollection("문양 컬렉션")}
                  className="text-left hover:opacity-100 opacity-60 transition-all duration-200 tracking-tight whitespace-nowrap"
                >
                  문양 컬렉션
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <a href="#" className="hover:opacity-60 transition-opacity">안경</a>
        <a href="#" className="hover:opacity-60 transition-opacity">컬렉션</a>
        <div
          className="relative h-full flex items-center"
          onMouseEnter={() => setIsMoreHovered(true)}
          onMouseLeave={() => setIsMoreHovered(false)}
        >
          <a href="#" className="hover:opacity-60 transition-opacity h-full flex items-center">
            더 알아보기
          </a>
          
          <AnimatePresence>
            {isMoreHovered && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 2 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute top-[72px] -left-6 bg-brand-bg border-x border-b border-black/5 shadow-xl rounded-b-xl px-8 py-6 flex flex-col gap-4 text-[15px] font-semibold text-brand-ink z-[1100]"
              >
                <a href="#" className="hover:opacity-100 opacity-60 transition-all duration-200 tracking-tight whitespace-nowrap">
                  스토어
                </a>
                <a href="#" className="hover:opacity-100 opacity-60 transition-all duration-200 tracking-tight whitespace-nowrap">
                  스토리
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      <div className="absolute left-1/2 -translate-x-1/2 font-serif text-2xl md:text-3xl tracking-[0.1em] font-bold whitespace-nowrap">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          결의 시선
        </motion.span>
      </div>

      <nav className="flex items-center gap-4 md:gap-8">
        <span className="hidden md:inline text-sm font-medium opacity-60">청화 02(BL)</span>
        <button className="p-2 hover:bg-black/5 rounded-full transition-colors"><Search size={22} strokeWidth={1.5} /></button>
        <button className="p-2 hover:bg-black/5 rounded-full transition-colors"><Heart size={22} strokeWidth={1.5} /></button>
        <button className="p-2 hover:bg-black/5 rounded-full transition-colors"><Square size={22} strokeWidth={1.5} /></button>
      </nav>
    </header>
  );
}
