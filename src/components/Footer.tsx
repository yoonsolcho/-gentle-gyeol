export default function Footer() {
  return (
    <footer className="bg-brand-ink text-white py-20 px-6 md:px-12 flex flex-col md:flex-row justify-between gap-12 items-start">
      <div className="flex flex-col gap-6 max-w-[600px]">
        <div className="font-serif text-3xl tracking-widest font-bold">결의 시선</div>
        <p className="text-white/50 text-sm leading-relaxed max-w-md">
          본 페이지는 대학교 과제용 콘셉트 웹사이트 예시입니다.
          젠틀몬스터의 미니멀한 쇼핑몰 구조를 참고하되, 전통공예 협업이라는 가상의 방향성을 더해 디자인했습니다.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-xs font-semibold tracking-wider uppercase text-white/30">
        <div className="flex flex-col gap-3">
          <span className="text-white/60 mb-2">고객서비스</span>
          <a href="#" className="hover:text-white transition-colors">문의하기</a>
          <a href="#" className="hover:text-white transition-colors">배송 및 반품</a>
          <a href="#" className="hover:text-white transition-colors">A/S 및 보증</a>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-white/60 mb-2">법적 고지</span>
          <a href="#" className="hover:text-white transition-colors">이용약관</a>
          <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
          <a href="#" className="hover:text-white transition-colors">쿠키정책</a>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-white/60 mb-2">소셜</span>
          <a href="#" className="hover:text-white transition-colors">인스타그램</a>
          <a href="#" className="hover:text-white transition-colors">유튜브</a>
          <a href="#" className="hover:text-white transition-colors">카카오톡</a>
        </div>
      </div>
    </footer>
  );
}
