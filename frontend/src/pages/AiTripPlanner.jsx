import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generateItinerary, getStates } from "@/utils/api";
import { useEffect } from "react";

const VIBES = [
  { name: "Royal Heritage", icon: "👑", desc: "Forts, palaces & royal cuisine" },
  { name: "Spiritual & Devotional", icon: "🛕", desc: "Sacred temples & dawn aartis" },
  { name: "Tribal & Folk Arts", icon: "🎨", desc: "Living traditions & village stays" },
  { name: "Culinary & Spice Trails", icon: "🍛", desc: "Regional flavours & food markets" },
  { name: "Nature & Slow Travel", icon: "🌿", desc: "Misty hills & river valleys" },
  { name: "Coastal & Maritime", icon: "🌊", desc: "Fishing villages & coastal culture" },
];

const MONTHS = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

const BUDGETS = [
  { id: "budget", label: "Budget Explorer", icon: "🎒", desc: "₹1,500–₹3,000/night" },
  { id: "mid", label: "Heritage Comfort", icon: "🏨", desc: "₹3,000–₹8,000/night" },
  { id: "luxury", label: "Imperial Luxury", icon: "✨", desc: "₹8,000–₹25,000/night" },
];

export default function AiTripPlanner() {
  const [step, setStep] = useState(1); // 1=form, 2=loading, 3=results
  const [states, setStates] = useState([]);
  const [form, setForm] = useState({ state: "", vibe: "", days: 3, month: "", budget: "mid" });
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState("");
  const [activeDay, setActiveDay] = useState(0);

  useEffect(() => {
    getStates().then(res => setStates(res.data)).catch(() => {});
  }, []);

  const handleGenerate = async () => {
    if (!form.state || !form.vibe || !form.month) {
      setError("Please select a destination, travel vibe, and month.");
      return;
    }
    setError("");
    setStep(2);
    try {
      const res = await generateItinerary(form);
      setItinerary(res.data.itinerary);
      setStep(3);
    } catch (err) {
      setError("Failed to generate itinerary. Please try again.");
      setStep(1);
    }
  };

  const handleReset = () => {
    setStep(1);
    setItinerary(null);
    setActiveDay(0);
    setForm({ state: "", vibe: "", days: 3, month: "", budget: "mid" });
  };

  return (
    <div className="min-h-screen bg-[#0E0307] text-[#FFF7ED] pb-24">
      {/* ─── Hero Banner ─────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#240B15]/90 via-[#19060E] to-[#0E0307] py-16 px-6 text-center border-b border-[#48162A]/60">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="text-5xl mb-4 block">✨</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#FFF7ED] mb-3">
            Sanskriti AI <span className="text-[#D4AF37]">Trip Planner</span>
          </h1>
          <p className="text-[#D6C7B8] text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Tell us your travel vibe and we'll craft a bespoke day-by-day cultural itinerary — attuned to the royal soul of India.
          </p>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">

          {/* ─── Step 1: Form ──────────────────────────────────────────────────── */}
          {step === 1 && (
            <motion.div key="form" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>

              {error && (
                <div className="bg-[#300E1C] border border-[#BE123C] text-[#FDE047] rounded-xl p-4 mb-6 text-center text-xs shadow-md">
                  {error}
                </div>
              )}

              {/* Destination */}
              <div className="mb-8">
                <h2 className="text-lg font-serif font-bold text-[#FFF7ED] mb-3 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#D4AF37] text-[#0E0307] flex items-center justify-center text-xs font-bold shadow-sm">1</span>
                  Where in India?
                </h2>
                <select
                  value={form.state}
                  onChange={e => setForm({ ...form, state: e.target.value })}
                  className="w-full bg-[#240B15] border border-[#48162A] text-[#FFF7ED] rounded-xl px-4 py-3 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 transition text-sm shadow-inner"
                >
                  <option value="" className="bg-[#240B15] text-[#D6C7B8]">Select a state or region...</option>
                  {states.map(s => (
                    <option key={s.id} value={s.name} className="bg-[#240B15] text-[#FFF7ED]">{s.name}</option>
                  ))}
                </select>
              </div>

              {/* Vibe */}
              <div className="mb-8">
                <h2 className="text-lg font-serif font-bold text-[#FFF7ED] mb-3 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#D4AF37] text-[#0E0307] flex items-center justify-center text-xs font-bold shadow-sm">2</span>
                  What's your travel vibe?
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {VIBES.map(v => (
                    <button
                      key={v.name}
                      onClick={() => setForm({ ...form, vibe: v.name })}
                      className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 ${form.vibe === v.name
                        ? "border-[#D4AF37] bg-[#300E1C] shadow-lg shadow-[#D4AF37]/15 scale-[1.02]"
                        : "border-[#48162A] bg-[#240B15] hover:border-[#D4AF37]/50"}`}
                    >
                      <span className="text-2xl block mb-2">{v.icon}</span>
                      <span className="font-semibold text-sm text-[#FFF7ED] block">{v.name}</span>
                      <span className="text-xs text-[#A8988B] mt-1 block">{v.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Month & Duration */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h2 className="text-lg font-serif font-bold text-[#FFF7ED] mb-3 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-[#D4AF37] text-[#0E0307] flex items-center justify-center text-xs font-bold shadow-sm">3</span>
                    When are you travelling?
                  </h2>
                  <div className="grid grid-cols-3 gap-2">
                    {MONTHS.map(m => (
                      <button
                        key={m}
                        onClick={() => setForm({ ...form, month: m })}
                        className={`py-2 px-3 rounded-xl text-xs transition-all ${form.month === m
                          ? "bg-gradient-to-r from-[#D4AF37] via-[#FBBF24] to-[#B8860B] text-[#0E0307] font-bold shadow-md shadow-[#D4AF37]/20"
                          : "bg-[#240B15] border border-[#48162A] text-[#D6C7B8] hover:border-[#D4AF37] hover:text-[#FDE047]"}`}
                      >
                        {m.slice(0, 3)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-serif font-bold text-[#FFF7ED] mb-3 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-[#D4AF37] text-[#0E0307] flex items-center justify-center text-xs font-bold shadow-sm">4</span>
                    Trip duration
                  </h2>
                  <div className="flex items-center gap-4 mt-2">
                    <button onClick={() => setForm({ ...form, days: Math.max(1, form.days - 1) })}
                      className="w-10 h-10 rounded-full bg-[#240B15] border border-[#48162A] hover:border-[#D4AF37] text-[#D4AF37] text-xl flex items-center justify-center transition">−</button>
                    <span className="text-4xl font-serif font-bold text-[#FDE047] w-16 text-center">{form.days}</span>
                    <button onClick={() => setForm({ ...form, days: Math.min(7, form.days + 1) })}
                      className="w-10 h-10 rounded-full bg-[#240B15] border border-[#48162A] hover:border-[#D4AF37] text-[#D4AF37] text-xl flex items-center justify-center transition">+</button>
                    <span className="text-[#A8988B] text-xs">Days</span>
                  </div>

                  <h2 className="text-lg font-serif font-bold text-[#FFF7ED] mb-3 mt-6 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-[#D4AF37] text-[#0E0307] flex items-center justify-center text-xs font-bold shadow-sm">5</span>
                    Budget
                  </h2>
                  <div className="flex flex-col gap-2">
                    {BUDGETS.map(b => (
                      <button key={b.id} onClick={() => setForm({ ...form, budget: b.id })}
                        className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all ${form.budget === b.id
                          ? "border-[#D4AF37] bg-[#300E1C] shadow-sm"
                          : "border-[#48162A] bg-[#240B15] hover:border-[#D4AF37]/40"}`}>
                        <span className="text-xl">{b.icon}</span>
                        <div className="text-left">
                          <span className="block text-xs font-semibold text-[#FFF7ED]">{b.label}</span>
                          <span className="block text-[11px] text-[#A8988B]">{b.desc}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Generate CTA */}
              <button
                onClick={handleGenerate}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#FBBF24] to-[#B8860B] text-[#0E0307] font-bold text-base transition-all duration-300 shadow-xl shadow-[#D4AF37]/25 hover:brightness-110 uppercase tracking-wider"
              >
                ✨ Generate My Cultural Itinerary
              </button>
            </motion.div>
          )}

          {/* ─── Step 2: Loading ───────────────────────────────────────────────── */}
          {step === 2 && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32 gap-6">
              <div className="w-16 h-16 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
              <p className="text-[#FDE047] text-xl font-serif font-bold">Crafting your cultural journey...</p>
              <p className="text-[#D6C7B8] text-xs">Sanskriti AI is curating festivals, heritage stays, and local experiences</p>
            </motion.div>
          )}

          {/* ─── Step 3: Results ───────────────────────────────────────────────── */}
          {step === 3 && itinerary && (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

              {/* Overview Card */}
              <div className="bg-gradient-to-br from-[#240B15] to-[#300E1C] border border-[#48162A] rounded-3xl p-6 mb-8 shadow-2xl">
                <div className="flex flex-wrap gap-4 items-start justify-between">
                  <div>
                    <h2 className="text-3xl font-serif font-bold text-[#FDE047] mb-1">
                      {itinerary.overview?.destination} — {itinerary.overview?.vibe}
                    </h2>
                    <p className="text-xs text-[#D6C7B8]">{itinerary.overview?.bestFor}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {[
                        { icon: "📅", label: itinerary.overview?.duration },
                        { icon: "🗓️", label: itinerary.overview?.month },
                        { icon: "💰", label: itinerary.overview?.budgetRange || itinerary.overview?.budget },
                      ].map((tag, i) => (
                        <span key={i} className="bg-[#0E0307] border border-[#48162A] text-[#D4AF37] px-3.5 py-1.5 rounded-full text-xs flex items-center gap-1 font-medium">
                          {tag.icon} {tag.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button onClick={handleReset}
                    className="bg-[#0E0307] border border-[#48162A] hover:border-[#D4AF37] text-xs px-4 py-2 rounded-xl text-[#D4AF37] transition font-medium">
                    ↩ Plan Another
                  </button>
                </div>
              </div>

              {/* Cultural Tips */}
              {itinerary.culturalTips && (
                <div className="bg-[#240B15]/90 border border-[#48162A] rounded-3xl p-6 mb-8 shadow-lg">
                  <h3 className="font-serif font-bold text-[#D4AF37] mb-3 text-lg">🙏 Cultural Etiquette & Tips</h3>
                  <div className="grid md:grid-cols-2 gap-2.5">
                    {itinerary.culturalTips.map((tip, i) => (
                      <p key={i} className="text-xs text-[#D6C7B8] flex items-start gap-2 leading-relaxed">{tip}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Day-by-Day Itinerary */}
              <h3 className="text-2xl font-serif font-bold text-[#FFF7ED] mb-5">
                🗓️ Your Day-by-Day <span className="text-[#D4AF37]">Cultural Itinerary</span>
              </h3>

              {/* Day selector tabs */}
              <div className="flex gap-2 mb-6 flex-wrap">
                {itinerary.itinerary?.map((day, i) => (
                  <button key={i} onClick={() => setActiveDay(i)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${activeDay === i
                      ? "bg-gradient-to-r from-[#D4AF37] via-[#FBBF24] to-[#B8860B] text-[#0E0307] shadow-md shadow-[#D4AF37]/20"
                      : "bg-[#240B15] border border-[#48162A] text-[#D6C7B8] hover:border-[#D4AF37] hover:text-[#FDE047]"}`}>
                    Day {day.day}
                  </button>
                ))}
              </div>

              {/* Active day card */}
              <AnimatePresence mode="wait">
                {itinerary.itinerary?.[activeDay] && (
                  <motion.div key={activeDay} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                    className="bg-[#240B15] border border-[#48162A] rounded-3xl overflow-hidden mb-8 shadow-xl">
                    <div className="bg-gradient-to-r from-[#300E1C] via-[#48162A] to-[#300E1C] px-6 py-4 border-b border-[#48162A]">
                      <h4 className="text-lg font-serif font-bold text-[#FDE047]">Day {itinerary.itinerary[activeDay].day}: {itinerary.itinerary[activeDay].theme}</h4>
                    </div>
                    <div className="p-6 space-y-5">
                      {[
                        { time: "🌅 Morning", content: itinerary.itinerary[activeDay].morning },
                        { time: "☀️ Afternoon", content: itinerary.itinerary[activeDay].afternoon },
                        { time: "🌙 Evening", content: itinerary.itinerary[activeDay].evening },
                      ].map((slot, i) => (
                        <div key={i} className="border-l-2 border-[#D4AF37] pl-4">
                          <p className="text-[#FDE047] font-semibold text-xs mb-1">{slot.time}</p>
                          <p className="text-[#D6C7B8] text-xs leading-relaxed">{slot.content}</p>
                        </div>
                      ))}
                      <div className="bg-[#0E0307] rounded-2xl px-4 py-3 border border-[#48162A]">
                        <p className="text-[#D4AF37] text-xs">{itinerary.itinerary[activeDay].tip}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Packing List & Recommended Stays */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {itinerary.packingList && (
                  <div className="bg-[#240B15] border border-[#48162A] rounded-3xl p-6 shadow-lg">
                    <h3 className="font-serif font-bold text-[#D4AF37] mb-3">🧳 What to Pack</h3>
                    <ul className="space-y-2">
                      {itinerary.packingList.map((item, i) => (
                        <li key={i} className="text-xs text-[#D6C7B8] flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {itinerary.recommendedStays && (
                  <div className="bg-[#240B15] border border-[#48162A] rounded-3xl p-6 shadow-lg">
                    <h3 className="font-serif font-bold text-[#FDE047] mb-3">🏨 Recommended Stays</h3>
                    <div className="space-y-3">
                      {itinerary.recommendedStays.map((stay, i) => (
                        <div key={i} className="border border-[#48162A] bg-[#0E0307] rounded-2xl p-3">
                          <p className="font-semibold text-[#FFF7ED] text-xs">{stay.name}</p>
                          <p className="text-[10px] text-[#A8988B] mt-0.5">{stay.type} · {stay.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Transport */}
              {itinerary.transport && (
                <div className="bg-[#240B15] border border-[#48162A] rounded-3xl p-6 mb-8 shadow-lg">
                  <h3 className="font-serif font-bold text-[#D4AF37] mb-2">🚗 Getting Around</h3>
                  <p className="text-xs text-[#D6C7B8]">{itinerary.transport}</p>
                </div>
              )}

            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
