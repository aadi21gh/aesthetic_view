import { useState } from "react";
import { registerUser } from "@/utils/api";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(form);
      alert("Account created successfully!");
      window.location.href = "/login";
    } catch (err) {
      alert("Error creating account");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5EEDC]">

      <div className="w-[350px] bg-[#C19A6B] p-6 rounded-xl shadow-lg text-white">

        <h1 className="text-2xl font-bold mb-4 text-center">Create Account</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 mb-3 rounded bg-[#F5EEDC] text-black"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

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
            Sign Up
          </button>
        </form>

        <p className="text-center mt-3">
          Already have an account? <a href="/login" className="underline">Login</a>
        </p>
      </div>

    </div>
  );
}
