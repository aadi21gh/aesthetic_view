import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getGuides } from "@/utils/api";
import { motion } from "framer-motion";

export default function GuideDetailPage() {
  const { id } = useParams();
  const [guide, setGuide] = useState(null);
  const [booked, setBooked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGuides().then((res) => {
      setGuide(res.data.find((g) => g.id == id));
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="bg-[#0E0307] min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#D4AF37] text-xs uppercase tracking-widest font-serif">Connecting to Guide Dossier...</p>
        </div>
      </div>
    );
  }

  if (!guide) {
    return (
      <div className="bg-[#0E0307] min-h-screen flex flex-col items-center justify-center text-center p-6">
        <span className="text-4xl mb-3">🧭</span>
        <h2 className="font-serif text-2xl text-[#FFF7ED] mb-2">Guide Not Found</h2>
        <Link to="/guides" className="btn-primary text-xs mt-4">
          Return to Guides
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#0E0307] min-h-screen text-[#FFF7ED] pb-24">
      <div className="max-w-4xl mx-auto px-4 md:px-8 pt-10">
        <Link
          to="/guides"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#D6C7B8] hover:text-[#D4AF37] mb-6 transition-colors"
        >
          ← Back to All Guides
        </Link>

        {/* Guide Dossier Card */}
        <div className="p-8 rounded-3xl bg-[#240B15] border border-[#48162A] shadow-2xl space-y-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <div className="w-28 h-28 rounded-3xl overflow-hidden border-2 border-[#D4AF37] bg-[#0E0307] flex items-center justify-center text-5xl shadow-xl flex-shrink-0">
              {guide.image ? (
                <img
                  src={guide.image}
                  alt={guide.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              ) : (
                <span>🧭</span>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#300E1C] text-[#FDE047] border border-[#D4AF37]/50 shadow-sm">
                  Verified Local Expert
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#0E0307] border border-[#48162A] text-[#FDE047]">
                  ⭐ {guide.rating || "4.8"} Rating
                </span>
              </div>

              <h1 className="text-3xl font-serif font-bold text-[#FFF7ED]">
                {guide.name}
              </h1>

              <p className="text-xs text-[#D6C7B8] flex items-center justify-center sm:justify-start gap-1">
                <span className="text-[#D4AF37]">📍</span> Licensed Cultural Guide for {guide.state}
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#0E0307] border border-[#48162A] text-center">
            <div>
              <span className="text-[10px] text-[#A8988B] uppercase block">Experience</span>
              <span className="text-lg font-serif font-bold text-[#D4AF37]">{guide.experience || "8+"} Years</span>
            </div>
            <div>
              <span className="text-[10px] text-[#A8988B] uppercase block">Day Rate</span>
              <span className="text-lg font-serif font-bold text-[#FDE047]">₹{guide.price || "2,500"}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#A8988B] uppercase block">Languages</span>
              <span className="text-xs font-medium text-[#FFF7ED] mt-1 block">Hindi, English</span>
            </div>
            <div>
              <span className="text-[10px] text-[#A8988B] uppercase block">Tours Led</span>
              <span className="text-lg font-serif font-bold text-[#D4AF37]">120+</span>
            </div>
          </div>

          {/* Bio & Expertise */}
          <div className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-[#FFF7ED]">Cultural Specialization</h2>
            <p className="text-sm text-[#D6C7B8] leading-relaxed">
              {guide.expertise || "Specializes in fort & palace histories, ancient temple architectural symbolism, native folk dance traditions, and local heritage craft workshops."}
            </p>
          </div>

          {/* Actions */}
          <div className="pt-6 border-t border-[#48162A] flex flex-col sm:flex-row gap-3">
            {booked ? (
              <div className="w-full p-4 rounded-xl bg-[#300E1C] border border-[#D4AF37]/50 text-center shadow-lg">
                <span className="text-xl block mb-1">🎉</span>
                <p className="text-xs font-semibold text-[#FDE047]">Guide Booking Inquiry Sent!</p>
                <p className="text-[11px] text-[#D6C7B8] mt-1">We will connect you directly with {guide.name} via WhatsApp/phone.</p>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setBooked(true)}
                  className="flex-1 py-3.5 bg-gradient-to-r from-[#D4AF37] via-[#FBBF24] to-[#B8860B] text-[#0E0307] font-bold rounded-xl hover:brightness-110 transition-all text-xs tracking-wider uppercase shadow-lg shadow-[#D4AF37]/20"
                >
                  Book Guide Tour ✨
                </button>
                <a
                  href={`tel:${guide.phone || "9870001111"}`}
                  className="py-3.5 px-6 rounded-xl bg-[#0E0307] border border-[#48162A] hover:border-[#D4AF37] text-xs font-semibold text-[#FFF7ED] hover:text-[#D4AF37] flex items-center justify-center gap-2 transition-colors"
                >
                  <span>📞</span> Call Directly
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
