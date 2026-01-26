import { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom";
import { getStates, getHotels, getGuides, getAttractionsByState } from "@/utils/api";
import SectionRow from "@/components/SectionRow";

export default function StateDetails() {
  const { id } = useParams();
  const [stateData, setStateData] = useState(null);
  const [guides, setGuides] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [attractions, setAttractions] = useState([]); // ✅ Added

  useEffect(() => {
    // Fetch state details
    getStates().then((res) => {
      const found = res.data.find((s) => s.id == id);
      setStateData(found);

      // ✅ Fetch attractions using state name
      if (found) {
        getAttractionsByState(found.name).then((res) => setAttractions(res.data));
      }
    });

    getGuides().then((res) => setGuides(res.data));
    getHotels().then((res) => setHotels(res.data));
  }, [id]);

  if (!stateData) return <p className="text-center mt-10">Loading...</p>;

  // Filter guides and hotels for this state
  const stateGuides = guides.filter(g => g.state === stateData.name);
  const stateHotels = hotels.filter(h => h.state === stateData.name);

  return (
    <div className="bg-[#F5EEDC] min-h-screen p-5">

      <h1 className="text-4xl font-bold text-[#5A3E2B]">{stateData.name}</h1>
      <p className="text-lg text-[#2E1F13] mt-2">{stateData.description}</p>

      {/* ✅ Attractions section */}
      <SectionRow title="Top Attractions" data={attractions} type="attraction" />
      
      <SectionRow title="Local Guides" data={stateGuides} type="guide" />
      <SectionRow title="Hotels Nearby" data={stateHotels} type="hotel" />

    </div>
  );
}
