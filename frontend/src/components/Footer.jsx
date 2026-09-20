import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#090205] border-t border-[#48162A] text-[#A8988B]">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FBBF24] via-[#D4AF37] to-[#B8860B] flex items-center justify-center text-sm font-extrabold text-[#0E0307] shadow-md shadow-[#D4AF37]/30">
                AV
              </div>
              <span className="text-xl font-serif font-bold text-[#FFF7ED]">
                Aesthetic<span className="text-[#D4AF37]">View</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#A8988B]">
              India's premier cultural travel companion. Curated festivals, heritage stays, and local storytellers — celebrating the living heritage of Bharat.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-[#FFF7ED] font-semibold mb-4 text-xs uppercase tracking-widest">Explore</h3>
            <ul className="space-y-2 text-xs">
              {[
                { to: "/states", label: "States of India" },
                { to: "/festivals", label: "Festivals" },
                { to: "/hotels", label: "Heritage Stays" },
                { to: "/guides", label: "Local Guides" },
                { to: "/calendar", label: "Cultural Calendar" },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-[#FDE047] transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Plan */}
          <div>
            <h3 className="text-[#FFF7ED] font-semibold mb-4 text-xs uppercase tracking-widest">Plan</h3>
            <ul className="space-y-2 text-xs">
              {[
                { to: "/ai-planner", label: "✨ AI Trip Planner" },
                { to: "/bookings", label: "My Bookings" },
                { to: "/wishlist", label: "My Wishlist" },
                { to: "/profile", label: "My Profile" },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-[#FDE047] transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / About */}
          <div>
            <h3 className="text-[#FFF7ED] font-semibold mb-4 text-xs uppercase tracking-widest">About</h3>
            <ul className="space-y-2 text-xs">
              <li><span className="hover:text-[#FDE047] cursor-pointer transition-colors">About Us</span></li>
              <li><span className="hover:text-[#FDE047] cursor-pointer transition-colors">Privacy Policy</span></li>
              <li><span className="hover:text-[#FDE047] cursor-pointer transition-colors">Terms of Service</span></li>
              <li><span className="hover:text-[#FDE047] cursor-pointer transition-colors">Contact Concierge</span></li>
            </ul>
            <div className="mt-4 flex gap-2">
              {["🐦", "📸", "📘"].map((icon, i) => (
                <button key={i} className="w-8 h-8 rounded-xl bg-[#240B15] border border-[#48162A] flex items-center justify-center text-xs hover:border-[#D4AF37] hover:text-[#FDE047] transition">
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#48162A]/60 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#A8988B]/70">
          <p>© {year} AestheticView. All rights reserved. Made with 🙏 for India.</p>
          <p className="flex items-center gap-1.5">
            Powered by <span className="text-[#D4AF37] font-medium">Sanskriti AI</span> • Royal Imperial Edition
          </p>
        </div>
      </div>
    </footer>
  );
}
