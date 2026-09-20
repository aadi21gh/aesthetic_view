import { useRef } from "react";
import StateCard from "./StateCard";
import FestivalCard from "./FestivalCard";
import HotelCard from "./HotelCard";
import GuideCard from "./GuideCard";
import AttractionCard from "./AttractionCard";

export default function SectionRow({ title, data = [], type }) {
  const rowRef = useRef();

  const scroll = (dir) => {
    if (rowRef.current) {
      rowRef.current.scrollBy({
        left: dir === "left" ? -350 : 350,
        behavior: "smooth",
      });
    }
  };

  const renderItem = (item, idx) => {
    switch (type) {
      case "state":
        return <StateCard key={item.id || idx} item={item} />;
      case "festival":
        return <FestivalCard key={item.id || idx} item={item} />;
      case "hotel":
        return <HotelCard key={item.id || idx} item={item} />;
      case "guide":
        return <GuideCard key={item.id || idx} item={item} />;
      case "attire":
        return (
          <div
            key={item || idx}
            className="bg-[#240B15] border border-[#48162A] p-4 rounded-2xl text-[#FFF7ED] min-w-[180px] text-center 
                       hover:border-[#D4AF37] hover:scale-105 transform transition duration-300 shadow-lg flex flex-col items-center justify-center gap-2"
          >
            <span className="text-2xl">👗</span>
            <p className="text-sm font-semibold text-[#FDE047]">{item}</p>
          </div>
        );
      case "image":
        return (
          <div key={item || idx} className="h-44 w-64 rounded-2xl overflow-hidden min-w-[220px] flex-shrink-0 border border-[#48162A] shadow-md group">
            <img
              src={item}
              alt="Cultural Moment"
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => { e.target.style.display = "none"; }}
            />
          </div>
        );
      case "attraction":
        return <AttractionCard key={item.id || idx} item={item} />;
      default:
        return <div key={item.id || idx}>Item</div>;
    }
  };

  return (
    <div className="my-10">
      {/* Section Header */}
      {title && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-[#FDE047] via-[#D4AF37] to-[#BE123C]" />
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#FFF7ED] tracking-wide">
              {title}
            </h2>
          </div>

          {/* Navigation arrows for desktop */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-9 h-9 rounded-full bg-[#240B15] border border-[#48162A] text-[#FDE047] hover:border-[#D4AF37] hover:bg-[#300E1C] flex items-center justify-center transition-all shadow-md active:scale-95"
              aria-label="Scroll left"
            >
              <span className="text-lg font-bold leading-none">‹</span>
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-9 h-9 rounded-full bg-[#240B15] border border-[#48162A] text-[#FDE047] hover:border-[#D4AF37] hover:bg-[#300E1C] flex items-center justify-center transition-all shadow-md active:scale-95"
              aria-label="Scroll right"
            >
              <span className="text-lg font-bold leading-none">›</span>
            </button>
          </div>
        </div>
      )}

      {/* Horizontal Carousel */}
      <div className="relative group overflow-hidden">
        <div
          ref={rowRef}
          className="flex overflow-x-auto gap-5 scrollbar-hide scroll-smooth py-3 px-1"
        >
          {data && data.length > 0 ? (
            data.map((item, idx) => renderItem(item, idx))
          ) : (
            <div className="p-8 bg-[#240B15] border border-[#48162A] rounded-2xl text-[#A8988B] min-w-[280px] text-center flex flex-col items-center justify-center gap-2">
              <span className="text-3xl opacity-40">✨</span>
              <p className="text-sm font-medium text-[#FDE047]">No entries available for this category.</p>
              <span className="text-xs text-[#A8988B]">Check back as new cultural destinations are curated.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
