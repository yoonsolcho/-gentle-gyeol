import React from 'react';

interface Props {
  activeCollection: string;
  onChangeCollection: (collection: string) => void;
}

const collections = [
  "꽃 컬렉션", "궁궐 컬렉션", "날개 컬렉션", "문양 컬렉션"
];

export default function CollectionChips({ activeCollection, onChangeCollection }: Props) {
  return (
    <section className="mt-[72px] h-[72px] flex items-center gap-3 px-6 md:px-12 bg-brand-bg border-b border-black/5 overflow-x-auto no-scrollbar">
      {collections.map((item) => (
        <button
          key={item}
          onClick={() => onChangeCollection(item)}
          className={`px-4 py-1.5 rounded-full border text-[13px] whitespace-nowrap transition-all duration-300 ${
            activeCollection === item
              ? "bg-[#e6eaee] border-black/10 text-brand-ink font-bold"
              : "bg-[#f7f8f9] border-black/5 text-[#777] hover:border-black/20"
          }`}
        >
          {item}
        </button>
      ))}
    </section>
  );
}
