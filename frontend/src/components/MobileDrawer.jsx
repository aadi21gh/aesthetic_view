import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { to: "/", label: "🏠 Home" },
  { to: "/states", label: "🗺️ States" },
  { to: "/festivals", label: "🎉 Festivals" },
  { to: "/hotels", label: "🏨 Hotels" },
  { to: "/guides", label: "🧭 Guides" },
  { to: "/calendar", label: "📅 Cultural Calendar" },
  { to: "/ai-planner", label: "✨ AI Trip Planner" },
];

export default function MobileDrawer() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Hamburger Button - only on mobile */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-3.5 left-4 z-50 w-9 h-9 bg-[#240B15] border border-[#48162A] rounded-xl flex items-center justify-center text-[#FDE047] hover:border-[#D4AF37] transition shadow-lg shadow-black/60"
        aria-label="Open mobile menu"
      >
        ☰
      </button>

      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            className="fixed top-0 left-0 h-full w-72 bg-[#0E0307] border-r border-[#48162A] z-50 flex flex-col lg:hidden shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#48162A]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FBBF24] via-[#D4AF37] to-[#B8860B] flex items-center justify-center text-xs font-extrabold text-[#0E0307]">
                  AV
                </div>
                <span className="font-serif font-bold text-[#FFF7ED] text-base">
                  Aesthetic<span className="text-[#D4AF37]">View</span>
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full bg-[#240B15] border border-[#48162A] text-[#A8988B] hover:text-[#FFF7ED] text-sm flex items-center justify-center transition"
              >
                ✕
              </button>
            </div>

            {/* User info */}
            {user && (
              <div className="mx-4 mt-4 p-3 bg-[#240B15] border border-[#48162A] rounded-2xl flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FBBF24] via-[#D4AF37] to-[#B8860B] flex items-center justify-center font-bold text-xs text-[#0E0307]">
                  {user.name?.[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-[#FFF7ED] text-xs">{user.name}</p>
                  <p className="text-[10px] text-[#A8988B] truncate">{user.email}</p>
                </div>
              </div>
            )}

            {/* Links */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-hide">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`flex items-center px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive(link.to)
                      ? "bg-[#D4AF37]/15 text-[#FDE047] border border-[#D4AF37]/40 font-semibold shadow-sm"
                      : "text-[#D6C7B8] hover:bg-[#240B15] hover:text-[#FFF7ED]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {user && (
                <>
                  <div className="border-t border-[#48162A] my-3" />
                  {[
                    { to: "/profile", label: "👤 My Profile" },
                    { to: "/bookings", label: "🎫 My Bookings" },
                    { to: "/wishlist", label: "❤️ My Wishlist" },
                  ].map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className="flex items-center px-4 py-2.5 rounded-xl text-xs text-[#D6C7B8] hover:bg-[#240B15] hover:text-[#FDE047] transition"
                    >
                      {link.label}
                    </Link>
                  ))}
                </>
              )}
            </nav>

            {/* Auth button */}
            <div className="p-4 border-t border-[#48162A]">
              {user ? (
                <button
                  onClick={() => { logout(); setOpen(false); }}
                  className="w-full py-2.5 rounded-xl bg-[#240B15] border border-rose-900/60 text-rose-400 text-xs font-medium hover:bg-rose-950/30 transition"
                >
                  🚪 Logout
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="w-full py-2.5 rounded-xl border border-[#48162A] text-[#D6C7B8] text-xs font-medium text-center hover:bg-[#240B15] transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setOpen(false)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#FDE047] via-[#D4AF37] to-[#B8860B] text-[#0E0307] text-xs font-bold text-center hover:shadow-lg shadow-[#D4AF37]/25 transition"
                  >
                    Sign Up Free
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
