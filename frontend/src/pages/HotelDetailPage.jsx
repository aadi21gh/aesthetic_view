import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getHotels } from "@/utils/api";

export default function HotelDetailPage() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    getHotels().then(res =>
      setHotel(res.data.find(h => h.id == id))
    );
  }, [id]);

  if (!hotel) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="bg-[#F5EEDC] min-h-screen p-6">

      <img src={hotel.image} className="w-full h-64 object-cover rounded-xl" />

      <h1 className="text-4xl font-bold text-[#5A3E2B] mt-4">{hotel.name}</h1>

      <p className="mt-2 text-lg">{hotel.description}</p>

      <p className="mt-2"><strong>Address:</strong> {hotel.address}</p>
      <p><strong>State:</strong> {hotel.state}</p>
      <p><strong>Rating:</strong> ⭐{hotel.rating}</p>
      <p><strong>Price:</strong> ₹{hotel.price}/night</p>

      <button className="mt-5 bg-[#5A3E2B] text-white p-3 rounded-xl w-full">
        Book Hotel
      </button>
    </div>
  );
}
