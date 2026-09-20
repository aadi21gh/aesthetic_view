import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBookingById } from "@/utils/api";
import { motion } from "framer-motion";

const TYPE_ICONS = { hotel: "🏨", guide: "🧭", festival: "🎉", experience: "✨" };
const TYPE_COLORS = {
  hotel: "from-[#300E1C] via-[#48162A] to-[#240B15]",
  guide: "from-[#300E1C] via-[#48162A] to-[#240B15]",
  festival: "from-[#300E1C] via-[#48162A] to-[#240B15]",
  experience: "from-[#300E1C] via-[#48162A] to-[#240B15]",
};
const STATUS_STYLES = {
  confirmed: "bg-[#300E1C] text-[#FDE047] border border-[#D4AF37]/50",
  pending: "bg-[#300E1C] text-[#FBBF24] border border-[#D4AF37]/30",
  cancelled: "bg-[#300E1C] text-[#BE123C] border border-[#BE123C]/50",
};

export default function BookingDetailPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBookingById(id)
      .then(res => setBooking(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0E0307] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-[#0E0307] flex flex-col items-center justify-center text-center p-6">
        <p className="text-4xl mb-4">🎫</p>
        <p className="text-xl text-[#FFF7ED]">Booking not found.</p>
        <Link to="/bookings" className="mt-4 text-[#D4AF37] hover:underline">← Back to Bookings</Link>
      </div>
    );
  }

  const typeColor = TYPE_COLORS[booking.type] || TYPE_COLORS.experience;
  const typeIcon = TYPE_ICONS[booking.type] || "✨";

  return (
    <div className="min-h-screen bg-[#0E0307] py-10 px-4">
      <div className="max-w-2xl mx-auto">

        <Link to="/bookings" className="text-[#D6C7B8] hover:text-[#D4AF37] text-sm mb-6 inline-block transition font-medium">
          ← Back to My Bookings
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Digital Boarding Pass */}
          <div className="bg-[#240B15] border border-[#48162A] rounded-3xl overflow-hidden shadow-2xl">

            {/* Top stripe */}
            <div className={`bg-gradient-to-r ${typeColor} p-6 border-b border-[#48162A]`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[#D4AF37] text-xs uppercase tracking-widest mb-1 font-semibold">Imperial Digital Boarding Pass</p>
                  <h1 className="text-2xl font-serif font-bold text-[#FFF7ED]">
                    {typeIcon} {booking.itemName || booking.type}
                  </h1>
                  {booking.state && <p className="text-[#D6C7B8] text-sm mt-1">📍 {booking.state}</p>}
                </div>
                <span className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase shadow-sm ${STATUS_STYLES[booking.status] || STATUS_STYLES.confirmed}`}>
                  {booking.status || "Confirmed"}
                </span>
              </div>
            </div>

            {/* Dashed divider with circles */}
            <div className="relative flex items-center">
              <div className="w-6 h-6 rounded-full bg-[#0E0307] -ml-3 flex-shrink-0" />
              <div className="flex-1 border-t-2 border-dashed border-[#48162A] mx-2" />
              <div className="w-6 h-6 rounded-full bg-[#0E0307] -mr-3 flex-shrink-0" />
            </div>

            {/* Details grid */}
            <div className="p-6 grid grid-cols-2 gap-5">
              {[
                { label: "Booking ID", value: booking.voucherId || `#${booking.id}`, mono: true },
                { label: "Type", value: booking.type?.charAt(0).toUpperCase() + booking.type?.slice(1) },
                { label: "Check-in", value: booking.checkIn ? new Date(booking.checkIn).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "—" },
                { label: "Check-out", value: booking.checkOut ? new Date(booking.checkOut).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "—" },
                { label: "Guests", value: `${booking.guests || 1} Guest${booking.guests > 1 ? "s" : ""}` },
                { label: "Booked on", value: booking.bookedAt ? new Date(booking.bookedAt).toLocaleDateString("en-IN") : "—" },
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-xs text-[#A8988B] uppercase tracking-wider mb-1 font-medium">{item.label}</p>
                  <p className={`font-semibold text-[#FFF7ED] ${item.mono ? "font-mono text-[#FDE047] text-sm font-bold" : ""}`}>{item.value}</p>
                </div>
              ))}
            </div>

            {/* Dashed divider */}
            <div className="relative flex items-center">
              <div className="w-6 h-6 rounded-full bg-[#0E0307] -ml-3 flex-shrink-0" />
              <div className="flex-1 border-t-2 border-dashed border-[#48162A] mx-2" />
              <div className="w-6 h-6 rounded-full bg-[#0E0307] -mr-3 flex-shrink-0" />
            </div>

            {/* Pricing */}
            <div className="p-6">
              <h3 className="text-xs text-[#A8988B] uppercase tracking-widest mb-4 font-semibold">Price Breakdown</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-[#D6C7B8]">
                  <span>Base Tariff</span>
                  <span>₹{booking.price?.toLocaleString("en-IN") || "—"}</span>
                </div>
                <div className="flex justify-between text-sm text-[#D6C7B8]">
                  <span>GST & Luxury Cess (12%)</span>
                  <span>₹{booking.taxes?.toLocaleString("en-IN") || Math.round((booking.price || 0) * 0.12).toLocaleString("en-IN")}</span>
                </div>
                <div className="border-t border-[#48162A] pt-2 flex justify-between font-bold text-[#FDE047]">
                  <span>Total Settled</span>
                  <span className="text-lg">₹{booking.totalAmount?.toLocaleString("en-IN") || Math.round((booking.price || 0) * 1.12).toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            {/* QR Code placeholder */}
            <div className="px-6 pb-6 flex items-center gap-4">
              <div className="w-20 h-20 bg-[#0E0307] border-2 border-[#48162A] rounded-xl flex items-center justify-center flex-shrink-0 text-[#D4AF37]">
                <span className="text-3xl">▩</span>
              </div>
              <div>
                <p className="text-xs text-[#A8988B] uppercase tracking-wider font-medium">Voucher Code</p>
                <p className="font-mono font-bold text-[#FDE047] text-lg">{booking.voucherId || `AV-${booking.id}`}</p>
                <p className="text-xs text-[#D6C7B8] mt-0.5">Show this digital token at concierge for check-in</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button onClick={() => window.print()}
              className="flex-1 py-3 rounded-xl border border-[#48162A] text-[#FFF7ED] text-sm bg-[#240B15] hover:border-[#D4AF37] hover:text-[#FDE047] transition flex items-center justify-center gap-2 font-medium shadow-md">
              🖨️ Print Pass
            </button>
            <Link to="/bookings"
              className="flex-1 py-3 rounded-xl bg-[#240B15] border border-[#48162A] text-[#FFF7ED] text-sm hover:border-[#D4AF37] hover:text-[#FDE047] transition text-center flex items-center justify-center font-medium shadow-md">
              ← All Bookings
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
