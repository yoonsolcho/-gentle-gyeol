const filterGroups = [
  {
    title: "프레임 컬러",
    options: ["블랙", "실버", "브라운", "클리어", "화이트", "골드"]
  },
  {
    title: "렌즈 컬러",
    options: ["블랙", "그레이", "브라운", "블루", "그린", "오렌지"]
  },
  {
    title: "소재",
    options: ["아세테이트", "메탈", "자개", "혼합"]
  },
  {
    title: "쉐입",
    options: ["스퀘어", "오벌", "라운드", "캣아이", "고글", "아트피스"]
  },
  {
    title: "정렬 기준",
    type: "radio",
    options: ["최신순", "가격 낮은 순", "가격 높은 순"]
  }
];

export default function FilterPanel() {
  return (
    <section className="bg-brand-bg border-t border-black/5 py-16 px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
      {filterGroups.map((group) => (
        <div key={group.title} className="flex flex-col gap-6">
          <h3 className="text-lg font-bold tracking-tight">{group.title}</h3>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            {group.options.map((opt) => (
              <label key={opt} className="flex items-center gap-3 text-[15px] cursor-pointer group hover:opacity-100 opacity-70 transition-opacity">
                <div className={`w-[18px] h-[18px] border border-brand-ink group-hover:border-brand-ink/40 transition-colors ${group.type === 'radio' ? 'rounded-full' : 'rounded-sm'}`} />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
