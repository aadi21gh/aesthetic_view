import { Link } from "react-router-dom";

export default function HotelCard({ item }) {
  return (
    <div
      className="bg-[#240B15] border border-[#48162A] rounded-2xl overflow-hidden
                 hover:border-[#D4AF37] hover:shadow-xl hover:shadow-[#D4AF37]/20 
                 transition-all duration-300 transform hover:-translate-y-1.5
                 w-64 sm:w-72 flex-shrink-0 flex flex-col justify-between"
      style={{ minHeight: "260px" }}
    >
      {/* Header / Image banner */}
      <div className="relative h-28 w-full overflow-hidden bg-[#0E0307]">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover opacity-85 hover:opacity-100 transition-opacity"
            onError={(e) => { e.target.style.display = "none"; }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#D4AF37]/20 to-[#0E0307] flex items-center justify-center">
            <span className="text-3xl opacity-40">🏨</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#240B15] via-transparent to-transparent" />

        <span className="absolute top-2.5 right-2.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#0E0307]/85 text-[#FDE047] border border-[#D4AF37]/40 backdrop-blur-xs flex items-center gap-1">
          ⭐ {item.rating || "4.8"}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1 text-xs text-[#A8988B] mb-1">
            <span className="text-[#D4AF37]">📍</span>
            <span className="truncate">{item.location}, {item.state}</span>
          </div>
          <h2 className="font-serif font-bold text-lg text-[#FFF7ED] leading-snug line-clamp-1">
            {item.name}
          </h2>
          <p className="text-xs text-[#A8988B] mt-1 line-clamp-1">
            Heritage stay & royal regional hospitality
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-[#48162A] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#A8988B]/70 block">Starting from</span>
            <span className="text-sm font-bold text-[#FDE047]">
              {item.price ? `₹${item.price}` : "₹4,500"}<span className="text-[10px] font-normal text-[#A8988B]">/night</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/hotels/${item.id}`}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#0E0307] text-[#D4AF37] border border-[#48162A] hover:border-[#D4AF37] transition-colors"
            >
              Details
            </Link>
            {item.link ? (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#FDE047] via-[#D4AF37] to-[#B8860B] text-[#0E0307] hover:brightness-105 transition-all shadow-sm"
              >
                Book
              </a>
            ) : (
              <Link
                to={`/hotels/${item.id}`}
                className="text-xs font-bold px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#FDE047] via-[#D4AF37] to-[#B8860B] text-[#0E0307] hover:brightness-105 transition-all shadow-sm"
              >
                Book
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
