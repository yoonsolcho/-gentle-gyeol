import { useState } from 'react';
import { Search, Heart, Square } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  onChangeCollection?: (collection: string) => void;
  onChangeView?: (view: 'home' | 'story') => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export default function Header({ onChangeCollection, onChangeView, searchQuery = "", onSearchChange }: Props) {
  const [isSunglassesHovered, setIsSunglassesHovered] = useState(false);
  const [isGlassesHovered, setIsGlassesHovered] = useState(false);
  const [isMoreHovered, setIsMoreHovered] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSelectCollection = (name: string) => {
    if (onChangeCollection) {
      onChangeCollection(name);
    }
    if (onChangeView) {
      onChangeView('home');
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full h-[72px] bg-brand-bg/80 backdrop-blur-xl z-[1000] flex items-center justify-between px-6 md:px-12 border-b border-black/5">
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
                  onClick={() => handleSelectCollection("전체보기")}
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

        <div
          className="relative h-full flex items-center"
          onMouseEnter={() => setIsGlassesHovered(true)}
          onMouseLeave={() => setIsGlassesHovered(false)}
        >
          <a href="#" className="hover:opacity-60 transition-opacity h-full flex items-center">
            안경
          </a>
          
          <AnimatePresence>
            {isGlassesHovered && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 2 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute top-[72px] -left-6 bg-brand-bg border-x border-b border-black/5 shadow-xl rounded-b-xl px-8 py-6 flex flex-col gap-4 text-[15px] font-semibold text-brand-ink z-[1100]"
              >
                <button 
                  onClick={() => handleSelectCollection("전체보기")}
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

        <button 
          onClick={() => onChangeView && onChangeView('home')} 
          className="hover:opacity-60 transition-opacity cursor-pointer font-semibold"
        >
          컬렉션
        </button>
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
                <button 
                  onClick={() => onChangeView && onChangeView('story')}
                  className="text-left hover:opacity-100 opacity-60 transition-all duration-200 tracking-tight whitespace-nowrap cursor-pointer"
                >
                  스토리
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      <button 
        onClick={() => onChangeView && onChangeView('home')}
        className="absolute left-1/2 -translate-x-1/2 font-serif text-2xl md:text-3xl tracking-[0.1em] font-normal whitespace-nowrap cursor-pointer hover:opacity-75 transition-opacity"
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          결의 시선
        </motion.span>
      </button>

      <nav className="flex items-center gap-4 md:gap-8">
        <span className="hidden md:inline text-sm font-medium opacity-60">
          {searchQuery ? `"${searchQuery}" 검색 중` : "청화 02(BL)"}
        </span>
        <button 
          onClick={() => {
            setIsSearchOpen(true);
            if (onChangeView) onChangeView('home');
          }}
          className="p-2 hover:bg-black/5 rounded-full transition-colors cursor-pointer"
          title="제품명 검색"
        >
          <Search size={22} strokeWidth={1.5} />
        </button>
        <button className="p-2 hover:bg-black/5 rounded-full transition-colors"><Heart size={22} strokeWidth={1.5} /></button>
        <button className="p-2 hover:bg-black/5 rounded-full transition-colors"><Square size={22} strokeWidth={1.5} /></button>
      </nav>

      {/* Slide-down Premium Search Overlay Bar */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-white/95 backdrop-blur-md z-[1010] flex items-center justify-between px-6 md:px-12 border-b border-black/10"
          >
            <div className="flex items-center gap-4 w-full max-w-3xl mx-auto">
              <Search className="text-brand-ink/50" size={20} strokeWidth={2} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  if (onSearchChange) onSearchChange(e.target.value);
                }}
                placeholder="어떤 제품을 찾으시나요? (예: 매화, 벚꽃, 기와, 천공, 연화문...)"
                className="w-full bg-transparent border-none text-base md:text-lg text-brand-ink font-semibold focus:outline-none placeholder-brand-ink/25 text-left h-12"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    if (onSearchChange) onSearchChange("");
                  }}
                  className="text-xs font-mono tracking-wider font-bold bg-brand-ink/5 hover:bg-brand-ink/10 text-brand-ink/75 px-3 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer"
                >
                  CLEAR
                </button>
              )}
            </div>
            
            <button
              onClick={() => {
                setIsSearchOpen(false);
                if (onSearchChange) onSearchChange("");
              }}
              className="ml-6 px-4 py-2 bg-brand-ink text-white text-xs font-bold tracking-wider rounded-full hover:opacity-90 transition-opacity whitespace-nowrap cursor-pointer hover:shadow-sm"
            >
              닫기
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
