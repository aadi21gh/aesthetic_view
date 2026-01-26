export default function PostarCard({ item }) {
  return (
    <div className="bg-[#5A3E2B] text-white rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform">
      <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
      <div className="p-3">
        <h2 className="font-bold text-lg">{item.title}</h2>
      </div>
    </div>
  );
}
