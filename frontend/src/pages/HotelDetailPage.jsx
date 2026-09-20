import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getHotels } from "@/utils/api";
import { motion } from "framer-motion";

export default function HotelDetailPage() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [booked, setBooked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHotels().then((res) => {
      setHotel(res.data.find((h) => h.id == id));
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="bg-[#0E0307] min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#D4AF37] text-xs uppercase tracking-widest font-serif">Finding Palace Dossier...</p>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="bg-[#0E0307] min-h-screen flex flex-col items-center justify-center text-center p-6">
        <span className="text-4xl mb-3">🏨</span>
        <h2 className="font-serif text-2xl text-[#FFF7ED] mb-2">Hotel Not Found</h2>
        <Link to="/hotels" className="btn-primary text-xs mt-4">
          Return to Hotels
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#0E0307] min-h-screen text-[#FFF7ED] pb-24">
      <div className="max-w-5xl mx-auto px-4 md:px-8 pt-10">
        <Link
          to="/hotels"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#D6C7B8] hover:text-[#D4AF37] mb-6 transition-colors"
        >
          ← Back to All Stays
        </Link>

        {/* Hero Image Card */}
        <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden border border-[#48162A] shadow-2xl bg-[#240B15]">
          {hotel.image ? (
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = "none"; }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#300E1C] to-[#0E0307] flex items-center justify-center">
              <span className="text-6xl opacity-30">🏨</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0307] via-[#0E0307]/60 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-[#0E0307]/95 text-[#FDE047] border border-[#D4AF37]/40 backdrop-blur-md mb-2 inline-block shadow-lg">
                📍 {hotel.location}, {hotel.state}
              </span>
              <h1
                className="text-3xl sm:text-4xl font-serif font-bold text-[#FFF7ED] leading-tight"
                style={{ textShadow: "0 3px 20px rgba(0,0,0,0.95)" }}
              >
                {hotel.name}
              </h1>
            </div>

            <span className="text-sm font-semibold px-3 py-1 rounded-full bg-[#300E1C]/90 border border-[#D4AF37] text-[#FDE047] flex items-center gap-1 self-start sm:self-auto shadow-md">
              ⭐ {hotel.rating || "4.8"} / 5.0 Rating
            </span>
          </div>
        </div>

        {/* Content & Booking Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          {/* Left 2 Cols: Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-3xl bg-[#240B15] border border-[#48162A] shadow-lg">
              <h2 className="font-serif font-bold text-xl text-[#FFF7ED] mb-3">About This Heritage Property</h2>
              <p className="text-sm text-[#D6C7B8] leading-relaxed">
                {hotel.description || "A magnificent heritage property designed to reflect the timeless architectural and hospitable traditions of the region. Offering serene courtyards, traditional dining, and curated local experiences."}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#240B15] border border-[#48162A] shadow-lg">
              <h2 className="font-serif font-bold text-xl text-[#FFF7ED] mb-4">Heritage Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                {["🏛️ Palace Architecture", "🍛 Royal Thali Dining", "🧘 Dawn Yoga & Meditation", "🍵 Heritage Chai Lounge", "🧭 Guided Monument Walks", "🚗 Private Chauffeur"].map((a) => (
                  <div key={a} className="p-3 rounded-xl bg-[#0E0307] border border-[#48162A] text-[#D4AF37] font-medium">
                    {a}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Col: Booking Card */}
          <div className="p-6 rounded-3xl bg-[#240B15] border border-[#D4AF37]/40 shadow-2xl h-fit space-y-6">
            <div>
              <span className="text-xs text-[#A8988B] uppercase tracking-wider block">Tariff</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-serif font-bold text-[#FDE047]">
                  {hotel.price ? `₹${hotel.price}` : "₹4,500"}
                </span>
                <span className="text-xs text-[#A8988B]">/ night + taxes</span>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-[#48162A] text-xs text-[#D6C7B8]">
              <div className="flex justify-between">
                <span>Free cancellation</span>
                <span className="text-[#D4AF37] font-semibold">Yes, up to 48 hrs</span>
              </div>
              <div className="flex justify-between">
                <span>Check-in</span>
                <span>2:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Check-out</span>
                <span>11:00 AM</span>
              </div>
            </div>

            {booked ? (
              <div className="p-4 rounded-xl bg-[#300E1C] border border-[#D4AF37]/60 text-center shadow-lg">
                <span className="text-xl block mb-1">🎉</span>
                <p className="text-xs font-semibold text-[#FDE047]">Reservation Request Received!</p>
                <p className="text-[11px] text-[#D6C7B8] mt-1">Our royal concierge will contact you with booking confirmation.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={() => setBooked(true)}
                  className="w-full py-3.5 bg-gradient-to-r from-[#D4AF37] via-[#FBBF24] to-[#B8860B] text-[#0E0307] font-bold rounded-xl hover:brightness-110 transition-all text-xs tracking-wider uppercase shadow-lg shadow-[#D4AF37]/20"
                >
                  Reserve Heritage Stay ✨
                </button>
                {hotel.link && (
                  <a
                    href={hotel.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center w-full py-2.5 bg-[#0E0307] border border-[#48162A] hover:border-[#D4AF37] text-xs text-[#FFF7ED] rounded-xl transition-colors"
                  >
                    Visit Official Property Website ↗
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
