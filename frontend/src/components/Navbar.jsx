import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect, useRef } from "react";
import { getStates, getFestivals, getHotels, getGuides } from "@/utils/api";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/states", label: "States" },
  { to: "/festivals", label: "Festivals" },
  { to: "/hotels", label: "Hotels" },
  { to: "/guides", label: "Guides" },
  { to: "/calendar", label: "📅 Calendar" },
  { to: "/ai-planner", label: "✨ AI Planner" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [states, setStates] = useState([]);
  const [festivals, setFestivals] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [guides, setGuides] = useState([]);

  const profileRef = useRef(null);

  useEffect(() => {
    getStates().then(res => setStates(res.data)).catch(() => {});
    getFestivals().then(res => setFestivals(res.data)).catch(() => {});
    getHotels().then(res => setHotels(res.data)).catch(() => {});
    getGuides().then(res => setGuides(res.data)).catch(() => {});
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const all = [
      ...states.map(s => ({ ...s, _type: "State" })),
      ...festivals.map(f => ({ ...f, _type: "Festival" })),
      ...hotels.map(h => ({ ...h, _type: "Hotel" })),
      ...guides.map(g => ({ ...g, _type: "Guide" })),
    ];
    setResults(all.filter(item => item.name?.toLowerCase().includes(query.toLowerCase())).slice(0, 7));
  }, [query, states, festivals, hotels, guides]);

  const handleResultClick = (res) => {
    const routes = { State: "states", Festival: "festivals", Hotel: "hotels", Guide: "guides" };
    navigate(`/${routes[res._type]}/${res.id}`);
    setQuery("");
    setResults([]);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
      ? "bg-[#0E0307]/95 backdrop-blur-md shadow-xl shadow-black/50 border-b border-[#48162A]"
      : "bg-[#0E0307] border-b border-[#48162A]/60"}`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-4 h-16">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FBBF24] via-[#D4AF37] to-[#B8860B] flex items-center justify-center text-sm font-extrabold text-[#0E0307] shadow-md shadow-[#D4AF37]/30 group-hover:scale-110 transition">
            AV
          </div>
          <span className="text-lg font-bold text-[#FFF7ED] hidden sm:block font-serif">
            Aesthetic<span className="text-[#D4AF37]">View</span>
          </span>
        </Link>

        {/* Nav Links — Desktop */}
        <div className="hidden lg:flex items-center gap-1 flex-1 ml-4">
          {NAV_LINKS.map(link => (
            <Link key={link.to} to={link.to}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${isActive(link.to)
                ? "bg-[#D4AF37]/15 text-[#FDE047] border border-[#D4AF37]/40 font-semibold"
                : "text-[#D6C7B8] hover:text-[#FFF7ED] hover:bg-[#240B15]"}`}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-sm ml-auto">
          <div className="flex items-center bg-[#240B15] border border-[#48162A] rounded-xl overflow-hidden focus-within:border-[#D4AF37] transition">
            <span className="pl-3 text-[#A8988B] text-xs">🔍</span>
            <input
              type="text"
              placeholder="Search festivals, states..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full bg-transparent px-3 py-2 text-xs text-[#FFF7ED] placeholder-[#A8988B]/60 focus:outline-none"
            />
          </div>
          <AnimatePresence>
            {results.length > 0 && (
              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                className="absolute top-full mt-1 left-0 right-0 bg-[#240B15] border border-[#48162A] rounded-xl shadow-2xl z-50 overflow-hidden">
                {results.map(res => (
                  <button key={`${res._type}-${res.id}`} onClick={() => handleResultClick(res)}
                    className="w-full px-4 py-2.5 text-left hover:bg-[#300E1C] flex items-center justify-between transition border-b border-[#48162A]/40 last:border-0">
                    <span className="text-xs font-medium text-[#FFF7ED]">{res.name}</span>
                    <span className="text-[10px] text-[#D4AF37] bg-[#0E0307] px-2 py-0.5 rounded-full border border-[#D4AF37]/30">{res._type}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Auth area */}
        {user ? (
          <div className="relative flex-shrink-0" ref={profileRef}>
            <button onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 bg-[#240B15] border border-[#48162A] hover:border-[#D4AF37] rounded-xl px-3 py-1.5 transition group">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#FBBF24] via-[#D4AF37] to-[#B8860B] flex items-center justify-center text-xs font-bold text-[#0E0307]">
                {user.name?.[0]?.toUpperCase() || "U"}
              </div>
              <span className="text-xs text-[#FFF7ED] hidden sm:block font-medium">{user.name?.split(" ")[0]}</span>
              <span className="text-[#A8988B] text-xs">▾</span>
            </button>
            <AnimatePresence>
              {profileOpen && (
                <motion.div initial={{ opacity: 0, y: 5, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 5, scale: 0.97 }}
                  className="absolute right-0 mt-2 w-48 bg-[#240B15] border border-[#48162A] rounded-2xl shadow-2xl overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-[#48162A]">
                    <p className="font-semibold text-[#FFF7ED] text-xs">{user.name}</p>
                    <p className="text-[10px] text-[#A8988B] truncate">{user.email}</p>
                  </div>
                  {[
                    { to: "/profile", icon: "👤", label: "My Profile" },
                    { to: "/bookings", icon: "🎫", label: "My Bookings" },
                    { to: "/wishlist", icon: "❤️", label: "Wishlist" },
                  ].map(item => (
                    <Link key={item.to} to={item.to} onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-xs text-[#D6C7B8] hover:bg-[#300E1C] hover:text-[#FDE047] transition">
                      <span>{item.icon}</span> {item.label}
                    </Link>
                  ))}
                  <button onClick={() => { logout(); setProfileOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-rose-400 hover:bg-[#300E1C] transition border-t border-[#48162A]">
                    <span>🚪</span> Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link to="/login" className="text-xs text-[#D6C7B8] hover:text-[#FDE047] transition px-3 py-2 hidden sm:block">
              Login
            </Link>
            <Link to="/signup"
              className="bg-gradient-to-r from-[#FDE047] via-[#D4AF37] to-[#B8860B] text-[#0E0307] text-xs px-4 py-2 rounded-xl font-bold hover:shadow-lg hover:shadow-[#D4AF37]/30 hover:brightness-105 transition-all">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
