import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await loginUser(form);
      login(res.data.user);
      window.location.href = "/";
    } catch {
      setError("Invalid email or password. Please try again.");
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
          <h1 className="text-3xl font-serif font-bold text-[#FFF7ED] mb-1">Welcome back</h1>
          <p className="text-[#D6C7B8] text-sm">Sign in to continue your royal cultural journey</p>
        </div>

        <div className="bg-[#240B15] border border-[#48162A] rounded-3xl p-8 shadow-2xl">
          {error && (
            <div className="bg-[#300E1C] border border-[#BE123C] text-[#FDE047] text-sm rounded-xl p-3 mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-[#D6C7B8] uppercase tracking-wider mb-2 font-medium">Email</label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="w-full bg-[#0E0307] border border-[#48162A] rounded-xl px-4 py-3 text-[#FFF7ED] placeholder-[#A8988B] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/40 transition text-sm shadow-inner"
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs text-[#D6C7B8] uppercase tracking-wider mb-2 font-medium">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full bg-[#0E0307] border border-[#48162A] rounded-xl px-4 py-3 text-[#FFF7ED] placeholder-[#A8988B] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/40 transition text-sm shadow-inner"
                onChange={e => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#FBBF24] to-[#B8860B] text-[#0E0307] font-bold hover:brightness-110 shadow-lg shadow-[#D4AF37]/25 transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2 uppercase tracking-wider text-xs"
            >
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>

          <p className="text-center text-sm text-[#D6C7B8] mt-6">
            New to AestheticView?{" "}
            <Link to="/signup" className="text-[#D4AF37] hover:underline font-semibold">Create account</Link>
          </p>
        </div>

        <p className="text-center text-xs text-[#A8988B] mt-4">
          By continuing, you agree to our Terms of Cultural Hospitality.
        </p>
      </motion.div>
    </div>
  );
}
