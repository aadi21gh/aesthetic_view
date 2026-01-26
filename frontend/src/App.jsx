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

// 🔥 UPDATED ProtectedRoute with loading support
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="text-white flex items-center justify-center h-screen text-2xl">
        Loading...
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
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/states"
            element={
              <ProtectedRoute>
                <StatePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/states/:id"
            element={
              <ProtectedRoute>
                <StateDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/festivals"
            element={
              <ProtectedRoute>
                <FestivalPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/festivals/:id"
            element={
              <ProtectedRoute>
                <FestivalDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/hotels"
            element={
              <ProtectedRoute>
                <HotelsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hotels/:id"
            element={
              <ProtectedRoute>
                <HotelDetailPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/guides"
            element={
              <ProtectedRoute>
                <GuidesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/guides/:id"
            element={
              <ProtectedRoute>
                <GuideDetailPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <BookingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookings/:id"
            element={
              <ProtectedRoute>
                <BookingDetailPage />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer />
      </Router>
    </AuthProvider>
  );
}
