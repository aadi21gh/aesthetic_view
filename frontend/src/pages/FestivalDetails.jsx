import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFestivals, getGuides, getHotels } from "@/utils/api";
import SectionRow from "@/components/SectionRow";

export default function FestivalDetails() {
  const { id } = useParams();
  const [festival, setFestival] = useState(null);
  const [guides, setGuides] = useState([]);
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    getFestivals().then((res) => {
      const found = res.data.find(f => f.id == id);
      setFestival(found);
    });

    getGuides().then((res) => setGuides(res.data));
    getHotels().then((res) => setHotels(res.data));
  }, [id]);

  if (!festival) return <p className="text-center mt-10">Loading...</p>;

  // Filter guides and hotels for festival region
  const festivalGuides = guides.filter(g => g.state === festival.state);
  const festivalHotels = hotels.filter(h => h.state === festival.state);

  return (
    <div className="bg-[#F5EEDC] min-h-screen p-5">

      <h1 className="text-4xl font-bold text-[#5A3E2B]">{festival.name}</h1>
      <p className="text-lg text-[#2E1F13] mt-2">{festival.description}</p>

      {festival.attire && festival.attire.length > 0 && (
        <SectionRow title="Suggested Attires" data={[festival.attire]} type="attire" />
      )}

      {festival.images && festival.images.length > 0 && (
        <SectionRow title="Celebrations" data={festival.images} type="image" />
      )}

      <SectionRow title="Local Guides" data={festivalGuides} type="guide" />
      <SectionRow title="Hotels Nearby" data={festivalHotels} type="hotel" />

    </div>
  );
}
