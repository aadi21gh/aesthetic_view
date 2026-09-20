import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getFestivals, getGuides, getHotels } from "@/utils/api";
import SectionRow from "@/components/SectionRow";
import { motion } from "framer-motion";

export default function FestivalDetails() {
  const { id } = useParams();
  const [festival, setFestival] = useState(null);
  const [guides, setGuides] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFestivals().then((res) => {
      const found = res.data.find((f) => f.id == id);
      setFestival(found);
      setLoading(false);
    });

    getGuides().then((res) => setGuides(res.data)).catch(() => {});
    getHotels().then((res) => setHotels(res.data)).catch(() => {});
  }, [id]);

  if (loading) {
    return (
      <div className="bg-[#0E0307] min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#D4AF37] text-xs uppercase tracking-widest font-serif">Loading Imperial Celebration...</p>
        </div>
      </div>
    );
  }

  if (!festival) {
    return (
      <div className="bg-[#0E0307] min-h-screen flex flex-col items-center justify-center text-center p-6">
        <span className="text-4xl mb-3">🪔</span>
        <h2 className="font-serif text-2xl text-[#FFF7ED] mb-2">Festival Not Found</h2>
        <Link to="/festivals" className="btn-primary text-xs mt-4">
          Return to Festivals
        </Link>
      </div>
    );
  }

  const festivalGuides = guides.filter((g) => g.state === festival.state);
  const festivalHotels = hotels.filter((h) => h.state === festival.state);

  return (
    <div className="bg-[#0E0307] min-h-screen text-[#FFF7ED] pb-24">
      {/* Festival Hero Banner */}
      <div className="relative py-16 px-6 md:px-12 border-b border-[#48162A]/60 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#240B15]/90 via-[#19060E] to-[#0E0307]" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <Link
            to="/festivals"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#D6C7B8] hover:text-[#D4AF37] mb-6 transition-colors"
          >
            ← Back to Festivals
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            {festival.month && (
              <span className="text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-[#300E1C] text-[#FDE047] border border-[#D4AF37]/40 shadow-sm">
                🗓️ {festival.month}
              </span>
            )}
            <span className="text-xs font-medium px-3.5 py-1.5 rounded-full bg-[#240B15] text-[#D4AF37] border border-[#48162A]">
              📍 {festival.state || "All India"}
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-bold text-[#FFF7ED] leading-tight mb-4"
          >
            {festival.name}
          </motion.h1>

          <p className="text-sm md:text-base text-[#D6C7B8] max-w-3xl leading-relaxed">
            {festival.description}
          </p>

          {/* Quick Cultural Pills */}
          {festival.attire && (
            <div className="mt-8 max-w-xl p-4 rounded-2xl bg-[#240B15] border border-[#48162A] flex items-start gap-3 shadow-lg">
              <span className="text-2xl">👗</span>
              <div>
                <span className="text-[10px] text-[#A8988B] uppercase tracking-wider font-semibold block">Recommended Festive Attire</span>
                <span className="text-sm font-medium text-[#FDE047]">{festival.attire}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Sections */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-12 space-y-12">
        {festival.images && festival.images.length > 0 && (
          <SectionRow title="Festival Celebrations & Moments" data={festival.images} type="image" />
        )}
        <SectionRow title={`Heritage Stays in ${festival.state}`} data={festivalHotels} type="hotel" />
        <SectionRow title={`Festival Guides for ${festival.state}`} data={festivalGuides} type="guide" />
      </div>
    </div>
  );
}
