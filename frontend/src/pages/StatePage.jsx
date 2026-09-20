import { useEffect, useState } from "react";
import { getStates } from "@/utils/api";
import StateCard from "@/components/StateCard";
import { motion } from "framer-motion";

const REGIONS = ["All", "North", "South", "East", "West", "Northeast", "Central"];

export default function StatePage() {
  const [states, setStates] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStates()
      .then((res) => {
        setStates(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredStates = states.filter((s) => {
    const matchesRegion =
      selectedRegion === "All" ||
      s.region?.toLowerCase() === selectedRegion.toLowerCase();
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <div className="bg-[#0E0307] min-h-screen text-[#FFF7ED] pb-24">
      {/* Hero Header */}
      <div className="relative py-16 px-6 text-center border-b border-[#48162A] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#240B15] to-[#0E0307] opacity-95" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#FDE047] text-xs font-bold px-4 py-1.5 rounded-full mb-3 tracking-widest uppercase backdrop-blur-xs">
              Cultural Geography
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#FFF7ED] mb-4">
              Explore the <span className="text-[#FDE047]">States of India</span>
            </h1>
            <p className="text-xs md:text-sm text-[#A8988B] max-w-2xl mx-auto leading-relaxed">
              From the golden Thar desert of Rajasthan to the serene backwaters of Kerala, journey across 28 states and union territories steeped in living heritage.
            </p>
          </motion.div>

          {/* Search Input */}
          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative w-full">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A8988B]">🔍</span>
              <input
                type="text"
                placeholder="Search state, attire, dance, region..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#240B15] border border-[#48162A] text-[#FFF7ED] placeholder-[#A8988B]/60 focus:border-[#D4AF37] focus:outline-none transition-colors text-xs"
              />
            </div>
          </div>

          {/* Region Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {REGIONS.map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRegion(r)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedRegion === r
                    ? "bg-gradient-to-r from-[#FDE047] via-[#D4AF37] to-[#B8860B] text-[#0E0307] font-bold shadow-md shadow-[#D4AF37]/25"
                    : "bg-[#240B15] border border-[#48162A] text-[#D6C7B8] hover:border-[#D4AF37] hover:text-[#FDE047]"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* States Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12">
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs text-[#A8988B]">
            Showing <span className="text-[#FDE047] font-semibold">{filteredStates.length}</span> destinations
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-64 rounded-2xl bg-[#240B15] border border-[#48162A] animate-pulse" />
            ))}
          </div>
        ) : filteredStates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStates.map((s) => (
              <div key={s.id} className="flex justify-center">
                <StateCard item={s} />
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-[#240B15] border border-[#48162A] rounded-3xl max-w-md mx-auto my-12">
            <span className="text-4xl block mb-3 opacity-50">🧭</span>
            <h3 className="font-serif font-bold text-lg text-[#FFF7ED] mb-1">No States Found</h3>
            <p className="text-xs text-[#A8988B] mb-4">Try refining your search keyword or selected region filter.</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedRegion("All"); }}
              className="btn-primary text-xs"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
