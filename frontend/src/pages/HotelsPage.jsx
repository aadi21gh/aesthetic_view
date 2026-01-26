import { useEffect, useState } from "react";
import { getHotels } from "@/utils/api";
import HotelCard from "@/components/HotelCard";

export default function HotelsPage() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    getHotels().then(res => setHotels(res.data));
  }, []);

  return (
    <div className="bg-[#F5EEDC] min-h-screen p-6">

      <h1 className="text-4xl font-bold text-[#5A3E2B]">Hotels</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
        {hotels.map(h => (
          <HotelCard key={h.id} item={h} />
        ))}
      </div>
    </div>
  );
}
