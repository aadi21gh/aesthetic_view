import { Link } from "react-router-dom";

export default function GuideCard({ item }) {
  return (
    <div
      className="bg-[#240B15] border border-[#48162A] rounded-2xl p-5
                 hover:border-[#D4AF37] hover:shadow-xl hover:shadow-[#D4AF37]/20 
                 transition-all duration-300 transform hover:-translate-y-1.5
                 w-64 sm:w-72 flex-shrink-0 flex flex-col justify-between"
      style={{ minHeight: "260px" }}
    >
      <div>
        {/* Top bar: Avatar + Rating */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#D4AF37] bg-[#0E0307] flex items-center justify-center text-xl shadow-md">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              ) : (
                <span>🧭</span>
              )}
            </div>
            <div>
              <h2 className="font-serif font-bold text-base text-[#FFF7ED] leading-tight">
                {item.name}
              </h2>
              <span className="text-[11px] text-[#FDE047] flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] inline-block animate-pulse" />
                Verified Expert
              </span>
            </div>
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full bg-[#0E0307] border border-[#48162A] text-[#FDE047] font-semibold">
            ⭐ {item.rating || "4.8"}
          </span>
        </div>

        <div className="text-xs text-[#A8988B] mb-2 flex items-center gap-1">
          <span className="text-[#D4AF37]">📍</span>
          <span>{item.state} Region</span>
        </div>

        <p className="text-xs text-[#D6C7B8] line-clamp-2 leading-relaxed bg-[#0E0307]/70 p-2.5 rounded-xl border border-[#48162A]/60">
          {item.expertise || "Specializes in temple heritage, local history, and cultural walks."}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-[#48162A] flex items-center justify-between">
        <Link
          to={`/guides/${item.id}`}
          className="text-xs text-[#A8988B] hover:text-[#FDE047] transition-colors"
        >
          View Profile
        </Link>
        <a
          href={`tel:${item.phone || item.contact || "9870001111"}`}
          className="text-xs font-bold px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#FDE047] via-[#D4AF37] to-[#B8860B] text-[#0E0307] hover:brightness-105 transition-all flex items-center gap-1 shadow-sm"
        >
          <span>📞</span> Contact
        </a>
      </div>
    </div>
  );
}
