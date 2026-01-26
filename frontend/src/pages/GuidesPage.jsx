import { useEffect, useState } from "react";
import { getGuides } from "@/utils/api";
import GuideCard from "@/components/GuideCard";

export default function GuidesPage() {
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    getGuides().then(res => setGuides(res.data));
  }, []);

  return (
    <div className="bg-[#F5EEDC] min-h-screen p-6">
      <h1 className="text-4xl font-bold text-[#5A3E2B]">Guides</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
        {guides.map(g => (
          <GuideCard key={g.id} item={g} />
        ))}
      </div>
    </div>
  );
}
