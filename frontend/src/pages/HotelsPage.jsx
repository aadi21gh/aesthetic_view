import { useEffect, useState } from "react";
import { getHotels } from "@/utils/api";
import HotelCard from "@/components/HotelCard";
import { motion } from "framer-motion";

export default function HotelsPage() {
  const [hotels, setHotels] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHotels()
      .then((res) => {
        setHotels(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredHotels = hotels.filter((h) => {
    const q = searchQuery.toLowerCase();
    return (
      h.name.toLowerCase().includes(q) ||
      h.location?.toLowerCase().includes(q) ||
      h.state?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="bg-[#0E0307] min-h-screen text-[#FFF7ED] pb-24">
      {/* Hero Header */}
      <div className="relative py-16 px-6 text-center border-b border-[#48162A]/60 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#240B15]/90 via-[#19060E] to-[#0E0307]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block bg-[#300E1C] border border-[#D4AF37]/40 text-[#FDE047] text-xs font-bold px-4 py-1.5 rounded-full mb-3 tracking-widest uppercase shadow-sm">
              Sanctuary of Royalty
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#FFF7ED] mb-4">
              Heritage Stays & <span className="text-[#D4AF37]">Palaces</span>
            </h1>
            <p className="text-xs md:text-sm text-[#D6C7B8] max-w-2xl mx-auto leading-relaxed">
              Rest where maharajas once slumbered. Curated palace retreats, colonial heritage havelis, and royal imperial sanctuaries.
            </p>
          </motion.div>

          {/* Search */}
          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative w-full">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A8988B]">🔍</span>
              <input
                type="text"
                placeholder="Search hotel, city or state (e.g. Taj, Mumbai, Jaipur)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#240B15] border border-[#48162A] text-[#FFF7ED] placeholder-[#A8988B] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/40 focus:outline-none transition-colors text-xs shadow-inner"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12">
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs text-[#D6C7B8]">
            Showing <span className="text-[#D4AF37] font-semibold">{filteredHotels.length}</span> curated heritage stays
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-64 rounded-2xl bg-[#240B15] border border-[#48162A] animate-pulse" />
            ))}
          </div>
        ) : filteredHotels.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredHotels.map((h) => (
              <div key={h.id} className="flex justify-center">
                <HotelCard item={h} />
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-[#240B15] border border-[#48162A] rounded-3xl max-w-md mx-auto my-12 shadow-xl">
            <span className="text-4xl block mb-3 opacity-60">🏨</span>
            <h3 className="font-serif font-bold text-lg text-[#FFF7ED] mb-1">No Stays Found</h3>
            <p className="text-xs text-[#D6C7B8] mb-4">Try searching for another destination, city, or property name.</p>
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
