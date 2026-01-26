import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBookings, getHotels, getFestivals } from "@/utils/api";

export default function BookingDetailPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [hotel, setHotel] = useState(null);
  const [festival, setFestival] = useState(null);

  useEffect(() => {
    getBookings().then(res => {
      const b = res.data.find(x => x.id == id);
      setBooking(b);
      if (b?.hotelId) getHotels().then(r => setHotel(r.data.find(h => h.id == b.hotelId)));
      if (b?.festivalId) getFestivals().then(r => setFestival(r.data.find(f => f.id == b.festivalId)));
    });
  }, [id]);

  if (!booking) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="bg-[#F5EEDC] min-h-screen p-6">
      <h1 className="text-4xl font-bold text-[#5A3E2B]">Booking Details</h1>

      <div className="bg-white shadow-lg p-5 rounded-xl mt-4">
        <h2 className="text-2xl font-semibold text-[#5A3E2B]">{booking.type}</h2>

        <p className="mt-2"><strong>Date:</strong> {booking.date}</p>
        <p><strong>Status:</strong> {booking.status}</p>
        <p><strong>Price:</strong> ₹{booking.amount}</p>

        {hotel && (
          <div className="mt-4">
            <h3 className="text-xl font-bold my-2">Hotel</h3>
            <p>{hotel.name}</p>
            <p>{hotel.address}</p>
          </div>
        )}

        {festival && (
          <div className="mt-4">
            <h3 className="text-xl font-bold my-2">Festival</h3>
            <p>{festival.name}</p>
            <p>{festival.month}</p>
          </div>
        )}
      </div>
    </div>
  );
}
