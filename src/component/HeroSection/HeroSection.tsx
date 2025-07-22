// src/components/HeroSection/HeroSection.tsx

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { HeroSectionProps } from '../../types';
import FloatingHearts from '../UI/FloatingHearts';
import Sparkles from '../UI/Sparkles';

const HeroSection: React.FC<HeroSectionProps> = ({
  name = "Maila Mitra",
  photoSrc = "/assets/images/maila.jpg",
  photoAlt = "Maila smiling",
  className = ""
}) => {
  const [muted, setMuted] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const handleUserInteraction = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(error => {
          console.log('Autoplay prevented:', error);
        });
      }
    };

    // Add event listeners for user interaction to enable autoplay
    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('touchstart', handleUserInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  const toggleMute = (): void => {
    if (audioRef.current) {
      const newMutedState = !muted;
      audioRef.current.muted = newMutedState;
      setMuted(newMutedState);
    }
  };

  return (
    <section className={`relative min-h-screen flex flex-col items-center justify-center pt-20 pb-28 bg-gradient-to-br from-pink-50 via-peach-50 to-yellow-50 ${className}`}>
      {/* Background Music */}
      <audio 
        ref={audioRef} 
        src="/assets/audio/bgm.mp3" 
        loop 
        preload="auto"
      />

      {/* Music Toggle Button */}
      <motion.button
        onClick={toggleMute}
        className="absolute top-6 right-6 z-10 px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-pink-200 hover:bg-white/80 transition-all duration-200 shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle background music"
      >
        <span className="text-sm font-medium text-gray-700">
          {muted ? '🔇 Unmute' : '🔊 Mute'}
        </span>
      </motion.button>

      {/* Main Content */}
      <div className="text-center z-10">
        {/* Main Headline */}
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-pacifico text-transparent bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 bg-clip-text mb-8"
          style={{ textShadow: '0 0 20px rgba(255, 182, 193, 0.5)' }}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Happy Birthday
          <br />
          {name} 🎉
        </motion.h1>

        {/* Profile Photo */}
        <motion.div
          className="relative mx-auto mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.div
            className="relative"
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img
              src={photoSrc}
              alt={photoAlt}
              className="w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 object-cover rounded-full border-4 border-white shadow-2xl"
            />
            
            {/* Glowing Ring Effect */}
            <div className="absolute inset-0 rounded-full border-4 border-pink-300/50 animate-pulse"></div>
            <div className="absolute -inset-2 rounded-full border-2 border-yellow-200/30 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </motion.div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-gray-600 font-nunito max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Wishing you a day filled with happiness and a year filled with joy! ✨
        </motion.p>
      </div>

      {/* Animated Background Elements */}
      <FloatingHearts count={12} duration={8} />
      <Sparkles count={25} size="md" />

      {/* Additional Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Confetti-like Dots */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-3 h-3 rounded-full ${
              i % 3 === 0 ? 'bg-pink-300' : i % 3 === 1 ? 'bg-yellow-300' : 'bg-peach-300'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;