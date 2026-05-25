export interface Product {
  id: string;
  name: string;
  engName: string;
  price: string;
  category: "전통공예" | "꽃 컬렉션" | "궁궐 컬렉션" | "날개 컬렉션" | "문양 컬렉션";
  color: string;
  soldOut?: boolean;
  statusText?: string;
  hasTag?: string;
}

export const productsData: Product[] = [
  // 전통공예
  {
    id: "craft-1",
    name: "청화 리본 01 RD",
    engName: "CHUNGHWA RIBBON 01 RD",
    price: "₩420,000",
    category: "전통공예",
    color: "red",
  },
  {
    id: "craft-2",
    name: "나전 윙 02 NV",
    engName: "NAJEON WING 02 NV",
    price: "₩450,000",
    category: "전통공예",
    color: "navy",
  },
  {
    id: "craft-3",
    name: "백자 쉘 03 IV",
    engName: "BAEKJA SHELL 03 IV",
    price: "품절",
    category: "전통공예",
    color: "ivory",
    soldOut: true,
  },
  {
    id: "craft-4",
    name: "오리가미 02",
    engName: "ORIGAMI 02",
    price: "₩320,000",
    category: "전통공예",
    color: "silver",
    statusText: "재입고 예정",
  },

  // 꽃 컬렉션
  {
    id: "flower-1",
    name: "매화 01",
    engName: "MAEHWA 01",
    price: "₩450,000",
    category: "꽃 컬렉션",
    color: "silver",
  },
  {
    id: "flower-2",
    name: "벚꽃 02",
    engName: "BEOTKKOT 02",
    price: "₩450,000",
    category: "꽃 컬렉션",
    color: "rose",
  },
  {
    id: "flower-3",
    name: "연꽃 03",
    engName: "YEONLOT 03",
    price: "₩450,000",
    category: "꽃 컬렉션",
    color: "platinum",
  },
  {
    id: "flower-4",
    name: "국화 04",
    engName: "GUKHWA 04",
    price: "₩450,000",
    category: "꽃 컬렉션",
    color: "gold",
    soldOut: true,
    statusText: "품절",
  },

  // 궁궐 컬렉션
  {
    id: "palace-1",
    name: "기와 01",
    engName: "GIWA 01",
    price: "₩400,000",
    category: "궁궐 컬렉션",
    color: "black",
  },
  {
    id: "palace-2",
    name: "창호 02",
    engName: "CHANGHO 02",
    price: "₩400,000",
    category: "궁궐 컬렉션",
    color: "matte-black",
  },
  {
    id: "palace-3",
    name: "문양 03",
    engName: "MUNYANG 03",
    price: "₩400,000",
    category: "궁궐 컬렉션",
    color: "gold-black",
  },
  {
    id: "palace-4",
    name: "단청 04",
    engName: "DANCHEONG 04",
    price: "₩400,000",
    category: "궁궐 컬렉션",
    color: "translucent",
  },

  // 날개 컬렉션
  {
    id: "wing-1",
    name: "비상 01",
    engName: "BISANG 01",
    price: "₩420,000",
    category: "날개 컬렉션",
    color: "monochrome",
  },
  {
    id: "wing-2",
    name: "천공 02",
    engName: "CHEONGONG 02",
    price: "₩420,000",
    category: "날개 컬렉션",
    color: "chrome",
  },
  {
    id: "wing-3",
    name: "신의 03",
    engName: "SINUI 03",
    price: "₩420,000",
    category: "날개 컬렉션",
    color: "dark-wing",
  },
  {
    id: "wing-4",
    name: "바람 04",
    engName: "BARAM 04",
    price: "₩420,000",
    category: "날개 컬렉션",
    color: "titanium",
  },

  // 문양 컬렉션
  {
    id: "pattern-1",
    name: "연화문 01",
    engName: "YEONHWAMUN 01",
    price: "₩400,000",
    category: "문양 컬렉션",
    color: "classic-black",
  },
  {
    id: "pattern-2",
    name: "당초문 02",
    engName: "DANGCHOMUN 02",
    price: "₩400,000",
    category: "문양 컬렉션",
    color: "amber-gold",
  },
  {
    id: "pattern-3",
    name: "격자문 03",
    engName: "GYEOKJAMUN 03",
    price: "₩400,000",
    category: "문양 컬렉션",
    color: "dark-grid",
  },
  {
    id: "pattern-4",
    name: "삼태극문 04",
    engName: "SAMTAEGUKMUN 04",
    price: "₩400,000",
    category: "문양 컬렉션",
    color: "cream-taegeuk",
  },
];
