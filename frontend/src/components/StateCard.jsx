import { Link } from "react-router-dom";

export default function StateCard({ item }) {
  return (
    <Link to={`/states/${item.id}`}>
      <div
        className="bg-[#C19A6B] rounded-xl shadow-md p-4 
                   hover:scale-105 transition-transform 
                   w-48 sm:w-56 h-40 sm:h-44
                   flex flex-col justify-between"
      >
        <h2 className="font-bold text-lg text-black leading-tight">
          {item.name}
        </h2>

        <p className="text-sm text-black/90 line-clamp-3">
          {item.description}
        </p>
      </div>
    </Link>
  );
}
