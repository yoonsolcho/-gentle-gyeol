export default function Footer() {
  return (
    <footer className="bg-brand-ink text-white py-20 px-6 md:px-12 flex flex-col md:flex-row justify-between gap-12 items-start">
      <div className="flex flex-col gap-6 max-w-[600px]">
        <div className="font-serif text-3xl tracking-widest font-bold">결의 시선</div>
        <p className="text-white/50 text-sm leading-relaxed max-w-md break-keep">
          본 페이지는 대학교 과제용 콘셉트 웹사이트 예시입니다.
          젠틀몬스터의 미니멀한 쇼핑몰 구조를 참고하되, 전통공예 협업이라는 가상의 방향성을 더해 디자인했습니다.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-12 md:gap-16 text-xs text-white/30">
        <div className="flex flex-col gap-3">
          <span className="text-white/60 text-[13px] font-bold tracking-tight mb-1">프로젝트 정보</span>
          <p className="text-white/50 text-[13px] font-medium leading-relaxed max-w-xs break-keep">
            문화원형과 고전콘텐츠<br />
            2026년 1학기 기말 프로젝트
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-white/60 text-[13px] font-bold tracking-tight mb-1">참여 조원</span>
          <div className="flex flex-row md:flex-col gap-x-4 gap-y-2 text-white/50 text-[13px] font-medium whitespace-nowrap">
            <span>임다빈</span>
            <span>권예주</span>
            <span>조윤솔</span>
            <span>류민아</span>
            <span>한다경</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
