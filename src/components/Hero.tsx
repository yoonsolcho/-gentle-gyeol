import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface Props {
  onOpenStory?: () => void;
  onViewCollections?: () => void;
}

export default function Hero({ onOpenStory, onViewCollections }: Props) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const bgImage = '/assets/sections/hero_bg.jpeg';
  
  // High-fashion clean slow-motion abstract materials & lights looping campaign videography
  const campaignVideoUrl = 'https://player.vimeo.com/external/435674703.hd.mp4?s=6f4116190da2148af721cf1fa5e6a0d40243ac86&profile_id=174&oauth2_token_id=57447761';

  return (
    <section 
      className="relative h-screen w-full overflow-hidden bg-[#18181b] flex items-end justify-center pb-6 md:pb-8 text-white font-sans"
    >
      {/* 1. Base Image Fallback */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 z-0"
        style={{ 
          backgroundImage: `url('${bgImage}')`,
          opacity: isVideoLoaded ? 0.3 : 1 
        }} 
      />

      {/* 2. Premium Autoplay Cinematic Looping Video Overlay */}
      <video
        autoPlay
        loop
        muted
        playsInline
        onCanPlay={() => setIsVideoLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000"
        style={{ opacity: isVideoLoaded ? 0.85 : 0 }}
      >
        <source src={campaignVideoUrl} type="video/mp4" />
      </video>

      {/* 3. Luxury Vignette, Radial Shadows & Blur Masks for Content Readability */}
      <div className="absolute inset-0 bg-neutral-950/20 z-0 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-neutral-950/80 via-neutral-950/25 to-transparent z-0 pointer-events-none" />

      {/* 4. Minimalist Bottom-Centered Luxury Text overlay */}
      <div className="relative z-10 w-full max-w-[800px] px-6 text-center select-none mb-1">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-4"
        >
          {/* Spliced Title */}
          <h1 className="font-serif text-xl md:text-[28px] font-medium tracking-[0.1em] leading-tight text-white uppercase break-keep">
            결의 시선 COLLECTION
          </h1>

          {/* Tiny luxurious caption line */}
          <p className="text-[11.5px] md:text-[13px] text-zinc-300/90 font-medium tracking-wide max-w-[500px] break-keep leading-relaxed -mt-1.5">
            전통 공예 기법과 젠틀몬스터의 세련되고 조형적인 미학의 조화로운 결합
          </p>

          {/* Action Call buttons aligned precisely side-by-side */}
          <div className="flex items-center justify-center gap-4 mt-0.5">
            <button
              onClick={() => {
                if (onViewCollections) {
                  onViewCollections();
                } else {
                  const element = document.getElementById('products-section-title');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }
              }}
              className="bg-white text-neutral-950 hover:bg-neutral-100 px-7 py-3 text-[11px] font-bold tracking-widest transition-all duration-300 rounded-full cursor-pointer uppercase shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            >
              컬렉션 보기
            </button>
            <button
              onClick={onOpenStory}
              className="bg-transparent text-white border border-white hover:bg-white hover:text-neutral-950 px-7 py-3 text-[11px] font-bold tracking-widest transition-all duration-300 rounded-full cursor-pointer uppercase hover:scale-[1.02] active:scale-[0.98]"
            >
              기획 스토리
            </button>
          </div>
        </motion.div>
      </div>

    </section>
  );
}

