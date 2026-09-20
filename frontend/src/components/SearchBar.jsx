import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ festivals = [], states = [] }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const q = query.trim().toLowerCase();
    if (!q) return;

    const festival = festivals.find((f) => f.name.toLowerCase().includes(q));
    if (festival) {
      navigate(`/festivals/${festival.id}`);
      return;
    }

    const state = states.find((s) => s.name.toLowerCase().includes(q));
    if (state) {
      navigate(`/states/${state.id}`);
      return;
    }

    navigate(`/states`);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex items-center gap-2 w-full max-w-lg">
      <div className="relative flex-1">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A8988B] text-sm">🔍</span>
        <input
          type="text"
          placeholder="Search states, festivals, traditions..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#240B15] border border-[#48162A] text-[#FFF7ED] placeholder-[#A8988B]/60 text-xs focus:border-[#D4AF37] focus:outline-none transition-colors"
        />
      </div>
      <button
        onClick={handleSearch}
        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FDE047] via-[#D4AF37] to-[#B8860B] text-[#0E0307] font-bold text-xs tracking-wider uppercase hover:brightness-105 transition-all shadow-md shadow-[#D4AF37]/25"
      >
        Search
      </button>
    </div>
  );
}
