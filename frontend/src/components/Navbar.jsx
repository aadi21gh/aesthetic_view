import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { getStates, getFestivals, getHotels, getGuides } from "@/utils/api";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const [states, setStates] = useState([]);
  const [festivals, setFestivals] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [guides, setGuides] = useState([]);

  // Fetch all data for search
  useEffect(() => {
    getStates().then((res) => setStates(res.data));
    getFestivals().then((res) => setFestivals(res.data));
    getHotels().then((res) => setHotels(res.data));
    getGuides().then((res) => setGuides(res.data));
  }, []);

  // Update search results
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const allItems = [
      ...states.map((s) => ({ ...s, type: "State" })),
      ...festivals.map((f) => ({ ...f, type: "Festival" })),
      ...hotels.map((h) => ({ ...h, type: "Hotel" })),
      ...guides.map((g) => ({ ...g, type: "Guide" })),
    ];

    const filtered = allItems.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filtered);
  }, [query, states, festivals, hotels, guides]);

  const handleResultClick = (res) => {
    switch (res.type) {
      case "State":
        navigate(`/states/${res.id}`);
        break;
      case "Festival":
        navigate(`/festivals/${res.id}`);
        break;
      case "Hotel":
        navigate(`/hotels/${res.id}`);
        break;
      case "Guide":
        navigate(`/guides/${res.id}`);
        break;
      default:
        break;
    }

    setQuery("");
    setResults([]);
  };

  return (
    <nav className="bg-[#5A3E2B] text-white p-4 flex items-center justify-between relative">
      {/* Left: Logo */}
      <div className="text-2xl font-bold">
        <Link to="/">AestheticView</Link>
      </div>

      {/* Center: Search Bar */}
      <div className="relative flex-1 mx-6">
        <input
          type="text"
          placeholder="Search festivals, states, hotels..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 rounded-lg text-black outline-none"
        />
        {results.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white text-black rounded shadow max-h-60 overflow-y-auto z-50">
            {results.map((res) => (
              <div
                key={res.id}
                onClick={() => handleResultClick(res)}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              >
                {res.name} <span className="text-xs text-gray-500">({res.type})</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right: Links + Auth */}
      <div className="flex items-center gap-6">
        <Link to="/states" className="hover:underline font-medium">States</Link>
        <Link to="/festivals" className="hover:underline font-medium">Festivals</Link>
        {user ? (
          <button
            onClick={logout}
            className="bg-[#C19A6B] px-4 py-2 rounded hover:bg-[#d2ad83] transition"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-[#C19A6B] px-4 py-2 rounded hover:bg-[#d2ad83] transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
