import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="bg-[#0E0307] min-h-screen flex flex-col items-center justify-center text-center p-6">
        <span className="text-4xl mb-3">🔒</span>
        <h2 className="text-2xl font-serif font-bold text-[#FFF7ED] mb-2">Authentication Required</h2>
        <p className="text-xs text-[#D6C7B8] mb-4">Please log in to access your royal cultural passport and bookings.</p>
        <Link to="/login" className="btn-primary text-xs">
          Sign In
        </Link>
      </div>
    );
  }

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "AV";

  return (
    <div className="bg-[#0E0307] min-h-screen text-[#FFF7ED] pb-24">
      <div className="max-w-2xl mx-auto px-4 md:px-6 pt-12">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-3xl bg-[#240B15] border border-[#48162A] shadow-2xl space-y-6"
        >
          {/* Top Row: Monogram + Name */}
          <div className="flex items-center gap-5 pb-6 border-b border-[#48162A]">
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#D4AF37] via-[#FBBF24] to-[#B8860B] text-[#0E0307] font-bold text-2xl sm:text-3xl flex items-center justify-center shadow-lg shadow-[#D4AF37]/20 flex-shrink-0">
              {initials}
            </div>
            <div>
              <span className="text-[10px] text-[#FDE047] uppercase tracking-widest font-bold block mb-0.5">
                Heritage Imperial Passport
              </span>
              <h1 className="font-serif font-bold text-2xl text-[#FFF7ED]">
                {user.name}
              </h1>
              <p className="text-xs text-[#D6C7B8] mt-0.5">{user.email}</p>
            </div>
          </div>

          {/* Quick Actions Links */}
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/bookings"
              className="p-4 rounded-2xl bg-[#300E1C] border border-[#48162A] hover:border-[#D4AF37] transition-all flex items-center gap-3 group shadow-sm"
            >
              <span className="text-2xl p-2 rounded-xl bg-[#0E0307] border border-[#48162A]">🎟️</span>
              <div>
                <span className="font-bold text-sm text-[#FFF7ED] group-hover:text-[#FDE047] transition-colors block">
                  My Bookings
                </span>
                <span className="text-[11px] text-[#A8988B]">View digital passes</span>
              </div>
            </Link>

            <Link
              to="/wishlist"
              className="p-4 rounded-2xl bg-[#300E1C] border border-[#48162A] hover:border-[#D4AF37] transition-all flex items-center gap-3 group shadow-sm"
            >
              <span className="text-2xl p-2 rounded-xl bg-[#0E0307] border border-[#48162A]">🏺</span>
              <div>
                <span className="font-bold text-sm text-[#FFF7ED] group-hover:text-[#FDE047] transition-colors block">
                  My Wishlist
                </span>
                <span className="text-[11px] text-[#A8988B]">Saved cultural places</span>
              </div>
            </Link>
          </div>

          {/* Account Details Box */}
          <div className="p-5 rounded-2xl bg-[#0E0307] border border-[#48162A] space-y-3 text-xs">
            <div className="flex justify-between items-center text-[#D6C7B8]">
              <span>Membership Tier</span>
              <span className="text-[#FDE047] font-semibold">Crown Royal Patron (Complimentary)</span>
            </div>
            <div className="flex justify-between items-center text-[#D6C7B8]">
              <span>Curated Journey Plans</span>
              <span className="text-[#D4AF37] font-semibold">Unlimited Access</span>
            </div>
            <div className="flex justify-between items-center text-[#D6C7B8]">
              <span>Concierge Status</span>
              <span className="text-[#D4AF37] font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" /> Sanskriti AI Active
              </span>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="w-full py-3 rounded-xl bg-[#300E1C] border border-[#BE123C]/50 hover:bg-[#BE123C]/20 text-[#BE123C] text-xs font-semibold tracking-wider uppercase transition-colors"
          >
            Sign Out of Account
          </button>
        </motion.div>
      </div>
    </div>
  );
}
