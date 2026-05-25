import React from 'react';

interface Props {
  activeCollection: string;
  onChangeCollection: (collection: string) => void;
  onSearchClear?: () => void;
  isSearching?: boolean;
}

const collections = [
  "꽃 컬렉션", "궁궐 컬렉션", "날개 컬렉션", "문양 컬렉션"
];

export default function CollectionChips({ activeCollection, onChangeCollection, onSearchClear, isSearching }: Props) {
  return (
    <section className="mt-[72px] h-[72px] flex items-center gap-3 px-6 md:px-12 bg-white/80 backdrop-blur-md border-b border-black/5 overflow-x-auto no-scrollbar relative z-30 justify-between">
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
        {collections.map((item) => (
          <button
            key={item}
            onClick={() => {
              onChangeCollection(item);
              if (isSearching && onSearchClear) {
                onSearchClear();
              }
            }}
            className={`px-5 py-2 rounded-full border text-[13px] tracking-tight whitespace-nowrap transition-all duration-300 cursor-pointer ${
              activeCollection === item && !isSearching
                ? "bg-brand-ink border-brand-ink text-white font-bold shadow-sm"
                : "bg-white/60 border-black/5 text-brand-ink/70 hover:bg-white hover:border-black/20"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {isSearching && (
        <button
          onClick={onSearchClear}
          className="px-4 py-1.5 rounded-full bg-red-50 hover:bg-red-100/80 border border-red-200/50 text-red-600 text-[12px] tracking-tight font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
        >
          검색어 지우기 ✕
        </button>
      )}
    </section>
  );
}
