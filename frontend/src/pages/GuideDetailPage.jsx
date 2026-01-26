import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getGuides } from "@/utils/api";

export default function GuideDetailPage() {
  const { id } = useParams();
  const [guide, setGuide] = useState(null);

  useEffect(() => {
    getGuides().then(res => {
      setGuide(res.data.find(g => g.id == id));
    });
  }, [id]);

  if (!guide) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="bg-[#F5EEDC] min-h-screen p-6">
      <img src={guide.image} className="w-full h-64 object-cover rounded-xl" />

      <h1 className="text-4xl font-bold text-[#5A3E2B] mt-4">{guide.name}</h1>
      <p className="text-lg">{guide.description}</p>

      <p className="mt-3"><strong>State:</strong> {guide.state}</p>
      <p><strong>Experience:</strong> {guide.experience} years</p>
      <p><strong>Languages:</strong> {guide.languages.join(", ")}</p>
      <p><strong>Price:</strong> ₹{guide.price}/day</p>

      <button className="mt-5 bg-[#5A3E2B] text-white p-3 rounded-xl w-full">
        Book Guide
      </button>
    </div>
  );
}
