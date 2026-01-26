import { useRef } from "react";
import StateCard from "./StateCard";
import FestivalCard from "./FestivalCard";
import HotelCard from "./HotelCard";
import GuideCard from "./GuideCard";
import AttractionCard from "./AttractionCard";

export default function SectionRow({ title, data, type }) {
  const rowRef = useRef();

  const scroll = (dir) => {
    rowRef.current.scrollBy({
      left: dir === "left" ? -350 : 350,
      behavior: "smooth",
    });
  };

  const renderItem = (item) => {
    switch (type) {
      case "state":
        return <StateCard key={item.id} item={item} />;
      case "festival":
        return <FestivalCard key={item.id} item={item} />;
      case "hotel":
        return <HotelCard key={item.id} item={item} />;
      case "guide":
        return <GuideCard key={item.id} item={item} />;
      case "attire":
        return (
          <div
            key={item}
            className="bg-[#8B5E3C] p-4 rounded-lg text-white min-w-[150px] text-center 
                       hover:scale-105 transform transition duration-300 shadow-lg"
          >
            <p>{item}</p>
          </div>
        );
      case "image":
        return (
          <img
            key={item}
            src={item}
            alt="Festival"
            className="h-44 w-64 object-cover rounded-lg min-w-[150px] 
                       hover:scale-105 transform transition duration-300 shadow-md"
          />
        );
      case "attraction":
        return <AttractionCard key={item.id} item={item} />;
      default:
        return <div key={item.id}>Item</div>;
    }
  };

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold text-[#F5EEDC] mb-4">{title}</h2>

      {/* make wrapper overflow-hidden so nothing can bleed out */}
      <div className="relative group overflow-hidden">
        {/* LEFT ARROW - tiny container so it can't form a full-width bar */}
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-20">
          <button
            onClick={() => scroll("left")}
            className="pointer-events-auto bg-[#5A3E2B] hover:bg-[#7a523d] p-3 rounded-full 
                       flex items-center justify-center transition-transform transform hover:scale-110 shadow-md"
            aria-label="Scroll left"
          >
            <span className="text-white text-3xl font-bold leading-none">‹</span>
          </button>
        </div>

        <div
          ref={rowRef}
          className="flex overflow-x-auto gap-5 scrollbar-hide scroll-smooth py-2"
        >
          {data.length > 0 ? (
            data.map((item) => renderItem(item))
          ) : type === "attraction" ? (
            <div className="p-6 bg-[#FFF3E0] rounded-lg text-[#5A3E2B] min-w-[220px] shadow-md">
              <p className="text-lg font-semibold">No attractions listed for this state yet.</p>
            </div>
          ) : (
            <div className="p-6 bg-[#FFF3E0] rounded-lg text-[#5A3E2B] min-w-[220px] shadow-md">
              <p className="text-lg font-semibold">No items to display.</p>
            </div>
          )}
        </div>

        {/* RIGHT ARROW - tiny container so it can't form a full-width bar */}
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none z-20">
          <button
            onClick={() => scroll("right")}
            className="pointer-events-auto bg-[#5A3E2B] hover:bg-[#7a523d] p-3 rounded-full 
                       flex items-center justify-center transition-transform transform hover:scale-110 shadow-md"
            aria-label="Scroll right"
          >
            <span className="text-white text-3xl font-bold leading-none">›</span>
          </button>
        </div>
      </div>
    </div>
  );
}
