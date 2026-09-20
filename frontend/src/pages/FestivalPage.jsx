import { useEffect, useState } from "react";
import { getFestivals } from "@/utils/api";
import FestivalCard from "@/components/FestivalCard";
import { motion } from "framer-motion";

export default function FestivalPage() {
  const [festivals, setFestivals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFestivals()
      .then((res) => {
        setFestivals(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredFestivals = festivals.filter((f) => {
    const q = searchQuery.toLowerCase();
    return (
      f.name.toLowerCase().includes(q) ||
      f.state?.toLowerCase().includes(q) ||
      f.description?.toLowerCase().includes(q) ||
      f.month?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="bg-[#0E0307] min-h-screen text-[#FFF7ED] pb-24">
      {/* Hero Header */}
      <div className="relative py-16 px-6 text-center border-b border-[#48162A] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#240B15] to-[#0E0307] opacity-95" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#FDE047] text-xs font-bold px-4 py-1.5 rounded-full mb-3 tracking-widest uppercase backdrop-blur-xs">
              Living Celebrations
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#FFF7ED] mb-4">
              Festivals of <span className="text-[#FDE047]">Incredible India</span>
            </h1>
            <p className="text-xs md:text-sm text-[#A8988B] max-w-2xl mx-auto leading-relaxed">
              Experience the colours, midnight aartis, harvest rituals, and centuries of sacred rhythm across Indian traditions.
            </p>
          </motion.div>

          {/* Search Input */}
          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative w-full">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A8988B]">🔍</span>
              <input
                type="text"
                placeholder="Search festival, state, month (e.g. Diwali, Holi, Kerala)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#240B15] border border-[#48162A] text-[#FFF7ED] placeholder-[#A8988B]/60 focus:border-[#D4AF37] focus:outline-none transition-colors text-xs"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Festivals Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12">
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs text-[#A8988B]">
            Showing <span className="text-[#FDE047] font-semibold">{filteredFestivals.length}</span> vibrant festivals
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-64 rounded-2xl bg-[#240B15] border border-[#48162A] animate-pulse" />
            ))}
          </div>
        ) : filteredFestivals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFestivals.map((f) => (
              <div key={f.id} className="flex justify-center">
                <FestivalCard item={f} />
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-[#240B15] border border-[#48162A] rounded-3xl max-w-md mx-auto my-12">
            <span className="text-4xl block mb-3 opacity-50">🪔</span>
            <h3 className="font-serif font-bold text-lg text-[#FFF7ED] mb-1">No Festivals Found</h3>
            <p className="text-xs text-[#A8988B] mb-4">Try searching for another festival name, month, or state.</p>
            <button
              onClick={() => setSearchQuery("")}
              className="btn-primary text-xs"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
