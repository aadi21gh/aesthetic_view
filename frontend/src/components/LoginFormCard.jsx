import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LoginFormCard() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#240B15] border border-[#48162A] p-8 rounded-3xl shadow-2xl w-full max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-serif font-bold text-[#FFF7ED] mb-4 text-center">Voyager Sign In</h2>
      <div>
        <label className="text-xs text-[#D6C7B8] block mb-1">Email Address</label>
        <input
          type="email"
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2.5 rounded-xl bg-[#0E0307] border border-[#48162A] text-[#FFF7ED] text-xs focus:border-[#D4AF37] focus:outline-none"
        />
      </div>
      <div>
        <label className="text-xs text-[#D6C7B8] block mb-1">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2.5 rounded-xl bg-[#0E0307] border border-[#48162A] text-[#FFF7ED] text-xs focus:border-[#D4AF37] focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-[#FDE047] via-[#D4AF37] to-[#B8860B] text-[#0E0307] font-bold text-xs tracking-wider uppercase rounded-xl hover:brightness-105 transition-all mt-2 shadow-lg shadow-[#D4AF37]/25"
      >
        Sign In ✨
      </button>
    </form>
  );
}
