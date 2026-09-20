import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const MONTHS = [
  { name: "January", abbr: "JAN", number: 1 },
  { name: "February", abbr: "FEB", number: 2 },
  { name: "March", abbr: "MAR", number: 3 },
  { name: "April", abbr: "APR", number: 4 },
  { name: "May", abbr: "MAY", number: 5 },
  { name: "June", abbr: "JUN", number: 6 },
  { name: "July", abbr: "JUL", number: 7 },
  { name: "August", abbr: "AUG", number: 8 },
  { name: "September", abbr: "SEP", number: 9 },
  { name: "October", abbr: "OCT", number: 10 },
  { name: "November", abbr: "NOV", number: 11 },
  { name: "December", abbr: "DEC", number: 12 },
];

const FESTIVAL_CALENDAR = {
  January: [
    { name: "Makar Sankranti", state: "All India", type: "harvest", desc: "Harvest festival marking the sun's transit into Capricorn. Kite flying, sesame sweets, and bonfires.", color: "#F59E0B" },
    { name: "Lohri", state: "Punjab", type: "harvest", desc: "Bonfire festival celebrating winter solstice and harvest. Songs, bhangra, and rewri.", color: "#EF4444" },
    { name: "Pongal", state: "Tamil Nadu", type: "harvest", desc: "4-day harvest festival with kolam art, sugarcane offerings, and Pongal sweet rice.", color: "#10B981" },
    { name: "Republic Day Parade", state: "Delhi", type: "national", desc: "Grand military parade on Rajpath showcasing India's cultural diversity and military strength.", color: "#3B82F6" },
  ],
  February: [
    { name: "Vasant Panchami", state: "All India", type: "spring", desc: "Celebration of spring goddess Saraswati. Wear yellow, fly kites, enjoy mustard fields.", color: "#EAB308" },
    { name: "Surajkund Crafts Mela", state: "Haryana", type: "folk", desc: "India's biggest crafts fair showcasing artisans from across the country.", color: "#8B5CF6" },
  ],
  March: [
    { name: "Holi", state: "All India", type: "color", desc: "Festival of colors and spring. Most vibrant in Mathura, Vrindavan & Barsana.", color: "#EC4899" },
    { name: "Maha Shivratri", state: "All India", type: "spiritual", desc: "Night of Lord Shiva. Temples light up, devotees fast and chant through the night.", color: "#6366F1" },
  ],
  April: [
    { name: "Baisakhi", state: "Punjab", type: "harvest", desc: "Sikh harvest festival and New Year. Bhangra, gidda, and langar celebrations.", color: "#F59E0B" },
    { name: "Bihu", state: "Assam", type: "harvest", desc: "Assamese New Year with Bihu dance, traditional music, and feast.", color: "#10B981" },
    { name: "Vishu", state: "Kerala", type: "new_year", desc: "Kerala New Year with Vishukkani (auspicious sights) and Sadya feast.", color: "#F59E0B" },
  ],
  May: [
    { name: "Buddha Purnima", state: "All India", type: "spiritual", desc: "Birth of Gautam Buddha. Peaceful candlelit processions and prayers at monasteries.", color: "#EAB308" },
    { name: "Thrissur Pooram", state: "Kerala", type: "temple", desc: "World's grandest temple festival with decorated elephants, music, and fireworks.", color: "#EF4444" },
  ],
  June: [
    { name: "Rath Yatra", state: "Odisha", type: "spiritual", desc: "Massive chariot procession of Lord Jagannath in Puri. Millions of devotees pull the raths.", color: "#F59E0B" },
    { name: "Hemis Festival", state: "Ladakh", type: "buddhist", desc: "Spectacular monastic festival with Cham mask dances and thangka painting unveiling.", color: "#8B5CF6" },
  ],
  July: [
    { name: "Teej", state: "Rajasthan / North India", type: "women", desc: "Women's festival celebrating monsoon with swings, henna, and songs for marital bliss.", color: "#EC4899" },
    { name: "Guru Purnima", state: "All India", type: "spiritual", desc: "Festival honoring teachers and gurus. Ashrams and monasteries hold special ceremonies.", color: "#6366F1" },
  ],
  August: [
    { name: "Onam", state: "Kerala", type: "harvest", desc: "Kerala's grand harvest festival. 26-dish Sadya feast, snake boat races, Athapookalam floral art.", color: "#10B981" },
    { name: "Janmashtami", state: "All India", type: "spiritual", desc: "Birth of Lord Krishna. Midnight celebrations, Dahi Handi human pyramids in Mumbai.", color: "#3B82F6" },
    { name: "Independence Day", state: "All India", type: "national", desc: "National celebration with flag hoisting, parades, and kite flying across India.", color: "#EF4444" },
  ],
  September: [
    { name: "Ganesh Chaturthi", state: "Maharashtra", type: "temple", desc: "10-day festival of Lord Ganesha. Massive pandals, processions, and sea immersion.", color: "#F59E0B" },
    { name: "Navratri", state: "Gujarat / All India", type: "dance", desc: "9 nights of Garba and Dandiya Raas in Gujarat. Each night has a color theme.", color: "#EC4899" },
  ],
  October: [
    { name: "Dussehra", state: "All India", type: "mythological", desc: "Victory of Ram over Ravana. Ramlila plays, effigy burning, and celebrations.", color: "#EF4444" },
    { name: "Diwali", state: "All India", type: "lights", desc: "Festival of lights. Diyas, fireworks, sweets, and family gatherings across India.", color: "#EAB308" },
  ],
  November: [
    { name: "Dev Deepawali", state: "Uttar Pradesh", type: "spiritual", desc: "A million earthen lamps light the Varanasi ghats. More spectacular than Diwali itself.", color: "#EAB308" },
    { name: "Pushkar Camel Fair", state: "Rajasthan", type: "folk", desc: "World's largest camel fair. Trading, competitions, folk performances, and sunrise hot-air balloons.", color: "#F59E0B" },
  ],
  December: [
    { name: "Hornbill Festival", state: "Nagaland", type: "tribal", desc: "10-day tribal cultural festival. Naga warrior dances, traditional food, and morungs.", color: "#10B981" },
    { name: "Christmas in Goa", state: "Goa", type: "cultural", desc: "Colonial Portuguese heritage blends with Indian warmth. Midnight mass, star lanterns, and carol singing.", color: "#3B82F6" },
  ],
};

