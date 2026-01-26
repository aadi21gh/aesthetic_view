import { Link } from "react-router-dom";

export default function HotelCard({ item }) {
  return (
    <div className="bg-[#C19A6B] rounded-lg shadow-lg p-3 text-white hover:scale-105 transition-transform">
      <h2 className="font-bold text-lg">{item.name}</h2>
      <p>Location: {item.location}</p>

      <p>Price: {item.price ? `₹${item.price}` : "N/A"}</p>
      <p>Rating: {item.rating ? `${item.rating}/5` : "N/A"}</p>

      {/* Internal Navigation */}
      <Link
        to={`/hotels/${item.id}`}
        className="bg-[#5A3E2B] mt-3 px-3 py-1 rounded inline-block text-white mr-2"
      >
        View Details
      </Link>

      {/* External Booking Website */}
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="underline mt-2 inline-block"
      >
        Book Now
      </a>
    </div>
  );
}

