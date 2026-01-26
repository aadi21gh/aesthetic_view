import React from "react";

export default function AttractionCard({ item }) {
  return (
    <div className="bg-[#C19A6B] rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform">
      <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
      <div className="p-3 text-white">
        <h2 className="font-bold text-lg">{item.name}</h2>
        <p className="text-sm line-clamp-2">{item.description}</p>
      </div>
    </div>
  );
}
