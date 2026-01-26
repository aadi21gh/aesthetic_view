import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user, logout } = useAuth();

  if (!user) return <p className="text-center mt-10">Login required</p>;

  return (
    <div className="bg-[#F5EEDC] min-h-screen p-6">

      <h1 className="text-4xl font-bold text-[#5A3E2B]">My Profile</h1>

      <div className="bg-white p-5 rounded-xl mt-5 shadow-lg">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>

        <button
          onClick={logout}
          className="bg-red-600 text-white p-3 mt-5 w-full rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
