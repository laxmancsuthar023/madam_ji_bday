// src/components/Footer/Footer.tsx

import React from 'react';
import { motion } from 'framer-motion';
import type { BaseComponentProps } from '../../types';

interface FallingPetal {
  id: number;
  delay: number;
  left: string;
  color: string;
  size: string;
  duration: number;
}

const Footer: React.FC<BaseComponentProps> = ({ className = "" }) => {
  // Generate falling petals data
  const petals: FallingPetal[] = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    delay: Math.random() * 10,
    left: `${Math.random() * 100}%`,
    color: i % 2 === 0 ? 'bg-pink-200' : 'bg-peach-200',
    size: Math.random() > 0.5 ? 'w-3 h-3' : 'w-4 h-4',
    duration: 12 + Math.random() * 6
  }));

  return (
    <footer className={`relative py-12 md:py-16 bg-gradient-to-r from-pink-100 via-peach-100 to-yellow-100 overflow-hidden ${className}`}>
      {/* Falling Petals Background */}
      <div className="absolute inset-0 pointer-events-none">
        {petals.map((petal) => (
          <motion.div
            key={petal.id}
            className={`absolute ${petal.color} ${petal.size} opacity-60`}
            style={{
              left: petal.left,
              borderRadius: '50% 60% 60% 50%',
              top: '-20px',
            }}
            animate={{
              y: [0, window.innerHeight + 100],
              rotate: [0, 360],
              opacity: [0, 0.8, 0.6, 0],
            }}
            transition={{
              duration: petal.duration,
              repeat: Infinity,
              delay: petal.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Main Footer Message */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-pacifico text-transparent bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 bg-clip-text mb-4"
            style={{ textShadow: '0 0 20px rgba(255, 182, 193, 0.3)' }}
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Thank You for Being You ✨
          </motion.h2>
          
          <motion.p
            className="text-lg md:text-xl text-gray-700 font-nunito max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Your kindness, laughter, and beautiful spirit make the world a brighter place. 
            Here's to another year of amazing adventures together! 🎉
          </motion.p>
        </motion.div>

        {/* Decorative Stars */}
        <motion.div
          className="flex justify-center space-x-4 mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="text-2xl md:text-3xl text-yellow-400"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            >
              ⭐
            </motion.div>
          ))}
        </motion.div>

        {/* Birthday Statistics */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-pink-100">
            <motion.div
              className="text-3xl font-bold text-pink-500 mb-2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              365
            </motion.div>
            <p className="text-gray-600 font-nunito text-sm">
              Days of Joy Ahead
            </p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-peach-100">
            <motion.div
              className="text-3xl font-bold text-peach-500 mb-2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            >
              ∞
            </motion.div>
            <p className="text-gray-600 font-nunito text-sm">
              Endless Possibilities
            </p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-yellow-100">
            <motion.div
              className="text-3xl font-bold text-yellow-500 mb-2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            >
              💖
            </motion.div>
            <p className="text-gray-600 font-nunito text-sm">
              Love & Friendship
            </p>
          </div>
        </motion.div>

        {/* Final Message */}
        <motion.div
          className="bg-gradient-to-r from-pink-50 to-peach-50 rounded-2xl p-6 md:p-8 border border-pink-200 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <motion.p
            className="text-gray-700 font-nunito text-lg leading-relaxed mb-4"
            animate={{
              color: ['#374151', '#EC4899', '#374151'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          >
            "May your special day be filled with all the colors of happiness, 
            all the sounds of laughter, and all the feelings of love." 🌈
          </motion.p>
          
          <div className="flex justify-center space-x-2">
            {['🎂', '🎈', '🎉', '🎊', '✨'].map((emoji, i) => (
              <motion.span
                key={i}
                className="text-2xl"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="mt-12 pt-6 border-t border-pink-200/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <p className="text-sm text-gray-500 font-nunito">
            Made with 💕 for the most amazing person • {new Date().getFullYear()}
          </p>
          <motion.p
            className="text-xs text-gray-400 font-nunito mt-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Every moment with you is a gift 🎁
          </motion.p>
        </motion.div>
      </div>

      {/* Twinkling Stars Background Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-300 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </footer>
  );
};

export default Footer;