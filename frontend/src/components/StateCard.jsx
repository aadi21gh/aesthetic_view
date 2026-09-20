import { Link } from "react-router-dom";

export default function StateCard({ item }) {
  const previewImage = item.attractions?.[0]?.image || item.image;

  return (
    <Link to={`/states/${item.id}`} className="group block">
      <div
        className="bg-[#240B15] border border-[#48162A] rounded-2xl overflow-hidden
                   hover:border-[#D4AF37] hover:shadow-xl hover:shadow-[#D4AF37]/20 
                   transition-all duration-300 transform hover:-translate-y-1.5
                   w-64 sm:w-72 flex-shrink-0 flex flex-col justify-between"
        style={{ minHeight: "260px" }}
      >
        {/* Card Image Banner */}
        <div className="relative h-28 w-full overflow-hidden bg-[#0E0307]">
          {previewImage ? (
            <img
              src={previewImage}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
              onError={(e) => { e.target.style.display = "none"; }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#BE123C]/30 to-[#0E0307] flex items-center justify-center">
              <span className="text-3xl opacity-40">🏰</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#240B15] via-transparent to-transparent" />
          
          {item.region && (
            <span className="absolute top-2.5 right-2.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#0E0307]/85 text-[#FDE047] border border-[#D4AF37]/40 backdrop-blur-xs">
              {item.region} India
            </span>
          )}
        </div>

        {/* Card Content */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h2 className="font-serif font-bold text-xl text-[#FFF7ED] group-hover:text-[#FDE047] transition-colors leading-snug">
              {item.name}
            </h2>
            <p className="text-xs text-[#A8988B] mt-1.5 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#48162A] flex items-center justify-between text-xs">
            {item.dance ? (
              <span className="text-[#D6C7B8] truncate max-w-[140px]">
                💃 {item.dance}
              </span>
            ) : (
              <span className="text-[#A8988B]">Rich Heritage</span>
            )}
            <span className="text-[#D4AF37] group-hover:text-[#FDE047] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-all">
              Explore <span className="text-sm">→</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
