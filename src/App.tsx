/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, FormEvent } from "react";
import { 
  Heart, 
  Leaf, 
  Sun, 
  MapPin, 
  BookOpen, 
  Coffee, 
  Music, 
  Sparkles,
  Camera,
  ChevronRight,
  PawPrint,
  Dog,
  Cat
} from "lucide-react";

// Types
interface Character {
  id: string;
  name: string;
  species: string;
  age: string;
  motto: string;
  description: string;
  tags: string[];
  personality: string;
  color: string;
  bgClass: string;
  likes: string[];
  sheetUrl: string;
}

const CHARACTERS: Character[] = [
  {
    id: "yeoun",
    name: "여운 (Yeo-un)",
    species: "웰시코기 믹스",
    age: "3살",
    motto: "네 마음에, 조용히 머무는 따뜻한 여운.",
    description: "누군가의 하루에 조용히 머물며 따뜻한 여운을 남기는 강아지입니다. 말보다는 미소로, 조용한 공감과 따뜻한 시선으로 친구들을 위로해요.",
    personality: "따뜻하고 차분, 공감 능력이 뛰어나며 조용히 곁을 지켜주는 타입",
    tags: ["#따뜻함", "#공감", "#차분한곁"],
    color: "#E8AF6E",
    bgClass: "bg-yeoun-bg",
    likes: ["따뜻한 차", "노을", "책", "친구의 고민 듣기"],
    sheetUrl: "https://raw.githubusercontent.com/kajun77/animal/e69cdfb9dfee364a6e26a951cd2145762932e3c1/%EC%97%AC%EC%9A%B4_%EC%BA%90%EB%A6%AD%ED%84%B0%EC%8B%9C%ED%8A%B8.png"
  },
  {
    id: "godeungeo",
    name: "고등어 (Go-deung-eo)",
    species: "코리안 숏헤어",
    age: "3살",
    motto: "오늘 하루도 맛있고 행복하게 냥!",
    description: "작지만 호기심 많은 고양이입니다. 맛있는 음식을 좋아하고, 햇살 좋은 곳에서 낮잠 자는 게 가장 큰 행복입니다. 장난꾸러기지만 마음이 따뜻해서 친구들에게 늘 사랑을 받아요.",
    personality: "호기심 많고 장난을 좋아하지만 누구보다 따뜻하고 정이 많음",
    tags: ["#호기심", "#장난꾸러기", "#식탐고양이"],
    color: "#8AA6C1",
    bgClass: "bg-godeungeo-bg",
    likes: ["참치캔", "햇살", "박스", "간식 시간"],
    sheetUrl: "https://raw.githubusercontent.com/kajun77/animal/e69cdfb9dfee364a6e26a951cd2145762932e3c1/%EA%B3%A0%EB%93%B1%EC%96%B4_%EC%BA%90%EB%A6%AD%ED%84%B0%EC%8B%9C%ED%8A%B8.png"
  },
  {
    id: "custard",
    name: "커스타드 (Custard)",
    species: "말티즈 x 푸들 믹스",
    age: "2살",
    motto: "오늘 하루도, 너에게 따뜻함을 전해줄게!",
    description: "작은 행복을 좋아하는 다정하고 따뜻한 강아지입니다. 누구보다 따뜻한 마음을 가지고 있어 주변 사람들에게 편안함과 기쁨을 전해줘요.",
    personality: "다정하고 상냥하며 호기심이 많음, 누군가를 돕는 것을 좋아함",
    tags: ["#상냥함", "#다정함", "#도움의손길"],
    color: "#F2D06B",
    bgClass: "bg-custard-bg",
    likes: ["커스타드 푸딩", "햇살", "산책", "친구들과의 시간"],
    sheetUrl: "https://raw.githubusercontent.com/kajun77/animal/e69cdfb9dfee364a6e26a951cd2145762932e3c1/%EC%BB%A4%EC%8A%A4%ED%83%80%EB%93%9C_%EC%BA%90%EB%A6%AD%ED%84%B0%EC%8B%9C%ED%8A%B8.png"
  }
];

