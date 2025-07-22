// src/components/TypingMessage/TypingMessage.tsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { TypingMessageProps } from '../../types';
import Sparkles from '../UI/Sparkles';

const TypingMessage: React.FC<TypingMessageProps> = ({
  message = "You're the most special person in my life, Maila. Thank you for always being there 💖",
  speed = 50,
  startDelay = 1000,
  className = ""
}) => {
  const [displayText, setDisplayText] = useState<string>('');
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [showCursor, setShowCursor] = useState<boolean>(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const startTyping = () => {
      let currentIndex = 0;
      setDisplayText('');
      setIsComplete(false);

      const typingInterval = setInterval(() => {
        if (currentIndex < message.length) {
          setDisplayText(message.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsComplete(true);
          clearInterval(typingInterval);
        }
      }, speed);

      return () => clearInterval(typingInterval);
    };

    timeoutId = setTimeout(startTyping, startDelay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message, speed, startDelay]);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <section className={`relative py-16 md:py-20 bg-gradient-to-br from-yellow-25 to-pink-25 ${className}`}>
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Message Container */}
          <div className="relative">
            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12 border border-pink-100"
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Decorative Quote Marks */}
              <div className="text-6xl text-pink-200 font-serif leading-none mb-4">"</div>

              {/* Typing Text */}
              <div className="relative">
                <motion.p 
                  className="text-xl md:text-2xl lg:text-3xl text-gray-800 font-nunito leading-relaxed mb-4"
                  style={{ minHeight: '2em' }}
                >
                  {displayText}
                  {!isComplete && (
                    <motion.span
                      className={`inline-block w-1 h-8 bg-pink-400 ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      |
                    </motion.span>
                  )}
                </motion.p>

                {/* Heart Animation when complete */}
                {isComplete && (
                  <motion.div
                    className="flex justify-center space-x-2 mt-6"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.span
                        key={i}
                        className="text-2xl text-pink-400"
                        animate={{ 
                          scale: [1, 1.3, 1],
                          rotate: [0, 10, -10, 0]
                        }}
                        transition={{ 
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      >
                        💖
                      </motion.span>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Closing Quote Mark */}
              <div className="text-6xl text-pink-200 font-serif leading-none text-right mt-4">"</div>

              {/* Author Signature */}
              {isComplete && (
                <motion.div
                  className="mt-8 text-right"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <p className="text-lg text-gray-600 font-pacifico">
                    — With all my love ✨
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Decorative Elements */}
            <Sparkles count={15} size="sm" className="opacity-60" />
            
            {/* Floating Hearts around the message */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-pink-300 text-lg opacity-70"
                  style={{
                    left: `${10 + (i * 12)}%`,
                    top: `${20 + Math.random() * 60}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                >
                  ♡
                </motion.div>
              ))}
            </div>
          </div>

          {/* Additional Message (if typing is complete) */}
          {isComplete && (
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <div className="bg-gradient-to-r from-pink-100 to-peach-100 rounded-2xl p-6 max-w-2xl mx-auto">
                <p className="text-gray-700 font-nunito text-lg">
                  Every moment with you is a treasure. Here's to many more beautiful memories together! 🎉
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default TypingMessage;