import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// STATES
export const getStates = () => API.get("/states");

// FESTIVALS
export const getFestivals = () => API.get("/festivals");

// HOTELS
export const getHotels = () => API.get("/hotels");

// GUIDES
export const getGuides = () => API.get("/guides");

// BOOKINGS
export const getBookings = () => API.get("/bookings"); // ✅ Added

// AUTH
export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);

// ATTRACTIONS
export const getAttractions = () => API.get("/attractions"); // all attractions
export const getAttractionsByState = (state) => API.get(`/attractions/${state}`); // attractions by state

export default API;
