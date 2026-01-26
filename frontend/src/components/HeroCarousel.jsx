import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroCarousel({ images }) {
  if (!images || images.length === 0) {
    return (
      <div className="w-full h-64 sm:h-96 bg-gray-900 rounded-lg mb-6 flex items-center justify-center">
        <p className="text-white opacity-60">Loading...</p>
      </div>
    );
  }

  const [current, setCurrent] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const prev = () =>
    setCurrent((current - 1 + images.length) % images.length);
  const next = () => setCurrent((current + 1) % images.length);

  return (
    <div className="relative w-full h-64 sm:h-96 overflow-hidden rounded-lg mb-6">
      <AnimatePresence initial={false}>
        <motion.img
          key={images[current]}
          src={images[current]}
          alt="hero"
          className="w-full h-full object-cover"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>

      {/* Overlay for caption or title (optional, empty for now) */}
      <div className="absolute bottom-6 left-6 text-white z-20">
        {/* You can add a caption here */}
      </div>

      {/* LEFT BUTTON */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 
                   bg-black/40 hover:bg-[#5A3E2B]/70 backdrop-blur-sm 
                   p-4 rounded-full z-10 transition transform hover:scale-110"
      >
        <span className="text-white text-3xl font-bold">‹</span>
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 
                   bg-black/40 hover:bg-[#5A3E2B]/70 backdrop-blur-sm 
                   p-4 rounded-full z-10 transition transform hover:scale-110"
      >
        <span className="text-white text-3xl font-bold">›</span>
      </button>

      {/* Indicator dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              idx === current ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </div>
  );
}
