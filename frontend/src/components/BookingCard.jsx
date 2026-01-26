import { Link } from "react-router-dom";

export default function BookingCard({ booking }) {
  return (
    <Link to={`/booking/${booking.id}`}>
      <div className="bg-[#8B5E3C] p-4 rounded-lg text-white hover:scale-105 transition-transform">
        <p className="font-bold">{booking.type}</p>
        <p>Date: {booking.date}</p>
        <p>Status: {booking.status}</p>
      </div>
    </Link>
  );
}
