import { useState } from 'react';
import { Search, Heart, Square, User, ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  onChangeCollection?: (collection: string, typeFilter?: 'all' | 'sunglasses' | 'glasses') => void;
  onChangeView?: (view: 'home' | 'story' | 'store') => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  cartCount?: number;
  wishlistCount?: number;
  onOpenCart?: (tab: 'cart' | 'wishlist') => void;
}

export default function Header({ 
  onChangeCollection, 
  onChangeView, 
  searchQuery = "", 
  onSearchChange,
  cartCount = 0,
  wishlistCount = 0,
  onOpenCart
}: Props) {
  const [isSunglassesHovered, setIsSunglassesHovered] = useState(false);
  const [isGlassesHovered, setIsGlassesHovered] = useState(false);
  const [isCollectionsHovered, setIsCollectionsHovered] = useState(false);
  const [isMoreHovered, setIsMoreHovered] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSelectCollection = (name: string, typeFilter?: 'all' | 'sunglasses' | 'glasses') => {
    if (onChangeCollection) {
      onChangeCollection(name, typeFilter);
    }
    if (onChangeView) {
      onChangeView('home');
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full h-[48px] bg-brand-bg/80 backdrop-blur-xl z-[1000] flex items-center justify-between px-4 sm:px-6 lg:px-12 border-b border-black/5">
      {/* Mobile Hamburger Menu Toggle */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden p-1.5 hover:bg-black/5 rounded-full transition-colors cursor-pointer text-brand-ink z-[1020]"
        aria-label="메뉴 토글"
      >
        {isMobileMenuOpen ? <X size={18} strokeWidth={2} /> : <Menu size={18} strokeWidth={2} />}
      </button>

      <nav className="hidden lg:flex items-center gap-6 text-[13px] font-semibold tracking-tight h-full">
        <div
          className="relative h-full flex items-center"
          onMouseEnter={() => setIsCollectionsHovered(true)}
          onMouseLeave={() => setIsCollectionsHovered(false)}
        >
          <button 
            onClick={() => onChangeView && onChangeView('home')} 
            className="hover:opacity-60 transition-opacity h-full flex items-center cursor-pointer font-semibold"
          >
            컬렉션
          </button>
          
          <AnimatePresence>
            {isCollectionsHovered && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 2 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute top-[48px] -left-6 bg-brand-bg border-x border-b border-black/5 shadow-xl rounded-b-xl px-6 py-4 flex flex-col gap-3 text-[13px] font-semibold text-brand-ink z-[1100]"
              >
                <button 
                  onClick={() => handleSelectCollection("전체보기", "all")}
                  className="text-left hover:opacity-100 opacity-60 transition-all duration-200 tracking-tight whitespace-nowrap cursor-pointer"
                >
                  전체보기
                </button>
                <button 
                  onClick={() => handleSelectCollection("꽃 컬렉션", "all")}
                  className="text-left hover:opacity-100 opacity-60 transition-all duration-200 tracking-tight whitespace-nowrap cursor-pointer"
                >
                  꽃 컬렉션
                </button>
                <button 
                  onClick={() => handleSelectCollection("궁궐 컬렉션", "all")}
                  className="text-left hover:opacity-100 opacity-60 transition-all duration-200 tracking-tight whitespace-nowrap cursor-pointer"
                >
                  궁궐 컬렉션
                </button>
                <button 
                  onClick={() => handleSelectCollection("날개 컬렉션", "all")}
                  className="text-left hover:opacity-100 opacity-60 transition-all duration-200 tracking-tight whitespace-nowrap cursor-pointer"
                >
                  날개 컬렉션
                </button>
                <button 
                  onClick={() => handleSelectCollection("문양 컬렉션", "all")}
                  className="text-left hover:opacity-100 opacity-60 transition-all duration-200 tracking-tight whitespace-nowrap cursor-pointer"
                >
                  문양 컬렉션
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div
          className="relative h-full flex items-center"
          onMouseEnter={() => setIsMoreHovered(true)}
          onMouseLeave={() => setIsMoreHovered(false)}
        >
          <button 
            className="hover:opacity-60 transition-opacity h-full flex items-center cursor-pointer font-semibold"
          >
            더 알아보기
          </button>
          
          <AnimatePresence>
            {isMoreHovered && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 2 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute top-[48px] -left-6 bg-brand-bg border-x border-b border-black/5 shadow-xl rounded-b-xl px-6 py-4 flex flex-col gap-3 text-[13px] font-semibold text-brand-ink z-[1100]"
              >
                <button 
                  onClick={() => onChangeView && onChangeView('story')}
                  className="text-left hover:opacity-100 opacity-60 transition-all duration-200 tracking-tight whitespace-nowrap cursor-pointer text-amber-700 font-bold"
                >
                  결의 시선 스토리
                </button>
                <button 
                  onClick={() => onChangeView && onChangeView('store')}
                  className="text-left hover:opacity-100 opacity-60 transition-all duration-200 tracking-tight whitespace-nowrap cursor-pointer"
                >
                  오프라인 스토어
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      <button 
        onClick={() => {
          if (onChangeCollection) {
            onChangeCollection("홈");
          }
          if (onSearchChange) {
            onSearchChange("");
          }
          if (onChangeView) {
            onChangeView('home');
          }
        }}
        className="absolute left-1/2 -translate-x-1/2 font-sans text-[10px] sm:text-xs md:text-sm lg:text-base font-extrabold tracking-[0.1em] sm:tracking-[0.2em] lg:tracking-[0.25em] uppercase whitespace-nowrap cursor-pointer hover:opacity-75 transition-opacity text-neutral-950"
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          GENTLE MONSTER
        </motion.span>
      </button>

      <nav className="flex items-center gap-1.5 sm:gap-2.5 md:gap-4 text-xs font-semibold">
        <span className="hidden lg:inline text-[11px] font-bold opacity-75 mr-1 font-mono tracking-wide">
          {searchQuery ? `"${searchQuery}" 검색 중` : "피톳 M021"}
        </span>
        <button 
          onClick={() => {
            setIsSearchOpen(true);
            if (onChangeView) onChangeView('home');
          }}
          className="p-1.5 hover:bg-black/5 rounded-full transition-colors cursor-pointer"
        >
          <Search size={17} strokeWidth={1.8} />
        </button>

        <button className="p-1.5 hover:bg-black/5 rounded-full transition-colors cursor-pointer">
          <User size={17} strokeWidth={1.8} />
        </button>
        <button 
          onClick={() => onOpenCart && onOpenCart('cart')}
          className="p-1.5 hover:bg-black/5 rounded-full transition-colors relative cursor-pointer" 
        >
          <ShoppingBag size={17} strokeWidth={1.8} />
          {cartCount > 0 ? (
            <span className="absolute -top-1 -right-1 bg-neutral-900 text-white text-[8px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center select-none shadow-xs">
              {cartCount}
            </span>
          ) : (
            <span className="absolute top-0.5 right-0.5 w-[6px] h-[6px] bg-neutral-900 rounded-full" />
          )}
        </button>
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

      {/* Mobile Drawer Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-[48px] left-0 w-full bg-brand-bg/95 backdrop-blur-xl border-b border-black/10 shadow-2xl z-[990] overflow-y-auto max-h-[85vh] lg:hidden flex flex-col font-sans"
          >
            <div className="px-6 py-4 flex flex-col divide-y divide-black/5 text-left">
              {/* Category: Collections (all) */}
              <div className="py-3">
                <div style={{ fontFamily: 'Georgia, serif' }} className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-2">Category / 통합 컬렉션</div>
                <div className="flex flex-wrap gap-1.5">
                  <button 
                    onClick={() => { handleSelectCollection("전체보기", "all"); setIsMobileMenuOpen(false); }}
                    className="px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300 text-neutral-800 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                  >
                    전체 컬렉션
                  </button>
                  {["꽃 컬렉션", "궁궐 컬렉션", "날개 컬렉션", "문양 컬렉션"].map((col) => (
                    <button 
                      key={col}
                      onClick={() => { handleSelectCollection(col, "all"); setIsMobileMenuOpen(false); }}
                      className="px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300 text-neutral-800 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category: More / 더 알아보기 */}
              <div className="py-3">
                <div style={{ fontFamily: 'Georgia, serif' }} className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-2">More / 더 알아보기</div>
                <div className="flex flex-col gap-1 text-[13px] text-brand-ink">
                  <button 
                    onClick={() => { if (onChangeView) onChangeView('story'); setIsMobileMenuOpen(false); }}
                    className="w-full text-left py-2 hover:opacity-60 transition-opacity cursor-pointer flex justify-between items-center text-amber-700 font-bold"
                  >
                    <span>결의 시선 스토리</span>
                    <span className="text-[10px] font-mono opacity-75">STORY</span>
                  </button>
                  <button 
                    onClick={() => { if (onChangeView) onChangeView('store'); setIsMobileMenuOpen(false); }}
                    className="w-full text-left py-2 hover:opacity-60 transition-opacity cursor-pointer flex justify-between items-center"
                  >
                    <span className="font-semibold">오프라인 스토어</span>
                    <span className="text-[10px] font-mono opacity-50">STORE</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