const TYPE_COLORS = {
  harvest: "bg-[#300E1C] text-[#FDE047] border-[#D4AF37]/40",
  spiritual: "bg-[#300E1C] text-[#FBBF24] border-[#D4AF37]/40",
  lights: "bg-[#300E1C] text-[#FDE047] border-[#D4AF37]/60",
  folk: "bg-[#240B15] text-[#D4AF37] border-[#48162A]",
  tribal: "bg-[#240B15] text-[#FDE047] border-[#48162A]",
  temple: "bg-[#300E1C] text-[#FDE047] border-[#BE123C]/50",
  dance: "bg-[#300E1C] text-[#FBBF24] border-[#D4AF37]/40",
  national: "bg-[#240B15] text-[#D4AF37] border-[#48162A]",
  cultural: "bg-[#300E1C] text-[#FDE047] border-[#D4AF37]/40",
  color: "bg-[#300E1C] text-[#FBBF24] border-[#BE123C]/60",
  spring: "bg-[#300E1C] text-[#FDE047] border-[#D4AF37]/40",
  women: "bg-[#300E1C] text-[#FBBF24] border-[#BE123C]/50",
  buddhist: "bg-[#300E1C] text-[#FDE047] border-[#D4AF37]/40",
  mythological: "bg-[#300E1C] text-[#FDE047] border-[#BE123C]/50",
  new_year: "bg-[#300E1C] text-[#FDE047] border-[#D4AF37]/50",
};

