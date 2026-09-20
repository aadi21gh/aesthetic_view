export default function AttractionCard({ item }) {
  return (
    <div
      className="bg-[#240B15] border border-[#48162A] rounded-2xl overflow-hidden
                 hover:border-[#D4AF37] hover:shadow-xl hover:shadow-[#D4AF37]/20 
                 transition-all duration-300 transform hover:-translate-y-1.5
                 w-64 sm:w-72 flex-shrink-0 flex flex-col justify-between"
      style={{ minHeight: "240px" }}
    >
      <div className="relative h-32 w-full overflow-hidden bg-[#0E0307]">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover opacity-85 hover:opacity-100 transition-opacity duration-300"
            onError={(e) => { e.target.style.display = "none"; }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#D4AF37]/20 to-[#0E0307] flex items-center justify-center">
            <span className="text-3xl opacity-40">🏛️</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#240B15] via-transparent to-transparent" />
        {item.location && (
          <span className="absolute bottom-2 left-2 text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-[#0E0307]/85 text-[#FDE047] border border-[#D4AF37]/40">
            📍 {item.location}
          </span>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-serif font-bold text-lg text-[#FFF7ED] leading-snug">
            {item.name}
          </h3>
          <p className="text-xs text-[#A8988B] mt-1 line-clamp-2 leading-relaxed">
            {item.description || "A breathtaking historical attraction steeped in regional art, legends, and architectural beauty."}
          </p>
        </div>
      </div>
    </div>
  );
}
