import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroCarousel({ images }) {
  if (!images || images.length === 0) {
    return (
      <div className="w-full h-72 sm:h-[420px] bg-[#240B15] border border-[#48162A] rounded-3xl mb-8 flex items-center justify-center">
        <p className="text-[#FDE047] font-serif">Curating Cultural Moments...</p>
      </div>
    );
  }

  const [current, setCurrent] = useState(0);

  // Auto-slide every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images.length]);

  const prev = () =>
    setCurrent((current - 1 + images.length) % images.length);
  const next = () => setCurrent((current + 1) % images.length);

  return (
    <div className="relative w-full h-72 sm:h-[440px] md:h-[500px] overflow-hidden rounded-3xl border border-[#48162A]/80 shadow-2xl mb-8 group">
      <AnimatePresence initial={false} mode="wait">
        <motion.img
          key={images[current]}
          src={images[current]}
          alt="Cultural Heritage of India"
          className="w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Luxury Gradient & Scrim Overlays for High Contrast & Readability */}
      <div className="absolute inset-0 bg-[#0E0307]/45 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0E0307] via-[#0E0307]/40 to-[#0E0307]/60 pointer-events-none" />

      {/* LEFT BUTTON */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 
                   bg-[#0E0307]/80 hover:bg-[#240B15] border border-[#48162A] hover:border-[#D4AF37] 
                   w-12 h-12 rounded-full z-20 transition-all transform hover:scale-105 
                   flex items-center justify-center text-[#FDE047] shadow-lg backdrop-blur-md"
        aria-label="Previous slide"
      >
        <span className="text-2xl font-bold leading-none">‹</span>
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 
                   bg-[#0E0307]/80 hover:bg-[#240B15] border border-[#48162A] hover:border-[#D4AF37] 
                   w-12 h-12 rounded-full z-20 transition-all transform hover:scale-105 
                   flex items-center justify-center text-[#FDE047] shadow-lg backdrop-blur-md"
        aria-label="Next slide"
      >
        <span className="text-2xl font-bold leading-none">›</span>
      </button>

      {/* Indicator dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20 bg-[#0E0307]/85 border border-[#48162A] px-3.5 py-1.5 rounded-full backdrop-blur-md">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`transition-all duration-300 rounded-full ${
              idx === current
                ? "w-7 h-2 bg-gradient-to-r from-[#FDE047] via-[#D4AF37] to-[#B8860B]"
                : "w-2 h-2 bg-[#48162A] hover:bg-[#D4AF37]"
            }`}
            onClick={() => setCurrent(idx)}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
