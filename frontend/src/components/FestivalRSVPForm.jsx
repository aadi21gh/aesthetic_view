import React, { useState } from "react";

export default function FestivalRSVPForm({ festival, onSuccess }) {
  const [attending, setAttending] = useState(true);
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (onSuccess) onSuccess();
  };

  if (submitted) {
    return (
      <div className="p-6 rounded-2xl bg-[#240B15] border border-[#D4AF37] text-center space-y-2">
        <span className="text-3xl block">🙏</span>
        <h3 className="font-serif font-bold text-lg text-[#FFF7ED]">RSVP Registered!</h3>
        <p className="text-xs text-[#D6C7B8]">
          Thank you, {name}! Your RSVP for {festival?.name} has been recorded.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#240B15] border border-[#48162A] p-6 rounded-3xl space-y-4">
      <h2 className="font-serif font-bold text-xl text-[#FFF7ED]">Cultural RSVP</h2>
      <p className="text-xs text-[#FDE047] font-semibold">{festival?.name} • {festival?.month}</p>

      <div>
        <label className="text-xs text-[#D6C7B8] block mb-1">Your Full Name</label>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2.5 rounded-xl bg-[#0E0307] border border-[#48162A] text-[#FFF7ED] text-xs focus:border-[#D4AF37] focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-2 p-3 rounded-xl bg-[#0E0307] border border-[#48162A]">
        <input
          type="checkbox"
          id="attendCheck"
          checked={attending}
          onChange={(e) => setAttending(e.target.checked)}
          className="accent-[#D4AF37] w-4 h-4 cursor-pointer"
        />
        <label htmlFor="attendCheck" className="text-xs text-[#FFF7ED] cursor-pointer">
          I plan to attend the festival celebrations in person
        </label>
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-[#FDE047] via-[#D4AF37] to-[#B8860B] text-[#0E0307] font-bold text-xs tracking-wider uppercase rounded-xl hover:brightness-105 transition-all mt-2 shadow-lg shadow-[#D4AF37]/25"
      >
        Submit RSVP ✨
      </button>
    </form>
  );
}
