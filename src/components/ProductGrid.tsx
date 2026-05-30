import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { productsData } from '../data/products';
import GlassesRenderer from './GlassesRenderer';

import { Product } from '../data/products';

interface Props {
  activeCollection: string;
  activeCategoryFilter?: 'all' | 'sunglasses' | 'glasses';
  searchQuery?: string;
  onSelectProduct?: (product: Product) => void;
  wishlistItems?: Product[];
  onToggleWishlist?: (product: Product) => void;
}

export default function ProductGrid({ 
  activeCollection, 
  activeCategoryFilter = 'all',
  searchQuery = "", 
  onSelectProduct,
  wishlistItems = [],
  onToggleWishlist
}: Props) {
  const [showMore, setShowMore] = useState(false);

  // Reset showMore toggled whenever the collection category changes
  useEffect(() => {
    setShowMore(false);
  }, [activeCollection, activeCategoryFilter]);

  const query = searchQuery.trim().toLowerCase();

  // Filter products by the chosen collection, search query, and sunglasses vs glasses activeCategoryFilter
  const filteredProducts = productsData.filter((p) => {
    // 1. Search filter
    if (query) {
      const matchesSearch = p.name.toLowerCase().includes(query) || p.engName.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // 2. Category filter
    if (activeCollection !== "전체보기" && p.category !== activeCollection) {
      return false;
    }
    if (activeCollection === "전체보기") {
      if (p.category === "전통공예") {
        return false;
      }
    }

    // 3. Eyewear Type filter (sunglasses vs glasses)
    if (activeCategoryFilter === "sunglasses" && p.type !== "sunglasses") {
      return false;
    }
    if (activeCategoryFilter === "glasses" && p.type !== "glasses") {
      return false;
    }

    return true;
  });

  const isAllView = activeCollection === "전체보기" && !query;
  const displayProducts = isAllView && !showMore
    ? filteredProducts.slice(0, 4)
    : filteredProducts;

  const getCollectionTitle = () => {
    let suffix = "전체 컬렉션";
    if (activeCategoryFilter === "sunglasses") suffix = "선글라스";
    if (activeCategoryFilter === "glasses") suffix = "안경";

    if (activeCollection === "전체보기") {
      return `2026 GENTLE MONSTER ${suffix}`;
    }
    return `${activeCollection} ${suffix}`;
  };

  const getCollectionDescription = () => {
    let eyewearType = "컬렉션";
    if (activeCategoryFilter === "sunglasses") eyewearType = "선글라스";
    if (activeCategoryFilter === "glasses") eyewearType = "안경";

    if (activeCollection === "전체보기") {
      return `젠틀몬스터의 현대적인 디자인 문법과 한국 무형문화유산 장인들의 백년 전통 금속 세조 기법(주조•단조•입사•칠보)이 융합된 전체 ${eyewearType} 라인업을 통합 소개합니다.`;
    }
    if (activeCollection === "꽃 컬렉션") {
      return `꽃 컬렉션 ${eyewearType}은 한국 야생화의 순수한 유기적인 곡선과 자연의 고유한 아름다움을 예술적 터치로 재해석한 프레임을 통해 우아함을 극대화한 아이웨어로 선보입니다.`;
    }
    if (activeCollection === "궁궐 컬렉션") {
      return `궁궐 컬렉션 ${eyewearType}은 전통 기와지붕의 부드러운 유선 곡선과 전통 격자 조각을 모던 미니멀리즘 프레임에 조화시켜 시대에 없던 웅장하고 깊이 있는 아이웨어로 선보입니다.`;
    }
    if (activeCollection === "날개 컬렉션") {
      return `날개 컬렉션 ${eyewearType}은 창공을 향해 거침없이 비상하는 날갯깃의 기류를 은빛 크롬과 기하학적 유선 프레임 디테일로 조각하여 완벽히 아방가르드한 스타일을 선보입니다.`;
    }
    if (activeCollection === "문양 컬렉션") {
      return `문양 컬렉션 ${eyewearType}은 길상의 기운을 품는 당초문과 전통 원형 연화문 등 천상의 문채를 귀 금속 세공품 공정으로 재해석하여 섬세한 깊이감을 불어넣은 아이웨어로 선보입니다.`;
    }
    return "";
  };

  return (
    <section className="relative py-12 md:py-16 px-6 md:px-12 bg-[#fafafa] border-t border-black/5 overflow-hidden">
      
      {/* Dynamic Collection Info Header in style of Disney x F1 screenshot */}
      <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14 px-4 bg-[#fafafa]">
        <motion.div
          key={query ? `search-${query}` : `${activeCollection}-${activeCategoryFilter}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {query ? (
            <>
              <h2 className="text-base md:text-lg font-bold tracking-tight text-neutral-900 mb-3.5 uppercase">
                "{searchQuery}" 검색 결과
              </h2>
              <p className="text-xs md:text-[13px] font-medium leading-relaxed text-neutral-500 break-keep">
                총 {filteredProducts.length}개의 정교한 수공예 메탈 프레임을 찾았습니다.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-base md:text-[17px] font-extrabold tracking-[0.05em] text-neutral-900 mb-4 block uppercase font-sans">
                {getCollectionTitle()}
              </h2>
              <p className="text-xs md:text-[13px] leading-relaxed text-neutral-500 max-w-2xl mx-auto font-normal break-keep">
                {getCollectionDescription()}
              </p>
            </>
          )}
        </motion.div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-lg text-brand-ink/60 font-semibold mb-2">검색 결과가 없습니다</p>
          <p className="text-xs text-brand-ink/40 font-mono">
            다른 검색어를 시도해 보시거나 컬렉션 메뉴를 이용해 보세요.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-16">
          {/* 1. FRONT ANGLE: CORE SILHOUETTE */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="h-[1px] flex-1 bg-black/5" />
              <span className="text-[9px] font-mono tracking-[0.25em] text-[#999] uppercase select-none">CORE SILHOUETTE</span>
              <span className="h-[1px] flex-1 bg-black/5" />
            </div>

            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10"
            >
              <AnimatePresence mode="popLayout">
                {displayProducts.map((p) => (
                  <motion.article
                    key={`front-${p.id}`}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="flex flex-col group cursor-pointer"
                    onClick={() => onSelectProduct && onSelectProduct(p)}
                  >
                    {/* Image / SVG Container on a beautiful premium gray background */}
                    <div className="h-[240px] w-full bg-[#f6f7f8] rounded-2xl flex items-center justify-center mb-5 relative overflow-hidden transition-all duration-300 hover:bg-[#ecedee]">
                      {/* Clean soft shadow beneath glasses inside display box */}
                      <div className="absolute w-[60%] h-4 bottom-8 bg-black/[0.03] blur-lg rounded-full" />
                      
                      {/* Render the realistic vector representation */}
                      <GlassesRenderer id={p.id} viewType="front" />
                      
                      {/* Status Tags */}
                      {p.soldOut && (
                        <span className="absolute top-4 left-4 bg-black text-[#fafafa] text-[8px] font-bold px-2 py-0.5 tracking-wider uppercase rounded-sm">
                          SOLD OUT
                        </span>
                      )}
                      {p.statusText && !p.soldOut && (
                        <span className="absolute top-4 left-4 bg-brand-dust text-[#fafafa] text-[8px] font-bold px-2 py-0.5 tracking-wider uppercase rounded-sm">
                          {p.statusText}
                        </span>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="px-1 flex flex-col gap-1.5">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-[14px] font-bold tracking-tight text-brand-ink/90 group-hover:text-brand-ink transition-colors leading-snug break-keep">
                            {p.name}
                          </h3>
                          <p className="text-[9px] font-mono tracking-widest text-[#999] uppercase mt-0.5">
                            {p.engName}
                          </p>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onToggleWishlist) onToggleWishlist(p);
                          }}
                          className="p-1 hover:bg-black/5 rounded-full transition-colors group/heart cursor-pointer"
                          title="위시리스트"
                        >
                          <Heart 
                            size={15} 
                            className={`transition-all duration-350 ${
                              wishlistItems.some((w) => w.id === p.id) 
                                ? "fill-neutral-900 text-neutral-900 opacity-100 scale-110" 
                                : "opacity-30 group-hover/heart:opacity-100"
                            }`} 
                          />
                        </button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* 2. SIDE ANGLE: CRAFTED TEMPLE DETAIL */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="h-[1px] flex-1 bg-black/5" />
              <span className="text-[9px] font-mono tracking-[0.25em] text-[#999] uppercase select-none">CRAFTED TEMPLE DETAIL</span>
              <span className="h-[1px] flex-1 bg-black/5" />
            </div>

            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10"
            >
              <AnimatePresence mode="popLayout">
                {displayProducts.map((p) => (
                  <motion.article
                    key={`side-${p.id}`}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="flex flex-col group cursor-pointer"
                    onClick={() => onSelectProduct && onSelectProduct(p)}
                  >
                    {/* Side Detail Container */}
                    <div className="h-[240px] w-full bg-[#f6f7f8] rounded-2xl flex items-center justify-center mb-5 relative overflow-hidden transition-all duration-300 hover:bg-[#ecedee]">
                      <div className="absolute w-[60%] h-4 bottom-8 bg-black/[0.03] blur-lg rounded-full" />
                      
                      {/* Render horizontal detail view */}
                      <GlassesRenderer id={p.id} viewType="side" />
                      
                      {p.soldOut && (
                        <span className="absolute top-4 left-4 bg-black text-[#fafafa] text-[8px] font-bold px-2 py-0.5 tracking-wider uppercase rounded-sm">
                          SOLD OUT
                        </span>
                      )}
                    </div>

                    {/* Side Info */}
                    <div className="px-1 flex flex-col gap-1">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-[11px] font-bold tracking-widest text-[#444] uppercase">
                            VIEW DETAILS
                          </h4>
                          <p className="text-[9px] font-mono tracking-widest text-[#bbb] mt-0.5">
                            {p.engName} / Side Angle
                          </p>
                        </div>
                        <span className={`text-[12px] font-mono font-medium ${p.soldOut ? 'text-black/30 line-through' : 'text-brand-ink/80'}`}>
                          {p.price}
                        </span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {isAllView && !showMore && (
            <div className="flex justify-center pt-8 pb-2">
              <button
                onClick={() => setShowMore(true)}
                className="px-14 py-4 border border-[#111]/15 hover:border-brand-ink hover:bg-brand-ink hover:text-white text-[11px] font-extrabold tracking-[0.12em] text-[#111] transition-all duration-350 cursor-pointer shadow-xs rounded-xl active:scale-[0.98] uppercase font-sans"
              >
                전체 상품 확인하기 (Show All Products)
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
