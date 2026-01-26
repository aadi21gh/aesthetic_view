import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ festivals, states }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const festival = festivals.find(f => f.name.toLowerCase() === query.toLowerCase());
    if (festival) {
      navigate(`/festival/${festival.id}`);
      return;
    }

    const state = states.find(s => s.name.toLowerCase() === query.toLowerCase());
    if (state) {
      navigate(`/state/${state.id}`);
      return;
    }

    alert("No matching festival or state found!");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search festivals or states"
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        className="border p-2 rounded w-full"
      />
      <button onClick={handleSearch} className="bg-brown text-white p-2 rounded ml-2">
        Search
      </button>
    </div>
  );
}
