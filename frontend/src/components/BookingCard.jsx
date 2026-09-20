import { Link } from "react-router-dom";

export default function BookingCard({ booking }) {
  const isConfirmed = booking.status?.toLowerCase() === "confirmed";

  return (
    <Link to={`/bookings/${booking.id}`} className="block group">
      <div className="bg-[#240B15] border border-[#48162A] hover:border-[#D4AF37] p-5 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-[#D4AF37]/20">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl p-2.5 rounded-xl bg-[#0E0307] border border-[#48162A]">
              {booking.type === "hotel" ? "🏨" : booking.type === "guide" ? "🧭" : "🎟️"}
            </span>
            <div>
              <p className="font-serif font-bold text-lg text-[#FFF7ED] group-hover:text-[#FDE047] transition-colors capitalize">
                {booking.itemTitle || `${booking.type} Reservation`}
              </p>
              <p className="text-xs text-[#A8988B] mt-0.5">
                📅 {booking.date || "Upcoming"}
              </p>
            </div>
          </div>

          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
              isConfirmed
                ? "bg-emerald-950/70 text-emerald-300 border-emerald-800"
                : "bg-[#300E1C] text-[#FDE047] border-[#D4AF37]/50"
            }`}
          >
            {booking.status?.toUpperCase() || "CONFIRMED"}
          </span>
        </div>

        <div className="mt-4 pt-3 border-t border-[#48162A] flex items-center justify-between text-xs">
          <span className="text-[#A8988B]">
            Reference: <span className="text-[#FDE047] font-mono font-semibold">AV-{booking.id?.toString().slice(-4) || "8821"}</span>
          </span>
          <span className="text-[#D4AF37] group-hover:text-[#FDE047] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-all">
            View Digital Pass →
          </span>
        </div>
      </div>
    </Link>
  );
}