export default function CulturalCalendar() {
  const currentMonth = MONTHS[new Date().getMonth()].name;
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedFestival, setSelectedFestival] = useState(null);

  const festivals = FESTIVAL_CALENDAR[selectedMonth] || [];

  return (
    <div className="min-h-screen bg-[#0E0307] text-[#FFF7ED]">
      {/* Hero */}
      <div className="relative bg-gradient-to-b from-[#240B15]/90 via-[#19060E] to-[#0E0307] py-16 px-6 text-center border-b border-[#48162A]/60 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
          <span className="text-4xl mb-3 block">🗓️</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#FFF7ED] mb-3">
            Cultural Festival <span className="text-[#D4AF37]">Calendar</span>
          </h1>
          <p className="text-[#D6C7B8] max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Discover India's living cultural calendar — 12 months of vibrant traditions, rituals, and majestic celebrations.
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Month Selector */}
        <div className="flex overflow-x-auto gap-2 pb-4 mb-8 scrollbar-hide">
          {MONTHS.map(m => (
            <button key={m.name} onClick={() => { setSelectedMonth(m.name); setSelectedFestival(null); }}
              className={`flex-shrink-0 px-5 py-3 rounded-xl transition-all font-semibold text-sm ${selectedMonth === m.name
                ? "bg-gradient-to-r from-[#D4AF37] via-[#FBBF24] to-[#B8860B] text-[#0E0307] shadow-lg shadow-[#D4AF37]/25 scale-105"
                : "bg-[#240B15] border border-[#48162A] text-[#D6C7B8] hover:border-[#D4AF37] hover:text-[#FFF7ED]"}`}>
              {m.abbr}
            </button>
          ))}
        </div>

        {/* Month title */}
        <motion.div key={selectedMonth} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-serif font-bold text-[#FFF7ED] mb-1">
              {selectedMonth}
            </h2>
            <p className="text-[#D4AF37] text-sm font-medium">{festivals.length} celebration{festivals.length !== 1 ? "s" : ""} this month</p>
          </div>
          <span className="text-xs px-3 py-1.5 rounded-full bg-[#240B15] border border-[#48162A] text-[#D6C7B8]">
            2026 Cultural Almanac
          </span>
        </motion.div>

        {/* Festival Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          <AnimatePresence>
            {festivals.map((festival, i) => (
              <motion.div key={festival.name}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedFestival(selectedFestival?.name === festival.name ? null : festival)}
                className="bg-[#240B15] border border-[#48162A] rounded-2xl p-5 cursor-pointer hover:border-[#D4AF37] transition-all duration-200 hover:shadow-xl hover:shadow-[#D4AF37]/10 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-serif font-bold text-[#FDE047] group-hover:text-[#FFF7ED] transition-colors">{festival.name}</h3>
                  <span className={`text-xs px-2.5 py-1 rounded-full border capitalize font-medium ${TYPE_COLORS[festival.type] || "bg-[#300E1C] text-[#FDE047] border-[#48162A]"}`}>
                    {festival.type?.replace("_", " ")}
                  </span>
                </div>
                <p className="text-xs text-[#D4AF37] mb-2 font-medium flex items-center gap-1">
                  📍 {festival.state}
                </p>
                <p className="text-sm text-[#D6C7B8] leading-relaxed">{festival.desc}</p>

                <AnimatePresence>
                  {selectedFestival?.name === festival.name && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-[#48162A]">
                      <div className="flex gap-3">
                        <Link to="/festivals" className="btn-primary text-xs py-2 px-4 shadow-md">
                          View Festival →
                        </Link>
                        <Link to="/ai-planner" className="btn-secondary text-xs py-2 px-4">
                          Plan Trip ✨
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {festivals.length === 0 && (
          <div className="text-center py-20 text-[#A8988B] bg-[#240B15] border border-[#48162A] rounded-2xl">
            <p className="text-4xl mb-3">🎭</p>
            <p className="text-lg font-serif font-medium text-[#FFF7ED]">No festivals listed for this month yet.</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-[#240B15] via-[#300E1C] to-[#240B15] border border-[#48162A] rounded-3xl p-8 text-center shadow-2xl">
          <p className="text-2xl font-serif font-bold text-[#FDE047] mb-2">Ready to plan your cultural journey?</p>
          <p className="text-[#D6C7B8] mb-6 max-w-lg mx-auto text-sm">Let Sanskriti AI craft a personalised day-by-day itinerary around these sacred & heritage festivals.</p>
          <Link to="/ai-planner"
            className="inline-block bg-gradient-to-r from-[#D4AF37] via-[#FBBF24] to-[#B8860B] text-[#0E0307] px-8 py-3.5 rounded-xl font-bold hover:brightness-110 shadow-lg shadow-[#D4AF37]/25 transition-all text-sm uppercase tracking-wider">
            ✨ Open AI Trip Planner
          </Link>
        </div>
      </div>
    </div>
  );
}
