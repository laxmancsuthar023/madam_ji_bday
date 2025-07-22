// src/components/BirthdayCake/BirthdayCake.tsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { BirthdayCakeProps } from '../../types';

// Cake SVG Component
interface CakeProps {
  candlesLit: boolean;
  candleCount: number;
}

const Cake: React.FC<CakeProps> = ({ candlesLit, candleCount = 5 }) => {
  return (
    <svg 
      width="200" 
      height="200" 
      viewBox="0 0 200 200" 
      className="mx-auto drop-shadow-lg"
    >
      {/* Cake Base Layer */}
      <rect 
        x="20" 
        y="120" 
        width="160" 
        height="60" 
        rx="8" 
        fill="#FFE5B4" 
        stroke="#FFD1DC" 
        strokeWidth="2"
      />
      
      {/* Cake Middle Layer */}
      <rect 
        x="35" 
        y="80" 
        width="130" 
        height="50" 
        rx="8" 
        fill="#FFD1DC" 
        stroke="#FF91A4" 
        strokeWidth="2"
      />
      
      {/* Cake Top Layer */}
      <rect 
        x="50" 
        y="50" 
        width="100" 
        height="40" 
        rx="8" 
        fill="#FF91A4" 
        stroke="#FF6B8A" 
        strokeWidth="2"
      />

      {/* Decorative Frosting */}
      <path
        d="M50 50 Q60 45 70 50 Q80 45 90 50 Q100 45 110 50 Q120 45 130 50 Q140 45 150 50"
        fill="none"
        stroke="#FFF"
        strokeWidth="3"
        strokeLinecap="round"
      />
      
      {/* Candles */}
      {Array.from({ length: candleCount }).map((_, i) => (
        <g key={i}>
          {/* Candle Stick */}
          <rect
            x={60 + i * 16}
            y="30"
            width="8"
            height="25"
            fill="#FFFBE7"
            stroke="#F0E68C"
            strokeWidth="1"
            rx="2"
          />
          
          {/* Candle Flame */}
          {candlesLit && (
            <motion.ellipse
              cx={64 + i * 16}
              cy={25}
              rx="3"
              ry="8"
              fill="url(#flameGradient)"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ 
                duration: 0.8, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </g>
      ))}

      {/* Gradient Definitions */}
      <defs>
        <linearGradient id="flameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FF4500" />
          <stop offset="100%" stopColor="#FF6B35" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const BirthdayCake: React.FC<BirthdayCakeProps> = ({ 
  candleCount = 5,
  onWishMade,
  className = ""
}) => {
  const [candlesLit, setCandlesLit] = useState<boolean>(true);
  const [wishMade, setWishMade] = useState<boolean>(false);

  const handleBlowCandles = (): void => {
    if (!candlesLit || wishMade) return;

    setCandlesLit(false);
    setWishMade(true);
    
    // Trigger confetti
    if (typeof window !== 'undefined' && (window as any).confetti) {
      (window as any).confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#FFD1DC', '#FFE5B4', '#FFE066', '#FF91A4']
      });
    }

    // Call the callback if provided
    if (onWishMade) {
      onWishMade();
    }

    // Reset candles after 5 seconds for demo purposes
    setTimeout(() => {
      setCandlesLit(true);
      setWishMade(false);
    }, 5000);
  };

  return (
    <section className={`py-16 md:py-20 bg-gradient-to-br from-pink-25 to-peach-25 ${className}`}>
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-pacifico text-gray-800 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Make a Wish! 🎂
        </motion.h2>

        {/* Cake Container */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative inline-block">
            <Cake candlesLit={candlesLit} candleCount={candleCount} />
            
            {/* Magical Sparkles around cake */}
            {candlesLit && (
              <div className="absolute inset-0">
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.button
          onClick={handleBlowCandles}
          disabled={!candlesLit || wishMade}
          className={`px-8 py-4 rounded-full font-nunito font-semibold text-lg shadow-lg transition-all duration-300 ${
            candlesLit && !wishMade
              ? 'bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white transform hover:scale-105 cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          whileHover={candlesLit && !wishMade ? { scale: 1.05 } : {}}
          whileTap={candlesLit && !wishMade ? { scale: 0.95 } : {}}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {!candlesLit && wishMade ? (
            <>Wish Made! ✨</>
          ) : candlesLit ? (
            <>
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                Blow Out the Candles 🌟
              </motion.span>
            </>
          ) : (
            'Candles Blown Out! 🎉'
          )}
        </motion.button>

        {/* Wish Message */}
        {wishMade && (
          <motion.div
            className="mt-6 p-4 bg-white/70 backdrop-blur-sm rounded-lg shadow-md max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-700 font-nunito">
              🌟 Your wish has been sent to the universe! 🌟
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BirthdayCake;