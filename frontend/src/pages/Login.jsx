import { useState } from "react";
import { loginUser } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      login(res.data.user);
      alert("Login Successful");
      window.location.href = "/";
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5EEDC]">
      <div className="w-[350px] bg-[#C19A6B] p-6 rounded-xl shadow-lg text-white">

        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-3 rounded bg-[#F5EEDC] text-black"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-3 rounded bg-[#F5EEDC] text-black"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button className="w-full bg-[#5A3E2B] py-2 rounded mt-2">
            Login
          </button>
        </form>

        <p className="text-center mt-3">
          No account? <a href="/signup" className="underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
