import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { getWishlist, removeFromWishlist } from "@/utils/api";

const TYPE_ICONS = {
  state: "🗺️",
  festival: "🎉",
  hotel: "🏨",
  guide: "🧭",
  experience: "✨",
};

const TYPE_LINKS = {
  state: (id) => `/states/${id}`,
  festival: (id) => `/festivals/${id}`,
  hotel: (id) => `/hotels/${id}`,
  guide: (id) => `/guides/${id}`,
};

export default function WishlistPage() {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (user) {
      getWishlist(user.id)
        .then(res => setWishlist(res.data))
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleRemove = async (item) => {
    try {
      await removeFromWishlist(user.id, item.itemId, item.itemType);
      setWishlist(prev => prev.filter(w => w.id !== item.id));
    } catch (err) {
      console.error("Failed to remove from wishlist");
    }
  };

  const filtered = filter === "all" ? wishlist : wishlist.filter(w => w.itemType === filter);
  const types = ["all", ...new Set(wishlist.map(w => w.itemType))];

  return (
    <div className="min-h-screen bg-[#0E0307] text-[#FFF7ED] pb-24">
      {/* Hero */}
      <div className="relative bg-gradient-to-b from-[#240B15]/90 via-[#19060E] to-[#0E0307] py-16 px-6 text-center border-b border-[#48162A]/60 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
          <span className="text-4xl mb-3 block">❤️</span>
          <h1 className="text-4xl font-serif font-bold text-[#FFF7ED] mb-2">
            My Cultural <span className="text-[#D4AF37]">Wishlist</span>
          </h1>
          <p className="text-[#D6C7B8] max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Your curated collection of states, festivals, heritage stays, and storytellers.
          </p>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Filter tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {types.map(t => (
            <button key={t} onClick={() => setFilter(t)}
              className={`px-4 py-2 rounded-full text-xs font-semibold capitalize transition-all ${filter === t
                ? "bg-gradient-to-r from-[#D4AF37] via-[#FBBF24] to-[#B8860B] text-[#0E0307] shadow-md shadow-[#D4AF37]/20 scale-105"
                : "bg-[#240B15] border border-[#48162A] text-[#D6C7B8] hover:border-[#D4AF37] hover:text-[#FFF7ED]"}`}>
              {t === "all" ? `All (${wishlist.length})` : `${TYPE_ICONS[t] || ""} ${t}s`}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 bg-[#240B15] border border-[#48162A] rounded-3xl p-8 shadow-xl">
            <p className="text-5xl mb-4">🫙</p>
            <p className="text-xl font-serif text-[#FFF7ED] mb-3 font-semibold">
              {wishlist.length === 0 ? "Your wishlist is empty." : "No items in this category."}
            </p>
            <p className="text-[#A8988B] mb-8 text-xs max-w-md mx-auto leading-relaxed">
              Explore states, festivals, and hotels — tap the ❤️ icon to save them here for your royal journey.
            </p>
            <Link to="/" className="btn-primary text-xs py-3 px-6 shadow-lg">
              Explore Now →
            </Link>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence>
              {filtered.map((item, i) => (
                <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: i * 0.05 }}
                  className="bg-[#240B15] border border-[#48162A] rounded-2xl overflow-hidden group hover:border-[#D4AF37] transition-all hover:shadow-xl hover:shadow-[#D4AF37]/10">
                  {/* Image */}
                  {item.image && (
                    <div className="h-36 overflow-hidden">
                      <img src={item.image} alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  {!item.image && (
                    <div className="h-24 bg-gradient-to-br from-[#300E1C] to-[#0E0307] flex items-center justify-center">
                      <span className="text-4xl">{TYPE_ICONS[item.itemType] || "✨"}</span>
                    </div>
                  )}

                  <div className="p-4">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-serif font-bold text-[#FFF7ED] group-hover:text-[#FDE047] transition-colors">{item.name}</h3>
                      <button onClick={() => handleRemove(item)}
                        className="text-[#A8988B] hover:text-[#BE123C] transition ml-2 flex-shrink-0" title="Remove">
                        ✕
                      </button>
                    </div>
                    <p className="text-xs text-[#D4AF37] mb-1 capitalize font-medium">{TYPE_ICONS[item.itemType]} {item.itemType}</p>
                    {item.state && <p className="text-xs text-[#D6C7B8]">📍 {item.state}</p>}
                    <p className="text-[10px] text-[#A8988B] mt-2">Saved {new Date(item.savedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p>

                    <Link to={TYPE_LINKS[item.itemType]?.(item.itemId) || "/"}
                      className="mt-3 block text-center bg-[#0E0307] hover:bg-[#300E1C] text-[#D4AF37] hover:text-[#FDE047] border border-[#48162A] hover:border-[#D4AF37] text-xs py-2 rounded-xl font-medium transition duration-200">
                      View Details →
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
