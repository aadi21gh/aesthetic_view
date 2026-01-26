import { useEffect, useState } from "react";
import { getBookings } from "@/utils/api";
import { Link } from "react-router-dom";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getBookings().then(res => setBookings(res.data));
  }, []);

  return (
    <div className="bg-[#F5EEDC] min-h-screen p-6">

      <h1 className="text-4xl font-bold text-[#5A3E2B]">My Bookings</h1>

      <div className="mt-5 space-y-4">
        {bookings.map(b => (
          <Link
            to={`/booking/${b.id}`}
            key={b.id}
            className="block bg-white p-4 shadow rounded-lg"
          >
            <p className="font-semibold">{b.type}</p>
            <p>Date: {b.date}</p>
            <p>Status: {b.status}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
