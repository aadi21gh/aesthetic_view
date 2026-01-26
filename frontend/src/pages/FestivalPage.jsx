import { useEffect, useState } from "react";
import { getFestivals } from "@/utils/api";
import FestivalCard from "@/components/FestivalCard";

export default function FestivalPage() {
  const [festivals, setFestivals] = useState([]);

  useEffect(() => {
    getFestivals().then((res) => setFestivals(res.data));
  }, []);

  return (
    <div className="bg-[#F5EEDC] min-h-screen p-5">

      <h1 className="text-3xl font-bold text-[#5A3E2B] mb-4">
        Indian Festivals
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {festivals.map((f) => (
          <FestivalCard key={f.id} item={f} />
        ))}
      </div>
    </div>
  );
}
