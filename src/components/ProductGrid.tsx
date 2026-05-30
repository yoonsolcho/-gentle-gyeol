import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { productsData } from '../data/products';
import GlassesRenderer from './GlassesRenderer';

import { Product } from '../data/products';

interface Props {
  activeCollection: string;
  searchQuery?: string;
  onSelectProduct?: (product: Product) => void;
  wishlistItems?: Product[];
  onToggleWishlist?: (product: Product) => void;
  onChangeCollection?: (collection: string) => void;
}

// Sub-component for individual product cards to follow good modular architecture
function ProductCard({ 
  product, 
  onSelectProduct, 
  wishlistItems, 
  onToggleWishlist 
}: { 
  key?: string | number;
  product: Product; 
  onSelectProduct?: (p: Product) => void; 
  wishlistItems: Product[]; 
  onToggleWishlist?: (p: Product) => void;
}) {
  const p = product;
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="flex flex-col group cursor-pointer"
      onClick={() => onSelectProduct && onSelectProduct(p)}
    >
      {/* Image / SVG Container on a beautiful premium white background */}
      <div className="h-[240px] w-full bg-white rounded-2xl flex items-center justify-center mb-5 relative overflow-hidden transition-all duration-300">
        {/* Clean soft shadow beneath glasses inside display box */}
        <div className="absolute w-[60%] h-4 bottom-8 bg-black/[0.03] blur-lg rounded-full" />
        
        {/* Render the realistic representation (image file or fallback SVG) */}
        {p.images?.thumbnail ? (
          <img 
            src={p.images.thumbnail} 
            alt={p.name} 
            className="w-full h-full object-contain p-0 group-hover:scale-105 transition-transform duration-500 ease-out" 
            referrerPolicy="no-referrer"
          />
        ) : (
          <GlassesRenderer id={p.id} viewType="front" />
        )}
        
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
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5">
              <span className="text-[9px] text-neutral-500 font-mono font-semibold">
                {p.price}
              </span>
            </div>
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
  );
}

const COLLECTIONS_INFO = [
  {
    key: "꽃 컬렉션",
    eng: "FLOWER COLLECTION",
    desc: "꽃 컬렉션은 한국 야생화의 순수한 유기적인 곡선과 자연의 고유한 아름다움을 예술적 터치로 재해석한 프레임을 통해 우아함을 극대화한 아이웨어 대표작으로 선보입니다."
  },
  {
    key: "궁궐 컬렉션",
    eng: "PALACE COLLECTION",
    desc: "궁궐 컬렉션은 전통 기와지붕의 부드러운 유선 곡선과 전통 격자 조각을 모던 미니멀리즘 프레임에 조화시켜 시대에 없던 깊이 있는 아이웨어 대표작으로 선보입니다."
  },
  {
    key: "날개 컬렉션",
    eng: "WING COLLECTION",
    desc: "날개 컬렉션은 창공을 향해 거침없이 비상하는 날갯깃의 기류를 은빛 크롬과 기하학적 유선 프레임 디테일로 조각하여 완벽히 아방가르드한 스타일의 대표작으로 선보입니다."
  },
  {
    key: "문양 컬렉션",
    eng: "PATTERN COLLECTION",
    desc: "문양 컬렉션은 길상의 기운을 품는 당초문과 전통 원형 연화문 등 천상의 문채를 귀 금속 세공품 공정으로 재해석하여 섬세한 깊이감을 불어넣은 아이웨어 대표작으로 선보입니다."
  }
];

