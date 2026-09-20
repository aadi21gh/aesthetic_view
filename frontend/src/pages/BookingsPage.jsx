import { useEffect, useState } from "react";
import { getBookings } from "@/utils/api";
import { Link } from "react-router-dom";
import BookingCard from "@/components/BookingCard";
import { motion } from "framer-motion";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBookings()
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="bg-[#0E0307] min-h-screen text-[#FFF7ED] pb-24">
      {/* Header */}
      <div className="relative py-16 px-6 text-center border-b border-[#48162A]/60 bg-gradient-to-b from-[#240B15]/90 via-[#19060E] to-[#0E0307] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="inline-block bg-[#300E1C] border border-[#D4AF37]/40 text-[#FDE047] text-xs font-bold px-4 py-1.5 rounded-full mb-3 tracking-widest uppercase shadow-sm">
            Passports & Vouchers
          </span>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#FFF7ED] mb-2">
            My Cultural <span className="text-[#D4AF37]">Reservations</span>
          </h1>
          <p className="text-xs md:text-sm text-[#D6C7B8] leading-relaxed">
            Digital boarding passes for your heritage palace stays and royal guide tours.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-6 mt-10">
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-28 rounded-2xl bg-[#240B15] border border-[#48162A] animate-pulse" />
            ))}
          </div>
        ) : bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((b) => (
              <BookingCard key={b.id} booking={b} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-[#240B15] border border-[#48162A] rounded-3xl my-12 shadow-2xl">
            <span className="text-4xl block mb-3 opacity-60">🎟️</span>
            <h3 className="font-serif font-bold text-lg text-[#FFF7ED] mb-1">No Reservations Found</h3>
            <p className="text-xs text-[#D6C7B8] mb-6 max-w-sm mx-auto leading-relaxed">
              You haven't booked any heritage hotels or guides yet. Explore our curated destinations to start your journey.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/hotels" className="btn-primary text-xs">
                Explore Stays
              </Link>
              <Link to="/guides" className="btn-secondary text-xs">
                Find Local Guides
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
