import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";

import Navbar from "@/components/Navbar";
import MobileDrawer from "@/components/MobileDrawer";
import Footer from "@/components/Footer";

// Pages
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import StatePage from "@/pages/StatePage";
import StateDetails from "@/pages/StateDetails";
import FestivalPage from "@/pages/FestivalPage";
import FestivalDetails from "@/pages/FestivalDetails";
import HotelsPage from "@/pages/HotelsPage";
import HotelDetailPage from "@/pages/HotelDetailPage";
import GuidesPage from "@/pages/GuidesPage";
import GuideDetailPage from "@/pages/GuideDetailPage";
import ProfilePage from "@/pages/ProfilePage";
import BookingsPage from "@/pages/BookingsPage";
import BookingDetailPage from "@/pages/BookingDetailPage";
import AiTripPlanner from "@/pages/AiTripPlanner";
import CulturalCalendar from "@/pages/CulturalCalendar";
import WishlistPage from "@/pages/WishlistPage";

// ProtectedRoute: only blocks booking & profile pages
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0E0307] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#D4AF37] font-serif font-medium tracking-widest text-sm uppercase">Entering Sanskriti Sanctuary...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <MobileDrawer />

        <Routes>
          {/* ── Public Routes (no login required) ── */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Discovery — open to all (guest + logged-in) */}
          <Route path="/" element={<Home />} />
          <Route path="/states" element={<StatePage />} />
          <Route path="/states/:id" element={<StateDetails />} />
          <Route path="/festivals" element={<FestivalPage />} />
          <Route path="/festivals/:id" element={<FestivalDetails />} />
          <Route path="/hotels" element={<HotelsPage />} />
          <Route path="/hotels/:id" element={<HotelDetailPage />} />
          <Route path="/guides" element={<GuidesPage />} />
          <Route path="/guides/:id" element={<GuideDetailPage />} />
          <Route path="/ai-planner" element={<AiTripPlanner />} />
          <Route path="/calendar" element={<CulturalCalendar />} />

          {/* ── Protected Routes (login required) ── */}
          <Route
            path="/profile"
            element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}
          />
          <Route
            path="/bookings"
            element={<ProtectedRoute><BookingsPage /></ProtectedRoute>}
          />
          <Route
            path="/bookings/:id"
            element={<ProtectedRoute><BookingDetailPage /></ProtectedRoute>}
          />
          <Route
            path="/wishlist"
            element={<ProtectedRoute><WishlistPage /></ProtectedRoute>}
          />
        </Routes>

        <Footer />
      </Router>
    </AuthProvider>
  );
}
