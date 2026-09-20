import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// ─── States ───────────────────────────────────────────────────────────────────
export const getStates = () => API.get("/states");
export const getStateById = (id) => API.get(`/states/${id}`);

// ─── Festivals ────────────────────────────────────────────────────────────────
export const getFestivals = () => API.get("/festivals");
export const getFestivalById = (id) => API.get(`/festivals/${id}`);

// ─── Hotels ───────────────────────────────────────────────────────────────────
export const getHotels = () => API.get("/hotels");
export const getHotelById = (id) => API.get(`/hotels/${id}`);

// ─── Guides ───────────────────────────────────────────────────────────────────
export const getGuides = () => API.get("/guides");
export const getGuideById = (id) => API.get(`/guides/${id}`);

// ─── Bookings ─────────────────────────────────────────────────────────────────
export const getBookings = () => API.get("/bookings");
export const getBookingsByUser = (userId) => API.get(`/bookings/user/${userId}`);
export const getBookingById = (id) => API.get(`/bookings/${id}`);
export const createBooking = (data) => API.post("/bookings", data);
export const updateBooking = (id, data) => API.patch(`/bookings/${id}`, data);
export const cancelBooking = (id) => API.delete(`/bookings/${id}`);

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/signup", data);

// ─── Attractions ──────────────────────────────────────────────────────────────
export const getAttractions = () => API.get("/attractions");
export const getAttractionsByState = (state) => API.get(`/attractions/${state}`);

// ─── Sanskriti AI Chat ────────────────────────────────────────────────────────
export const sendChatMessage = (message) => API.post("/chat", { message });

// ─── AI Trip Planner ──────────────────────────────────────────────────────────
export const generateItinerary = (params) => API.post("/ai/plan-journey", params);
export const getTravelVibes = () => API.get("/ai/vibes");

// ─── Wishlist ─────────────────────────────────────────────────────────────────
export const getWishlist = (userId) => API.get(`/wishlist/${userId}`);
export const addToWishlist = (data) => API.post("/wishlist", data);
export const removeFromWishlist = (userId, itemId, itemType) =>
  API.delete(`/wishlist/${userId}/${itemId}/${itemType}`);

export default API;
