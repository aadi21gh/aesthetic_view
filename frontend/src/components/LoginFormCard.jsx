import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LoginFormCard() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#F5EEDC] p-6 rounded-xl shadow-lg w-full max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-[#5A3E2B] mb-4">Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}
        className="border p-2 w-full rounded mb-3"/>
      <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}
        className="border p-2 w-full rounded mb-3"/>
      <button type="submit" className="bg-[#5A3E2B] text-white p-3 w-full rounded">Login</button>
    </form>
  );
}
