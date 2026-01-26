import { useEffect, useState } from "react";
import { getStates } from "@/utils/api";
import StateCard from "@/components/StateCard";

export default function StatePage() {
  const [states, setStates] = useState([]);

  useEffect(() => {
    getStates().then((res) => setStates(res.data));
  }, []);

  return (
    <div className="bg-[#F5EEDC] min-h-screen p-5">

      <h1 className="text-3xl font-bold text-[#5A3E2B] mb-4">
        Explore States
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {states.map((s) => (
          <StateCard key={s.id} item={s} />
        ))}
      </div>
    </div>
  );
}
