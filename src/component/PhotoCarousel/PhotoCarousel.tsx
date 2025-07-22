// src/components/PhotoCarousel/PhotoCarousel.tsx

import { motion } from "framer-motion";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import type { PhotoCarouselProps, Memory } from "../../types";

// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
const PhotoCarousel: React.FC<PhotoCarouselProps> = ({
  memories,
  autoplay = true,
  slidesPerView = 1,
  className = "",
}) => {
  // Default memories if none provided
  const defaultMemories: Memory[] = [
    {
      id: 1,
      src: "/assets/images/memory1.jpg",
      caption: "Beach Trip Adventure",
      date: "november 2023",
    },
    {
      id: 2,
      src: "/assets/images/memory2.jpg",
      caption: "Graduation Day",
      date: "May 2023",
    },
    {
      id: 3,
      src: "/assets/images/memory3.jpg",
      caption: "Road Trip Fun",
      date: "August 2023",
    },
  ];
  const memoriesToShow = memories.length > 0 ? memories : defaultMemories;

  return (
    <section
      className={`py-16 md:py-20 bg-gradient-to-br from-peach-25 to-pink-25 ${className}`}
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-pacifico text-center text-gray-800 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Beautiful Memories ✨
        </motion.h2>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={
              autoplay
                ? {
                    delay: 4000,
                    disableOnInteraction: false,
                  }
                : false
            }
            breakpoints={{
              640: {
                slidesPerView: 1.2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: slidesPerView > 1 ? 1.5 : 1,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: slidesPerView > 1 ? 2 : 1,
                spaceBetween: 40,
              },
            }}
            className="memories-swiper"
          >
            {memoriesToShow.map((memory) => (
              <SwiperSlide key={memory.id}>
                <motion.div
                  className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={memory.src}
                      alt={memory.caption}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      loading="lazy"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Date Badge */}
                    {memory.date && (
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-nunito font-medium text-gray-700">
                        {memory.date}
                      </div>
                    )}
                  </div>

                  {/* Caption Container */}
                  <div className="p-6">
                    <h3 className="text-lg md:text-xl font-nunito font-semibold text-gray-800 text-center">
                      {memory.caption}
                    </h3>

                    {/* Decorative Hearts */}
                    <div className="flex justify-center mt-3 space-x-1">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <motion.span
                          key={i}
                          className="text-pink-300"
                          animate={{
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        >
                          ♡
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="flex justify-center mt-8 space-x-4">
            <motion.button
              className="swiper-button-prev-custom w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-white hover:text-pink-500 transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous memory"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </motion.button>

            <motion.button
              className="swiper-button-next-custom w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-white hover:text-pink-500 transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next memory"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Custom Swiper Styles */}
      <Swiper
        className="memories-swiper"
        pagination={{ clickable: true }}
        // ... other Swiper props
      >
        {/* slides here */}
      </Swiper>
    </section>
  );
};

export default PhotoCarousel;
