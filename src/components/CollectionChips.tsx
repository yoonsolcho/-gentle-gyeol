import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

interface Props {
  activeCollection: string;
  onChangeCollection: (collection: string) => void;
  onSearchClear?: () => void;
  isSearching?: boolean;
  onOpenStory?: () => void;
}

const collections = [
  "전체보기", "꽃 컬렉션", "궁궐 컬렉션", "날개 컬렉션", "문양 컬렉션"
];

export default function CollectionChips({ activeCollection, onChangeCollection, onSearchClear, isSearching, onOpenStory }: Props) {
  return (
    <section className="mt-[48px] h-[44px] flex items-center justify-between px-6 md:px-12 bg-white/80 backdrop-blur-md border-b border-black/5 relative z-30">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {collections.map((item) => (
          <button
            key={item}
            onClick={() => {
              onChangeCollection(item);
              if (isSearching && onSearchClear) {
                onSearchClear();
              }
            }}
            className={`px-3 py-1 rounded-full border text-[11px] tracking-tight whitespace-nowrap transition-all duration-300 cursor-pointer ${
              activeCollection === item && !isSearching
                ? "bg-brand-ink border-brand-ink text-white font-semibold shadow-xs"
                : "bg-white/60 border-black/5 text-[#666] hover:bg-white hover:border-black/20"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {isSearching && (
          <button
            onClick={onSearchClear}
            className="px-3 py-0.5 rounded-full bg-red-50 hover:bg-red-100/80 border border-red-200/50 text-red-600 text-[10.5px] tracking-tight font-semibold flex items-center gap-1 transition-all cursor-pointer whitespace-nowrap"
          >
            검색어 지우기 ✕
          </button>
        )}
      </div>
    </section>
  );
}
