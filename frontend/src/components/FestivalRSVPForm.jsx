import React, { useState } from "react";

export default function FestivalRSVPForm({ festival }) {
  const [attending, setAttending] = useState(false);
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${name} RSVP'd ${attending ? "Yes" : "No"} for ${festival.name}`);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#F5EEDC] p-5 rounded shadow-lg mt-4">
      <h2 className="text-xl font-bold text-[#5A3E2B] mb-3">RSVP</h2>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="border p-2 w-full rounded mb-3"
      />
      <div className="mb-3">
        <label>
          <input type="checkbox" checked={attending} onChange={e => setAttending(e.target.checked)} />
          {' '}I will attend
        </label>
      </div>
      <button type="submit" className="bg-[#5A3E2B] text-white p-2 rounded w-full">
        RSVP
      </button>
    </form>
  );
}
