import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getStates, getHotels, getGuides, getAttractionsByState } from "@/utils/api";
import SectionRow from "@/components/SectionRow";
import { motion } from "framer-motion";

export default function StateDetails() {
  const { id } = useParams();
  const [stateData, setStateData] = useState(null);
  const [guides, setGuides] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStates().then((res) => {
      const found = res.data.find((s) => s.id == id);
      setStateData(found);

      if (found) {
        getAttractionsByState(found.name)
          .then((res) => setAttractions(res.data))
          .catch(() => setAttractions([]));
      }
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
          <p className="text-[#FDE047] text-xs uppercase tracking-widest font-semibold">Unveiling Destination...</p>
        </div>
      </div>
    );
  }

  if (!stateData) {
    return (
      <div className="bg-[#0E0307] min-h-screen flex flex-col items-center justify-center text-center p-6">
        <span className="text-4xl mb-3">📍</span>
        <h2 className="font-serif text-2xl text-[#FFF7ED] mb-2">State Not Found</h2>
        <Link to="/states" className="btn-primary text-xs mt-4">
          Return to States
        </Link>
      </div>
    );
  }

  const stateGuides = guides.filter((g) => g.state === stateData.name);
  const stateHotels = hotels.filter((h) => h.state === stateData.name);

  return (
    <div className="bg-[#0E0307] min-h-screen text-[#FFF7ED] pb-24">
      {/* Hero Header */}
      <div className="relative py-16 px-6 md:px-12 border-b border-[#48162A] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#240B15] via-[#19060E] to-[#0E0307]" />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <Link
            to="/states"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#A8988B] hover:text-[#FDE047] mb-6 transition-colors"
          >
            ← Back to All States
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            {stateData.region && (
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#FDE047] border border-[#D4AF37]/40">
                {stateData.region} India
              </span>
            )}
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#240B15] text-[#A8988B] border border-[#48162A]">
              Cultural Destination
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-bold text-[#FFF7ED] leading-tight mb-4"
          >
            {stateData.name}
          </motion.h1>

          <p className="text-sm md:text-base text-[#D6C7B8] max-w-3xl leading-relaxed">
            {stateData.description}
          </p>

          {/* Cultural Dossier Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 max-w-3xl">
            {stateData.traditionalAttire && (
              <div className="p-4 rounded-2xl bg-[#240B15] border border-[#48162A] flex items-start gap-3 shadow-md">
                <span className="text-2xl">👗</span>
                <div>
                  <span className="text-[10px] text-[#A8988B] uppercase tracking-wider font-semibold block">Traditional Attire</span>
                  <span className="text-xs font-semibold text-[#FDE047]">{stateData.traditionalAttire}</span>
                </div>
              </div>
            )}
            {stateData.dance && (
              <div className="p-4 rounded-2xl bg-[#240B15] border border-[#48162A] flex items-start gap-3 shadow-md">
                <span className="text-2xl">💃</span>
                <div>
                  <span className="text-[10px] text-[#A8988B] uppercase tracking-wider font-semibold block">Folk Dance</span>
                  <span className="text-xs font-semibold text-[#FDE047]">{stateData.dance}</span>
                </div>
              </div>
            )}
            {stateData.music && (
              <div className="p-4 rounded-2xl bg-[#240B15] border border-[#48162A] flex items-start gap-3 shadow-md">
                <span className="text-2xl">🪕</span>
                <div>
                  <span className="text-[10px] text-[#A8988B] uppercase tracking-wider font-semibold block">Music Heritage</span>
                  <span className="text-xs font-semibold text-[#FDE047]">{stateData.music}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-12 space-y-12">
        <SectionRow title={`Top Attractions in ${stateData.name}`} data={attractions} type="attraction" />
        <SectionRow title={`Heritage Stays in ${stateData.name}`} data={stateHotels} type="hotel" />
        <SectionRow title={`Verified Guides for ${stateData.name}`} data={stateGuides} type="guide" />
      </div>
    </div>
  );
}
