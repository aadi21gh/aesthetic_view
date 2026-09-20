import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "@/utils/api";
import { motion } from "framer-motion";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await registerUser(form);
      window.location.href = "/login";
    } catch (err) {
      setError(err.response?.data?.message || "Error creating account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0E0307] flex items-center justify-center px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] via-[#FBBF24] to-[#B8860B] flex items-center justify-center font-bold text-[#0E0307] shadow-lg shadow-[#D4AF37]/20">AV</div>
            <span className="text-2xl font-serif font-bold text-[#FFF7ED] tracking-tight">
              Aesthetic<span className="text-[#D4AF37]">View</span>
            </span>
          </Link>
          <h1 className="text-3xl font-serif font-bold text-[#FFF7ED] mb-1">Start your journey</h1>
          <p className="text-[#D6C7B8] text-sm">Join India's premiere royal cultural travel network</p>
        </div>

        <div className="bg-[#240B15] border border-[#48162A] rounded-3xl p-8 shadow-2xl">
          {error && (
            <div className="bg-[#300E1C] border border-[#BE123C] text-[#FDE047] text-sm rounded-xl p-3 mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { field: "name", type: "text", label: "Full Name", placeholder: "Aditya Kumar" },
              { field: "email", type: "email", label: "Email", placeholder: "you@example.com" },
              { field: "phone", type: "tel", label: "Phone (optional)", placeholder: "9876543210" },
              { field: "password", type: "password", label: "Password", placeholder: "Min. 6 characters" },
            ].map(({ field, type, label, placeholder }) => (
              <div key={field}>
                <label className="block text-xs text-[#D6C7B8] uppercase tracking-wider mb-2 font-medium">{label}</label>
                <input
                  type={type}
                  placeholder={placeholder}
                  required={field !== "phone"}
                  className="w-full bg-[#0E0307] border border-[#48162A] rounded-xl px-4 py-3 text-[#FFF7ED] placeholder-[#A8988B] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/40 transition text-sm shadow-inner"
                  onChange={e => setForm({ ...form, [field]: e.target.value })}
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#FBBF24] to-[#B8860B] text-[#0E0307] font-bold hover:brightness-110 shadow-lg shadow-[#D4AF37]/25 transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2 uppercase tracking-wider text-xs"
            >
              {loading ? "Creating account..." : "Create Account →"}
            </button>
          </form>

          <p className="text-center text-sm text-[#D6C7B8] mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-[#D4AF37] hover:underline font-semibold">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