const CharacterCard = ({ character, onOpen }: { character: Character; onOpen: (c: Character) => void }) => {
  const IconFace = character.id === "godeungeo" ? Cat : Dog;
  
  return (
    <motion.div 
      layoutId={`card-container-${character.id}`}
      onClick={() => onOpen(character)}
      className={`relative overflow-hidden rounded-3xl p-8 ${character.bgClass} soft-shadow border border-white/50 group cursor-pointer hover:shadow-2xl transition-all duration-500`}
      whileHover={{ y: -5 }}
    >
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="w-48 h-48 rounded-2xl bg-white/60 flex items-center justify-center relative overflow-hidden shrink-0 ring-4 ring-white/30">
          {/* Static Character Silhouette/Placeholder */}
          <PawPrint className="w-20 h-20 text-brand-brown/10 absolute opacity-20" />
          <motion.div 
            className="text-center z-10 flex flex-col items-center"
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
          >
            <div className={`p-5 rounded-full bg-white shadow-xl border-4 border-white mb-2 relative group-hover:shadow-2xl transition-all duration-300`}>
              <IconFace 
                className="w-16 h-16" 
                style={{ color: character.color }} 
                strokeWidth={1.5}
              />
              <motion.div 
                className="absolute -top-1 -right-1"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Sparkles className="w-5 h-5 text-yellow-400" />
              </motion.div>
            </div>
            <p className="font-cute text-sm font-bold text-brand-brown/40 uppercase tracking-widest">{character.name.split(' ')[0]}</p>
          </motion.div>
          {/* Glow effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-4xl font-bold text-brand-brown">{character.name}</h2>
            <div className="px-3 py-1 rounded-full bg-white/80 text-xs font-bold text-brand-brown/70 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {character.species}
            </div>
          </div>
          
          <p className="font-hand text-2xl text-brand-orange mb-4 italic">
            "{character.motto}"
          </p>
          
          <p className="text-brand-brown/80 leading-relaxed mb-6">
            {character.description}
          </p>

          <div className="flex items-center gap-2 text-xs font-bold text-brand-orange group-hover:text-brand-brown transition-colors">
            상세 프로필 보기 <ChevronRight className="w-3 h-3" />
          </div>
        </div>
      </div>
      
      {/* Background Decorative Paw */}
      <motion.div 
        className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 10 }}
      >
        <PawPrint className="w-40 h-40" />
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [selectedSticker, setSelectedSticker] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const aboutRef = useRef<HTMLElement>(null);
  const charactersRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToCharacters = () => {
    charactersRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubscribed(true);
    setEmail("");
    
    // Reset effect after 3 seconds
    setTimeout(() => setIsSubscribed(false), 3000);
  };
  
  return (
    <div className="min-h-screen text-brand-brown selection:bg-brand-orange selection:text-white">
      {/* Character Detail Modal */}
      <AnimatePresence>
        {selectedCharacter && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCharacter(null)}
              className="absolute inset-0 bg-brand-brown/40 backdrop-blur-sm"
            />
            <motion.div 
              layoutId={`card-container-${selectedCharacter.id}`}
              className={`relative w-full max-w-5xl bg-white rounded-[3rem] overflow-hidden soft-shadow z-10 flex flex-col md:flex-row`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button 
                onClick={() => setSelectedCharacter(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors z-20"
              >
                <ChevronRight className="w-6 h-6 rotate-180" />
              </button>

              <div className={`w-full md:w-[35%] p-12 flex flex-col items-center justify-center ${selectedCharacter.bgClass} relative`}>
                <div className="w-48 h-48 rounded-full bg-white shadow-2xl border-8 border-white flex items-center justify-center mb-6 overflow-hidden">
                  {selectedCharacter.id === "godeungeo" ? (
                    <Cat className="w-24 h-24" style={{ color: selectedCharacter.color }} />
                  ) : (
                    <Dog className="w-24 h-24" style={{ color: selectedCharacter.color }} />
                  )}
                </div>
                <h3 className="text-4xl font-bold text-center">{selectedCharacter.name}</h3>
                <p className="text-brand-brown/40 font-cute text-xl uppercase tracking-widest mt-1">{selectedCharacter.species}</p>
              </div>

              <div className="w-full md:w-[65%] p-10 md:p-14 overflow-y-auto max-h-[80vh] md:max-h-[90vh]">
                <div className="space-y-10">
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-brand-brown/30 mb-2">오늘의 한마디</h4>
                    <p className="font-hand text-3xl text-brand-orange leading-tight italic">
                      "{selectedCharacter.motto}"
                    </p>
                  </div>

                  <div className="space-y-6 text-sm text-brand-brown/70">
                    <div>
                      <h4 className="font-bold flex items-center gap-2 mb-2">
                        <Heart className="w-4 h-4 text-rose-400" /> 성격 및 특징
                      </h4>
                      <p className="leading-relaxed">{selectedCharacter.personality}</p>
                    </div>

                    <div>
                      <h4 className="font-bold flex items-center gap-2 mb-2">
                        <Leaf className="w-4 h-4 text-brand-green" /> 좋아하는 것들
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCharacter.likes.map(l => (
                          <span key={l} className="px-3 py-1 rounded-full bg-brand-beige text-[10px] font-bold">
                            {l}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-brand-brown/5">
                      <h4 className="text-[10px] uppercase tracking-widest font-bold text-brand-brown/30 mb-4 italic">Character Design Sheet</h4>
                      <div className="rounded-2xl overflow-hidden shadow-lg border border-brand-brown/5 bg-white group">
                        <img 
                          src={selectedCharacter.sheetUrl} 
                          alt={`${selectedCharacter.name} 캐릭터 시트`}
                          className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </div>
                    
                    <div className="pt-4 text-center">
                      <p className="text-[10px] text-brand-brown/40 font-medium tracking-widest uppercase">
                        나이: {selectedCharacter.age} • STATUS: PURE HAPPINESS
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Sticker Detail Modal */}
      <AnimatePresence>
        {selectedSticker !== null && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSticker(null)}
              className="absolute inset-0 bg-brand-brown/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2.5rem] overflow-hidden soft-shadow z-10 p-8 text-center"
            >
              <button 
                onClick={() => setSelectedSticker(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors"
              >
                <ChevronRight className="w-6 h-6 rotate-180" />
              </button>

              <div className={`aspect-square w-full rounded-3xl flex items-center justify-center text-8xl mb-6 shadow-inner ${
                selectedSticker % 3 === 0 ? 'bg-yeoun-bg' : selectedSticker % 3 === 1 ? 'bg-godeungeo-bg' : 'bg-custard-bg'
              }`}>
                {selectedSticker % 4 === 0 ? "📖" : selectedSticker % 4 === 1 ? "🥪" : selectedSticker % 4 === 2 ? "💤" : "✨"}
              </div>
              
              <h3 className="text-3xl font-bold mb-2">특별한 순간 #{selectedSticker + 1}</h3>
              <p className="text-brand-brown/50 font-cute text-xl mb-6">
                {selectedSticker % 3 === 0 ? "여운이의 책 읽는 오후" : selectedSticker % 3 === 1 ? "고등어의 맛있는 간식 시간" : "커스타드의 포근한 낮잠"}
              </p>
              
              <div className="flex gap-4">
                <button className="flex-1 py-4 rounded-full bg-brand-brown text-white font-bold hover:scale-105 active:scale-95 transition-all">
                  이미지 저장하기
                </button>
                <button className="flex-1 py-4 rounded-full bg-brand-beige text-brand-brown font-bold hover:scale-105 active:scale-95 transition-all">
                  공유하기
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center frosted-glass">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-brand-orange flex items-center justify-center text-white shadow-lg">
            <PawPrint className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">포근한 친구들</h1>
        </div>
        <div className="hidden md:flex gap-8 font-medium text-sm">
          <button onClick={scrollToAbout} className="hover:text-brand-orange transition-colors">세계관</button>
          <button onClick={scrollToCharacters} className="hover:text-brand-orange transition-colors">친구들 소개</button>
          <button onClick={scrollToGallery} className="hover:text-brand-orange transition-colors">갤러리</button>
        </div>
        <button className="px-5 py-2 rounded-full bg-brand-brown text-white text-sm font-bold shadow-xl hover:scale-105 active:scale-95 transition-all">
          굿즈 보러가기
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-beige/20 to-brand-beige z-10" />
          {/* Animated Background Elements */}
          <motion.div 
            className="absolute top-[20%] left-[10%] w-64 h-64 bg-brand-green/20 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl text-yellow-200"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 15, repeat: Infinity }}
          />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-white/80 shadow-sm mb-6 text-sm font-bold text-brand-green">
              <Sun className="w-4 h-4" />
              오늘도 따뜻한 하루가 시작돼요
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter leading-none">
              모두의 마음에 <br/> 
              <span className="text-brand-orange">포근한 여운</span>을 남길게요
            </h1>
            <p className="text-xl md:text-2xl text-brand-brown/60 mb-10 max-w-2xl mx-auto font-hand leading-relaxed">
              여운, 고등어, 커스타드와 함께하는 소소하고 따뜻한 일상 속으로 여러분을 초대합니다.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button 
                onClick={scrollToAbout}
                className="px-8 py-4 rounded-full bg-brand-brown text-white text-lg font-bold shadow-2xl hover:bg-black transition-all flex items-center gap-3"
              >
                모험 시작하기 <ChevronRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 rounded-full bg-white text-brand-brown border-2 border-brand-brown/10 text-lg font-bold hover:bg-brand-beige transition-all">
                소개 영상 보기
              </button>
            </div>
          </motion.div>
          
          {/* Scroll Indicator */}
          <motion.div 
            className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className="w-1 h-12 bg-gradient-to-b from-brand-brown/0 to-brand-brown/20 rounded-full" />
            <span className="text-[10px] uppercase tracking-widest font-bold opacity-30">SCROLL</span>
          </motion.div>
        </div>
      </section>

      {/* World Section */}
      <section id="about" ref={aboutRef} className="py-24 px-6 bg-white/40">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-[3rem] bg-brand-green/20 overflow-hidden flex items-center justify-center group"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:scale-105 transition-transform duration-700"
                style={{ backgroundImage: `url('https://raw.githubusercontent.com/kajun77/animal/e69cdfb9dfee364a6e26a951cd2145762932e3c1/%EC%88%B2%EC%86%8D%EC%B9%9C%EA%B5%AC%EB%93%A4_%EC%B9%B4%ED%88%B0.png')` }}
              />
              <div className="relative z-10 text-center p-12 frosted-glass rounded-3xl m-8">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <MapPin className="w-8 h-8 text-brand-green" />
                </div>
                <h3 className="text-3xl font-bold mb-4">포근한 숲속 마을</h3>
                <p className="text-brand-brown/70 font-cute text-xl">
                  여운과 친구들이 모여 사는 평화로운 마을이에요. <br/>
                  항상 따뜻한 햇살과 맛있는 냄새가 끊이지 않죠.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold mb-8">우리들의 이야기</h2>
              <div className="space-y-8">
                {[
                  { icon: BookOpen, title: "함께 읽는 책", desc: "여운은 조용한 오후에 친구들에게 따뜻한 문장을 읽어주는 걸 좋아해요." },
                  { icon: Coffee, title: "티타임의 비밀", desc: "커스타드는 매일 오후 3시, 아주 맛있는 푸딩과 차를 준비한답니다." },
                  { icon: Music, title: "바람의 노래", desc: "고등어와 함께 숲을 산책하면 풀벌레 소리가 아름다운 노래처럼 들려요." }
                ].map((item, i) => (
                  <motion.div 
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6"
                  >
                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-white soft-shadow flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-brand-orange" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                      <p className="text-brand-brown/60">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Characters Section */}
      <section id="characters" ref={charactersRef} className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 italic">Meet the Friends</h2>
            <p className="text-brand-brown/50">각기 다른 매력을 가진 우리 친구들을 소개합니다.</p>
          </div>
          
          <div className="space-y-12">
            {CHARACTERS.map((char, index) => (
              <motion.div
                key={char.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <CharacterCard character={char} onOpen={setSelectedCharacter} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery / Interactive Sticker Board */}
      <section id="gallery" ref={galleryRef} className="py-24 px-6 bg-brand-green/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-5xl font-bold mb-4">스티커 보드</h2>
              <p className="text-brand-brown/50">우리 친구들의 다양한 모습들을 수집해보세요!</p>
            </div>
            <div className="flex gap-4">
              <button className="p-4 rounded-full bg-white soft-shadow hover:scale-110 active:scale-95 transition-all text-brand-orange">
                <Camera className="w-6 h-6" />
              </button>
              <button className="px-6 py-4 rounded-full bg-brand-brown text-white font-bold shadow-xl hover:bg-black transition-all">
                포토카드 다운로드
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                whileHover={{ rotate: [-2, 2, -2], scale: 1.05 }}
                onClick={() => setSelectedSticker(i)}
                className="aspect-square bg-white rounded-2xl soft-shadow p-4 flex flex-col items-center justify-center gap-3 border-b-4 border-black/5 cursor-pointer"
              >
                <div className={`w-full aspect-square rounded-xl flex items-center justify-center text-4xl bg-opacity-20 ${
                  i % 3 === 0 ? 'bg-yeoun-bg' : i % 3 === 1 ? 'bg-godeungeo-bg' : 'bg-custard-bg'
                }`}>
                  {i % 4 === 0 ? "📖" : i % 4 === 1 ? "🥪" : i % 4 === 2 ? "💤" : "✨"}
                </div>
                <span className="text-[10px] font-bold tracking-tighter opacity-40 uppercase">STICKER #{i+1}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-24 px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="max-w-4xl mx-auto rounded-[3rem] bg-brand-brown text-white p-12 md:p-20 text-center relative overflow-hidden"
        >
          {/* Background Image with Gradient Overlay */}
          <div className="absolute inset-0 z-0">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-70"
              style={{ backgroundImage: `url('https://raw.githubusercontent.com/kajun77/animal/e69cdfb9dfee364a6e26a951cd2145762932e3c1/%EC%88%B2%EC%86%8D%EC%B9%9C%EA%B5%AC%EB%93%A4_%EC%B9%B4%ED%88%B0.png')` }}
            />
            {/* The requested gradient: transparent at top, deep at bottom for natural blend */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-brown/40 to-brand-brown/95" />
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 relative z-10">
            친구들의 일상을 <br/> 매주 받아보세요
          </h2>
          <p className="text-white/80 mb-10 text-lg relative z-10 font-cute">
            새로운 굿즈 소식과 특별한 일러스트를 가장 먼저 전해드려요.
          </p>
          
          <form className="relative z-10 flex flex-col md:flex-row gap-4 max-w-lg mx-auto" onSubmit={handleSubscribe}>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력해주세요" 
              className="flex-1 px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-brand-orange backdrop-blur-sm transition-all"
            />
            <button 
              type="submit"
              className="relative px-8 py-4 rounded-full bg-brand-orange text-brand-brown font-bold hover:scale-105 active:scale-95 transition-all shadow-xl overflow-hidden"
            >
              <span className="relative z-10">{isSubscribed ? "구독 완료!" : "구독하기"}</span>
              
              {/* Sparkling Effect */}
              <AnimatePresence>
                {isSubscribed && (
                  <>
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                        animate={{ 
                          opacity: [0, 1, 0], 
                          scale: [0, 1.5, 0],
                          x: (Math.random() - 0.5) * 100,
                          y: (Math.random() - 0.5) * 60
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, delay: i * 0.05 }}
                        className="absolute inset-0 m-auto w-2 h-2 bg-white rounded-full pointer-events-none"
                      />
                    ))}
                    <motion.div 
                      className="absolute inset-0 bg-white/40"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.5 }}
                    />
                  </>
                )}
              </AnimatePresence>
            </button>
          </form>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-brand-brown/10 text-center">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 grayscale brightness-0 opacity-40">
            <PawPrint className="w-5 h-5" />
            <h4 className="font-bold">포근한 친구들</h4>
          </div>
          <div className="flex gap-8 text-sm font-medium text-brand-brown/40">
            <a href="#" className="hover:text-brand-brown">개인정보처리방침</a>
            <a href="#" className="hover:text-brand-brown">이용약관</a>
            <a href="#" className="hover:text-brand-brown">문의하기</a>
          </div>
          <p className="text-xs text-brand-brown/30">
            &copy; 2024 Cozy Friends. All rights reserved. <br/>
            Designed with warmth and empathy.
          </p>
        </div>
      </footer>
    </div>
  );
}
