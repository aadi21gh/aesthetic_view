import { useState } from "react";

export default function HotelBookingForm({ hotel, onSuccess }) {
  const [name, setName] = useState("");
  const [nights, setNights] = useState(1);
  const [date, setDate] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (onSuccess) onSuccess();
  };

  if (submitted) {
    return (
      <div className="p-6 rounded-2xl bg-[#240B15] border border-[#D4AF37] text-center space-y-2">
        <span className="text-3xl block">🎉</span>
        <h3 className="font-serif font-bold text-lg text-[#FFF7ED]">Stay Reserved!</h3>
        <p className="text-xs text-[#D6C7B8]">
          Booked {hotel?.name || "Heritage Hotel"} for {nights} night(s) for {name}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#240B15] border border-[#48162A] p-6 rounded-3xl space-y-4">
      <h2 className="font-serif font-bold text-xl text-[#FFF7ED]">Book Heritage Stay</h2>
      <p className="text-xs text-[#FDE047] font-semibold">{hotel?.name}</p>

      <div>
        <label className="text-xs text-[#D6C7B8] block mb-1">Your Full Name</label>
        <input
          type="text"
          placeholder="e.g. Aditya Sharma"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2.5 rounded-xl bg-[#0E0307] border border-[#48162A] text-[#FFF7ED] text-xs focus:border-[#D4AF37] focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-[#D6C7B8] block mb-1">Check-in Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-3 py-2.5 rounded-xl bg-[#0E0307] border border-[#48162A] text-[#FFF7ED] text-xs focus:border-[#D4AF37] focus:outline-none"
          />
        </div>
        <div>
          <label className="text-xs text-[#D6C7B8] block mb-1">Nights</label>
          <input
            type="number"
            min="1"
            max="30"
            value={nights}
            onChange={(e) => setNights(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-[#0E0307] border border-[#48162A] text-[#FFF7ED] text-xs focus:border-[#D4AF37] focus:outline-none"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-[#FDE047] via-[#D4AF37] to-[#B8860B] text-[#0E0307] font-bold text-xs tracking-wider uppercase rounded-xl hover:brightness-105 transition-all mt-2 shadow-lg shadow-[#D4AF37]/25"
      >
        Confirm Reservation ✨
      </button>
    </form>
  );
}
