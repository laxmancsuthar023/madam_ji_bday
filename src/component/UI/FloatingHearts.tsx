// src/components/UI/FloatingHearts.tsx

import React from 'react';
import { motion } from 'framer-motion';
import type { BaseComponentProps } from '../../types';

interface FloatingHeartsProps extends BaseComponentProps {
  count?: number;
  duration?: number;
}

const FloatingHearts: React.FC<FloatingHeartsProps> = ({ 
  count = 10, 
  duration = 8,
  className = '' 
}) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute text-pink-400 text-xl"
          style={{
            left: `${10 + (index * 8)}%`,
            bottom: 0,
          }}
          animate={{
            y: [0, -800],
            scale: [1, 1.4],
            opacity: [1, 0],
          }}
          transition={{
            duration,
            repeat: Infinity,
            delay: index * 0.5,
            ease: "linear",
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;