export default function ProductGrid({ 
  activeCollection, 
  searchQuery = "", 
  onSelectProduct,
  wishlistItems = [],
  onToggleWishlist,
  onChangeCollection
}: Props) {
  const query = searchQuery.trim().toLowerCase();

  // 1. If searching, render searchable grid instantly
  if (query) {
    const searchFiltered = productsData.filter((p) => {
      return p.name.toLowerCase().includes(query) || p.engName.toLowerCase().includes(query);
    });

    return (
      <section className="relative py-12 md:py-16 px-6 md:px-12 bg-[#fafafa] border-t border-black/5 overflow-hidden font-sans">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14 px-4 bg-[#fafafa]">
          <h2 className="text-base md:text-lg font-bold tracking-tight text-neutral-900 mb-3.5 uppercase break-keep">
            "{searchQuery}" 검색 결과
          </h2>
          <p className="text-xs md:text-[13px] font-medium leading-relaxed text-neutral-500 break-keep">
            총 {searchFiltered.length}개의 정교한 수공예 메탈 프레임을 찾았습니다.
          </p>
        </div>

        {searchFiltered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-lg text-brand-ink/60 font-semibold mb-2">검색 결과가 없습니다</p>
            <p className="text-xs text-brand-ink/40 font-mono">
              다른 검색어를 시도해 보시거나 컬렉션 메뉴를 이용해 보세요.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {searchFiltered.map((p) => (
              <ProductCard 
                key={p.id} 
                product={p} 
                onSelectProduct={onSelectProduct} 
                wishlistItems={wishlistItems} 
                onToggleWishlist={onToggleWishlist} 
              />
            ))}
          </div>
        )}
      </section>
    );
  }

  // 2. If viewing "홈" (Homepage Highlights)
  if (activeCollection === "홈") {
    // Curated showcase: 1 signature piece from each of the 4 collections
    const homeHighlights = productsData.filter(p => 
      ["flower-1", "palace-1", "wing-1", "pattern-1"].includes(p.id)
    );

    return (
      <section className="relative py-12 md:py-16 px-6 md:px-12 bg-[#fafafa] border-t border-black/5 overflow-hidden font-sans">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14 px-4 bg-[#fafafa]">
          <h2 className="text-base md:text-[17px] font-extrabold tracking-[0.05em] text-neutral-900 mb-4 block uppercase break-keep">
            2026 GENTLE MONSTER HIGHLIGHTS
          </h2>
          <p className="text-xs md:text-[13px] leading-relaxed text-neutral-500 max-w-2xl mx-auto font-normal break-keep">
            젠틀몬스터의 현대적인 디자인 문법과 한국 무형문화유산 장인들의 백년 전통 금속 세조 기법(주조•단조•입사•칠보)이 융합된 2026 협업 라인업의 대표 수공예 작들을 선별하여 소개합니다.
          </p>
        </div>

        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {homeHighlights.map((p) => (
              <ProductCard 
                key={p.id} 
                product={p} 
                onSelectProduct={onSelectProduct} 
                wishlistItems={wishlistItems} 
                onToggleWishlist={onToggleWishlist} 
              />
            ))}
          </div>

          <div className="flex justify-center pt-8 pb-2">
            <button
              onClick={() => {
                if (onChangeCollection) {
                  onChangeCollection("전체보기");
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }
              }}
              className="px-14 py-4 border border-[#111]/15 hover:border-brand-ink hover:bg-brand-ink hover:text-white text-[11px] font-extrabold tracking-[0.12em] text-[#111] transition-all duration-350 cursor-pointer shadow-xs rounded-xl active:scale-[0.98] uppercase font-sans"
            >
              컬렉션 전체보기 (View All Collections)
            </button>
          </div>
        </div>
      </section>
    );
  }

  // 3. If viewing "전체보기" (Detailed Lookbook with sections for each of the 4 collections)
  if (activeCollection === "전체보기") {
    return (
      <section className="relative py-12 md:py-16 px-6 md:px-12 bg-[#fafafa] border-t border-black/5 overflow-hidden font-sans">
        {/* Page Main Premium Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 md:mb-20 px-4 bg-[#fafafa]">
          <h2 className="text-base md:text-[18px] font-extrabold tracking-[0.06em] text-neutral-900 mb-4 block uppercase font-sans">
            2026 COLLABORATIVE CATALOGUE
          </h2>
          <p className="text-xs md:text-[13px] leading-relaxed text-neutral-500 max-w-2xl mx-auto font-normal break-keep">
            한국 전통 공예 백년 역사와 현대 장인들의 숨결이 깃든 4대 콜라보레이션 라인업을 한눈에 한자리에서 만나보실 수 있습니다. 각 테마를 스크롤하여 영혼이 불어넣어진 16가지 메탈 수전안경 예술품을 감상해보세요.
          </p>
        </div>

        {/* Categories Series */}
        <div className="flex flex-col gap-16 md:gap-24 max-w-7xl mx-auto">
          {COLLECTIONS_INFO.map((info, idx) => {
            const rowProducts = productsData.filter(p => p.category === info.key);
            return (
              <div key={info.key} className="flex flex-col gap-6 md:gap-8">
                {/* Section Header */}
                <div className="flex flex-col items-start border-b border-black/5 pb-4">
                  <span className="text-[10px] font-mono tracking-[0.2em] font-bold text-neutral-400 uppercase">
                    SECT. 0{idx + 1} / {info.eng}
                  </span>
                  <h3 className="text-base md:text-[17px] font-extrabold tracking-tight text-neutral-900 mt-1">
                    {info.key}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1 max-w-3xl text-left break-keep leading-relaxed font-normal">
                    {info.desc}
                  </p>
                </div>

                {/* Section Product Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
                  {rowProducts.map((p) => (
                    <ProductCard 
                      key={p.id} 
                      product={p} 
                      onSelectProduct={onSelectProduct} 
                      wishlistItems={wishlistItems} 
                      onToggleWishlist={onToggleWishlist} 
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  // 4. Specific single collection view
  const singleCollectionProducts = productsData.filter(p => p.category === activeCollection);
  const currentInfo = COLLECTIONS_INFO.find(info => info.key === activeCollection);

  return (
    <section className="relative py-12 md:py-16 px-6 md:px-12 bg-[#fafafa] border-t border-black/5 overflow-hidden font-sans">
      <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14 px-4 bg-[#fafafa]">
        <h2 className="text-base md:text-[17px] font-extrabold tracking-[0.05em] text-neutral-900 mb-4 block uppercase break-keep">
          {activeCollection} 하이라이트
        </h2>
        <p className="text-xs md:text-[13px] leading-relaxed text-neutral-500 max-w-2xl mx-auto font-normal break-keep">
          {currentInfo?.desc || ""}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
        {singleCollectionProducts.map((p) => (
          <ProductCard 
            key={p.id} 
            product={p} 
            onSelectProduct={onSelectProduct} 
            wishlistItems={wishlistItems} 
            onToggleWishlist={onToggleWishlist} 
          />
        ))}
      </div>
    </section>
  );
}
