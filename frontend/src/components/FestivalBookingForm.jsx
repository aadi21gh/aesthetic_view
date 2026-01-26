import React, { useState } from "react";

export default function FestivalBookingForm({ festival }) {
  const [name, setName] = useState("");
  const [people, setPeople] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Booked ${people} tickets for ${festival.name} by ${name}`);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#F5EEDC] p-5 rounded shadow-lg">
      <h2 className="text-xl font-bold text-[#5A3E2B] mb-3">Book Festival</h2>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="border p-2 w-full rounded mb-3"
      />
      <input
        type="number"
        min="1"
        value={people}
        onChange={e => setPeople(e.target.value)}
        className="border p-2 w-full rounded mb-3"
      />
      <button type="submit" className="bg-[#5A3E2B] text-white p-2 rounded w-full">
        Book
      </button>
    </form>
  );
}
