import PostarCard from "./PostarCard";

export default function PosterRow({ title, data }) {
  return (
    <div className="my-6">
      <h2 className="text-xl font-bold text-[#5A3E2B] mb-2">{title}</h2>
      <div className="flex overflow-x-auto gap-4 scrollbar-hide">
        {data.map((item, idx) => <PostarCard key={idx} item={item} />)}
      </div>
    </div>
  );
}
