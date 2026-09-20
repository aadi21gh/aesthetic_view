import { useEffect, useState } from "react";
import { getStates, getFestivals, getHotels, getGuides } from "@/utils/api";
import SectionRow from "@/components/SectionRow";
import HeroCarousel from "@/components/HeroCarousel";
import ChatBox from "@/components/ChatBox";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const VIBES = [
  { icon: "👑", label: "Royal Heritage", to: "/ai-planner" },
  { icon: "🛕", label: "Spiritual", to: "/ai-planner" },
  { icon: "🎨", label: "Tribal Arts", to: "/ai-planner" },
  { icon: "🍛", label: "Culinary", to: "/ai-planner" },
  { icon: "🌿", label: "Slow Travel", to: "/ai-planner" },
  { icon: "🌊", label: "Coastal", to: "/ai-planner" },
];

const STATS = [
  { number: "28+", label: "Indian States" },
  { number: "50+", label: "Festivals" },
  { number: "100+", label: "Cultural Stays" },
  { number: "AI", label: "Tailored Routes" },
];

export default function Home() {
  const { user } = useAuth();
  const [states, setStates] = useState([]);
  const [festivals, setFestivals] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    getStates().then(res => setStates(res.data)).catch(() => {});
    getFestivals().then(res => setFestivals(res.data)).catch(() => {});
    getHotels().then(res => setHotels(res.data)).catch(() => {});
    getGuides().then(res => setGuides(res.data)).catch(() => {});
  }, []);

  const heroImages = ["/images/hero1.jpg", "/images/hero2.jpg", "/images/hero3.jpg"];

  return (
    <div className="bg-[#0E0307] min-h-screen text-[#FFF7ED]">

      {/* ─── Hero Carousel ─────────────────────────────────────────────────────── */}
      <div className="relative">
        <div className="px-4 md:px-8 pt-4">
          <HeroCarousel images={heroImages} />
        </div>

        {/* Hero text overlay with royal frosted glass card to eliminate conflict */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="max-w-3xl mx-auto px-6 py-8 sm:px-10 sm:py-9 rounded-3xl bg-[#0E0307]/80 backdrop-blur-md border border-[#D4AF37]/35 shadow-[0_12px_45px_rgba(0,0,0,0.85)]"
          >
            <span className="inline-block bg-[#300E1C] border border-[#D4AF37]/50 text-[#FDE047] text-xs font-bold px-4 py-1.5 rounded-full mb-3 tracking-widest uppercase shadow-sm">
              India's Cultural Travel Companion
            </span>
            <h1
              className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-[#FFF7ED] mb-3 leading-tight"
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.9)" }}
            >
              Discover the <span className="text-[#FDE047]">Soul of India</span>
            </h1>
            <p
              className="text-[#E5DCD3] text-xs sm:text-base md:text-lg mb-6 max-w-xl mx-auto leading-relaxed font-normal"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.9)" }}
            >
              From Hornbill Festival in Nagaland to Dev Deepawali in Varanasi — explore India's timeless, living tapestry.
            </p>
            <div className="flex flex-wrap gap-3.5 justify-center pointer-events-auto">
              <Link
                to="/ai-planner"
                className="bg-gradient-to-r from-[#D4AF37] via-[#FBBF24] to-[#B8860B] text-[#0E0307] px-7 py-3.5 rounded-xl font-bold hover:shadow-xl hover:shadow-[#D4AF37]/35 transition-all hover:scale-105 text-xs sm:text-sm uppercase tracking-wider"
              >
                ✨ Plan My Journey
              </Link>
              <Link
                to="/festivals"
                className="bg-[#240B15]/90 border border-[#48162A] text-[#FDE047] px-7 py-3.5 rounded-xl font-semibold hover:border-[#D4AF37] hover:text-[#FFF7ED] transition-all text-xs sm:text-sm shadow-md"
              >
                Explore Festivals →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── Stats Row ─────────────────────────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-0 border-y border-[#48162A] bg-[#19060E]/90">
        {STATS.map((stat, i) => (
          <div key={i} className={`py-6 text-center ${i < 3 ? "border-r border-[#48162A]" : ""}`}>
            <p className="text-2xl md:text-3xl font-serif font-bold text-[#FDE047]">{stat.number}</p>
            <p className="text-xs text-[#A8988B] mt-1 uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* ─── Travel Vibes ──────────────────────────────────────────────────────── */}
      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="px-4 md:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-bold text-[#FFF7ED]">
            What's Your <span className="text-[#FDE047]">Travel Vibe?</span>
          </h2>
          <p className="text-xs md:text-sm text-[#A8988B] mt-2">Choose your style and our AI crafts a customized cultural journey</p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 max-w-4xl mx-auto">
          {VIBES.map(v => (
            <Link key={v.label} to={v.to}
              className="flex flex-col items-center gap-2 p-4 bg-[#240B15] border border-[#48162A] rounded-2xl hover:border-[#D4AF37] hover:bg-[#300E1C] transition-all group">
              <span className="text-3xl group-hover:scale-110 transition">{v.icon}</span>
              <span className="text-xs text-[#A8988B] group-hover:text-[#FDE047] text-center leading-tight font-medium">{v.label}</span>
            </Link>
          ))}
        </div>
      </motion.section>

      {/* ─── States Section ────────────────────────────────────────────────────── */}
      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="px-4 md:px-8 pb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-serif font-bold text-[#FFF7ED]">
            <span className="text-[#FDE047]">States</span> of India
          </h2>
          <Link to="/states" className="text-xs font-semibold text-[#D4AF37] hover:text-[#FDE047] transition">View all →</Link>
        </div>
        <SectionRow data={states} type="state" />
      </motion.section>

      {/* ─── Festivals Section ─────────────────────────────────────────────────── */}
      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="px-4 md:px-8 pb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-serif font-bold text-[#FFF7ED]">
            <span className="text-[#FDE047]">Festivals</span> of India
          </h2>
          <Link to="/festivals" className="text-xs font-semibold text-[#D4AF37] hover:text-[#FDE047] transition">View all →</Link>
        </div>
        <SectionRow data={festivals} type="festival" />
      </motion.section>

      {/* ─── Hotels Section ────────────────────────────────────────────────────── */}
      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="px-4 md:px-8 pb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-serif font-bold text-[#FFF7ED]">
            <span className="text-[#FDE047]">Heritage</span> Stays
          </h2>
          <Link to="/hotels" className="text-xs font-semibold text-[#D4AF37] hover:text-[#FDE047] transition">View all →</Link>
        </div>
        <SectionRow data={hotels} type="hotel" />
      </motion.section>

      {/* ─── Guides Section ────────────────────────────────────────────────────── */}
      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="px-4 md:px-8 pb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-serif font-bold text-[#FFF7ED]">
            <span className="text-[#FDE047]">Local</span> Storytellers
          </h2>
          <Link to="/guides" className="text-xs font-semibold text-[#D4AF37] hover:text-[#FDE047] transition">View all →</Link>
        </div>
        <SectionRow data={guides} type="guide" />
      </motion.section>

      {/* ─── AI Planner CTA ────────────────────────────────────────────────────── */}
      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="px-4 md:px-8 py-12">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#240B15] via-[#300E1C] to-[#0E0307] border border-[#48162A] rounded-3xl p-10 text-center shadow-2xl">
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #D4AF37 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
          <span className="text-5xl mb-4 block">✨</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#FFF7ED] mb-3">
            Let AI Plan Your <span className="text-[#FDE047]">Cultural Journey</span>
          </h2>
          <p className="text-xs md:text-sm text-[#A8988B] max-w-xl mx-auto mb-8">
            Tell Sanskriti your travel vibe, month, and budget — get a customized day-by-day cultural itinerary instantly.
          </p>
          <Link to="/ai-planner"
            className="inline-block bg-gradient-to-r from-[#FDE047] via-[#D4AF37] to-[#B8860B] text-[#0E0307] px-10 py-4 rounded-2xl font-bold text-sm hover:shadow-2xl hover:shadow-[#D4AF37]/35 hover:scale-105 transition-all">
            ✨ Start Planning Now
          </Link>
        </div>
      </motion.section>

      {/* ─── Floating Sanskriti AI ──────────────────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30, delay: 1 }}>
          <ChatBox />
        </motion.div>
      </div>
    </div>
  );
}
