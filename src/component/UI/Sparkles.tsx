// src/components/UI/Sparkles.tsx

import React from 'react';
import { motion } from 'framer-motion';
import type { BaseComponentProps } from '../../types';

interface SparklesProps extends BaseComponentProps {
  count?: number;
  size?: 'sm' | 'md' | 'lg';
}

const Sparkles: React.FC<SparklesProps> = ({ 
  count = 20, 
  size = 'md',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
  };

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          className={`absolute bg-yellow-300 rounded-full ${sizeClasses[size]}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default Sparkles;