export default function GuideCard({ item }) {
  return (
    <div className="bg-[#8B5E3C] rounded-lg shadow-lg p-3 text-white hover:scale-105 transition-transform">
      <h2 className="font-bold text-lg">{item.name}</h2>
      <p>Expertise: {item.expertise}</p>
      <p>Region: {item.state}</p>
      <a href={`tel:${item.contact}`} className="underline mt-2 inline-block">
        Contact
      </a>
    </div>
  );
}
