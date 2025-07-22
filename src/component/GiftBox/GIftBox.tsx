// src/components/GiftBox/GiftBox.tsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GiftBoxProps } from '../../types';

const GiftBox: React.FC<GiftBoxProps> = ({
  surpriseImageSrc = "/assets/images/collage.jpg",
  surpriseImageAlt = "Special surprise collage",
  surpriseContent,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hasBeenOpened, setHasBeenOpened] = useState<boolean>(false);

  const handleToggleBox = (): void => {
    if (!hasBeenOpened) {
      setHasBeenOpened(true);
    }
    
    setIsOpen(!isOpen);
    
    // Trigger confetti when opening
    if (!isOpen && typeof window !== 'undefined' && (window as any).confetti) {
      (window as any).confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#FFD1DC', '#FFE5B4', '#FFE066', '#FF91A4', '#FFA500']
      });

      // Additional firework effect
      setTimeout(() => {
        (window as any).confetti({
          particleCount: 100,
          spread: 120,
          origin: { y: 0.8 },
          colors: ['#FF69B4', '#FFB6C1', '#FFA07A', '#98FB98']
        });
      }, 300);
    }
  };

  return (
    <section className={`py-16 md:py-24 bg-gradient-to-br from-yellow-25 to-pink-25 ${className}`}>
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <motion.h2
            className="text-3xl md:text-4xl font-pacifico text-gray-800 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Special Surprise Box 🎁
          </motion.h2>
          
          <motion.p
            className="text-lg text-gray-600 font-nunito mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {isOpen 
              ? "Surprise! Hope this brings a smile to your face! 😊"
              : "Click the gift box to reveal your special surprise!"
            }
          </motion.p>

          {/* Gift Box Container */}
          <div className="relative inline-block">
            {/* Gift Box SVG */}
            <motion.div
              className="cursor-pointer select-none"
              onClick={handleToggleBox}
              animate={!isOpen ? {
                y: [0, -10, 0],
                rotate: [0, -2, 2, -2, 0]
              } : {}}
              transition={!isOpen ? {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              } : {}}
              whileHover={!isOpen ? { 
                scale: 1.05,
                rotate: 0,
                y: -5
              } : {}}
              whileTap={{ scale: 0.95 }}
            >
              <svg 
                width="200" 
                height="200" 
                viewBox="0 0 200 200" 
                className="drop-shadow-xl"
              >
                {/* Gift Box Base */}
                <rect
                  x="40"
                  y="80"
                  width="120"
                  height="100"
                  fill="#FF91A4"
                  stroke="#FF6B8A"
                  strokeWidth="2"
                  rx="8"
                />

                {/* Gift Box Lid */}
                <motion.rect
                  x="35"
                  y="70"
                  width="130"
                  height="25"
                  fill="#FFD1DC"
                  stroke="#FFB6C1"
                  strokeWidth="2"
                  rx="12"
                  animate={isOpen ? {
                    rotateX: -45,
                    y: 50,
                    scaleY: 0.8
                  } : {}}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  style={{ transformOrigin: "100px 95px" }}
                />

                {/* Ribbon Vertical */}
                <rect
                  x="95"
                  y="70"
                  width="10"
                  height="110"
                  fill="#FFE066"
                  stroke="#FFD700"
                  strokeWidth="1"
                />

                {/* Ribbon Horizontal */}
                <rect
                  x="35"
                  y="120"
                  width="130"
                  height="10"
                  fill="#FFE066"
                  stroke="#FFD700"
                  strokeWidth="1"
                />

                {/* Bow */}
                <motion.g
                  animate={isOpen ? { y: -20, scale: 1.2 } : {}}
                  transition={{ duration: 0.6 }}
                >
                  <ellipse cx="85" cy="75" rx="8" ry="12" fill="#FFE066" />
                  <ellipse cx="115" cy="75" rx="8" ry="12" fill="#FFE066" />
                  <circle cx="100" cy="75" r="5" fill="#FFD700" />
                </motion.g>

                {/* Sparkle Effects */}
                {!isOpen && (
                  <g>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <motion.circle
                        key={i}
                        cx={60 + (i * 20)}
                        cy={40 + Math.sin(i) * 20}
                        r="2"
                        fill="#FFD700"
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      />
                    ))}
                  </g>
                )}
              </svg>
            </motion.div>

            {/* Pulsing Click Indicator */}
            {!hasBeenOpened && !isOpen && (
              <motion.div
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7] 
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity 
                }}
              >
                <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-nunito text-gray-600 border border-pink-200">
                  Click me! ✨
                </div>
              </motion.div>
            )}
          </div>

          {/* Surprise Content */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="mt-12"
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8 border border-pink-100 max-w-2xl mx-auto">
                  {/* Custom Surprise Content */}
                  {surpriseContent ? (
                    surpriseContent
                  ) : (
                    <>
                      {/* Default Surprise Image */}
                      <motion.div
                        className="mb-6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <img
                          src={surpriseImageSrc}
                          alt={surpriseImageAlt}
                          className="w-full max-w-md mx-auto rounded-2xl shadow-lg"
                        />
                      </motion.div>

                      {/* Surprise Message */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      >
                        <h3 className="text-2xl font-pacifico text-gray-800 mb-4">
                          A Collection of Beautiful Memories! 📸
                        </h3>
                        <p className="text-gray-600 font-nunito text-lg leading-relaxed">
                          Every photo tells a story, every moment is precious. Here's to all the wonderful memories we've shared and all the amazing ones yet to come! 
                          <br />
                          <br />
                          Keep shining bright, beautiful! ✨💖
                        </p>
                      </motion.div>
                    </>
                  )}

                  {/* Close Button */}
                  <motion.button
                    onClick={handleToggleBox}
                    className="mt-6 px-6 py-3 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white rounded-full font-nunito font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    Close Gift Box 🎁
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Additional Decorative Elements */}
          {isOpen && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-2xl"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    rotate: [0, 360],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                >
                  {['🎉', '✨', '🎊', '💖', '🌟'][i % 5]}
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default GiftBox;