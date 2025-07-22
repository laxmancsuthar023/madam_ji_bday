// src/components/WishWall/WishWall.tsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { WishWallProps, Wish } from '../../types';

const WishWall: React.FC<WishWallProps> = ({
  onWishSubmit,
  maxWishes = 10,
  className = ""
}) => {
  const [wish, setWish] = useState<string>('');
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmitWish = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!wish.trim() || wishes.length >= maxWishes || isSubmitting) return;

    setIsSubmitting(true);

    const newWish: Wish = {
      id: `wish-${Date.now()}-${Math.random()}`,
      text: wish.trim(),
      timestamp: new Date(),
      author: 'Anonymous'
    };

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    setWishes(prev => [...prev, newWish]);
    setWish('');
    setIsSubmitting(false);

    // Trigger confetti for wish submission
    if (typeof window !== 'undefined' && (window as any).confetti) {
      (window as any).confetti({
        particleCount: 50,
        spread: 45,
        origin: { y: 0.8 },
        colors: ['#FFD1DC', '#FFE5B4', '#FFE066']
      });
    }

    // Call external callback if provided
    if (onWishSubmit) {
      onWishSubmit(wish.trim());
    }
  };

  const getRandomPosition = () => ({
    rotate: Math.random() * 10 - 5, // Random rotation between -5 and 5 degrees
    x: Math.random() * 20 - 10, // Random x offset
    y: Math.random() * 20 - 10, // Random y offset
  });

  const getRandomColor = (): string => {
    const colors = [
      'bg-pink-100 border-pink-200',
      'bg-peach-100 border-peach-200',
      'bg-yellow-100 border-yellow-200',
      'bg-purple-100 border-purple-200',
      'bg-blue-100 border-blue-200',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <section className={`py-16 md:py-20 bg-gradient-to-br from-pink-25 to-peach-25 ${className}`}>
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl md:text-4xl font-pacifico text-gray-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Birthday Wish Wall 📝
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 font-nunito max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Leave your heartfelt birthday wishes here! Each wish becomes a beautiful memory.
            </motion.p>
          </div>

          {/* Wish Input Form */}
          <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-pink-100 mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form onSubmit={handleSubmitWish} className="space-y-4">
              <div>
                <label htmlFor="wish" className="sr-only">
                  Your birthday wish
                </label>
                <textarea
                  id="wish"
                  value={wish}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setWish(e.target.value)}
                  placeholder="Write your heartfelt birthday wish here... ✨"
                  className="w-full p-4 rounded-xl border-2 border-pink-200 focus:border-pink-400 focus:outline-none resize-none transition-colors duration-200 font-nunito"
                  rows={4}
                  maxLength={200}
                  disabled={wishes.length >= maxWishes}
                />
                <div className="text-right mt-2 text-sm text-gray-500">
                  {wish.length}/200 characters
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-gray-600 font-nunito">
                  {wishes.length}/{maxWishes} wishes collected
                </p>
                
                <motion.button
                  type="submit"
                  disabled={!wish.trim() || wishes.length >= maxWishes || isSubmitting}
                  className={`px-8 py-3 rounded-full font-nunito font-semibold transition-all duration-200 ${
                    !wish.trim() || wishes.length >= maxWishes || isSubmitting
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white shadow-lg hover:shadow-xl'
                  }`}
                  whileHover={!wish.trim() && wishes.length < maxWishes && !isSubmitting ? { scale: 1.05 } : {}}
                  whileTap={!wish.trim() && wishes.length < maxWishes && !isSubmitting ? { scale: 0.95 } : {}}
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <motion.div
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span>Sending...</span>
                    </div>
                  ) : wishes.length >= maxWishes ? (
                    'Wish Wall Full ✨'
                  ) : (
                    'Send Wish 💫'
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Wishes Display */}
          <div className="relative min-h-[400px]">
            <AnimatePresence>
              {wishes.map((wishItem, index) => (
                <motion.div
                  key={wishItem.id}
                  className={`absolute w-64 p-4 rounded-2xl shadow-lg border-2 ${getRandomColor()}`}
                  style={{
                    left: `${(index % 4) * 25 + Math.random() * 10}%`,
                    top: `${Math.floor(index / 4) * 120 + Math.random() * 20}px`,
                    zIndex: wishes.length - index,
                  }}
                  initial={{ 
                    opacity: 0, 
                    scale: 0, 
                    rotate: 0,
                    y: -50 
                  }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    ...getRandomPosition(),
                    y: 0
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0, 
                    transition: { duration: 0.2 } 
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 20,
                    delay: index * 0.1 
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotate: 0,
                    zIndex: 999,
                    transition: { duration: 0.2 }
                  }}
                  drag
                  dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
                  dragElastic={0.2}
                >
                  {/* Pin Icon */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="w-6 h-6 bg-red-400 rounded-full shadow-md flex items-center justify-center">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    </div>
                  </div>

                  {/* Wish Content */}
                  <div className="pt-2">
                    <p className="text-gray-800 font-nunito text-sm leading-relaxed mb-3">
                      "{wishItem.text}"
                    </p>
                    
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>— {wishItem.author}</span>
                      <span>{new Date(wishItem.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Decorative Corner */}
                  <div className="absolute top-2 right-2 text-pink-400 text-xs">
                    ✨
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Empty State */}
            {wishes.length === 0 && (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="text-6xl mb-4">📝</div>
                <p className="text-xl text-gray-600 font-nunito">
                  Be the first to leave a beautiful birthday wish!
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WishWall;