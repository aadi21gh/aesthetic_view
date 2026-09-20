// backend/routes/aiPlanner.js — AI Cultural Journey Planner
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// Load cultural data for context
const festivals = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/festivals.json"), "utf-8"));
const states = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/states.json"), "utf-8"));
const hotels = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/hotels.json"), "utf-8"));
const guides = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/guides.json"), "utf-8"));

// ─── Cultural Vibe Personas ───────────────────────────────────────────────────
const vibePersonas = {
  "Royal Heritage": {
    icon: "👑",
    description: "Majestic forts, palace stays, and royal cuisine — travel like royalty",
    recommendedStates: ["Rajasthan", "Madhya Pradesh", "Uttar Pradesh"],
    activities: ["Fort & palace tours", "Heritage walks", "Royal thali dining", "Elephant safaris", "Camel rides at sunset"],
    stays: ["Heritage havelis", "Palace hotels", "Fort stays"],
  },
  "Spiritual & Devotional": {
    icon: "🛕",
    description: "Sacred temples, dawn aartis, and transformative spiritual experiences",
    recommendedStates: ["Uttar Pradesh", "Uttarakhand", "Tamil Nadu", "Odisha"],
    activities: ["Ganga Aarti at Varanasi", "Temple processions", "Meditation retreats", "Pilgrim trails", "Sacred river baths"],
    stays: ["Ashrams", "Dharamshalas", "Boutique heritage stays"],
  },
  "Tribal & Folk Arts": {
    icon: "🎨",
    description: "Living tribal traditions, folk art villages, and authentic community experiences",
    recommendedStates: ["Odisha", "Chhattisgarh", "Nagaland", "Jharkhand", "Madhya Pradesh"],
    activities: ["Tribal village stays", "Warli & Madhubani painting workshops", "Folk dance performances", "Weekly tribal haats", "Bamboo craft sessions"],
    stays: ["Eco-lodges", "Tribal homestays", "Forest guesthouses"],
  },
  "Culinary & Spice Trails": {
    icon: "🍛",
    description: "India's most iconic regional flavours, market trails, and kitchen immersions",
    recommendedStates: ["Kerala", "Punjab", "Rajasthan", "Bengal", "Goa"],
    activities: ["Spice plantation tours", "Home cooking classes", "Street food walks", "Food market tours", "Farm-to-table experiences"],
    stays: ["Plantation bungalows", "Farmhouse stays", "City boutique hotels"],
  },
  "Nature & Slow Travel": {
    icon: "🌿",
    description: "Misty hills, river valleys, and rejuvenating nature immersions at a slow pace",
    recommendedStates: ["Meghalaya", "Coorg", "Himachal Pradesh", "Uttarakhand", "Sikkim"],
    activities: ["Living root bridge treks", "Tea garden walks", "River kayaking", "Waterfall hikes", "Sunrise viewpoints"],
    stays: ["Eco-resorts", "Tea estate bungalows", "Mountain homestays"],
  },
  "Coastal & Maritime": {
    icon: "🌊",
    description: "Fishing villages, colonial ports, seafood feasts, and pristine coastal culture",
    recommendedStates: ["Goa", "Kerala", "Tamil Nadu", "Andaman", "Lakshadweep"],
    activities: ["Backwater houseboat cruises", "Fishing village tours", "Colonial port walks", "Beach yoga", "Diving & snorkelling"],
    stays: ["Beach shacks", "Backwater houseboats", "Coastal cottages"],
  },
};

// ─── Month-to-Festival Mapping ─────────────────────────────────────────────────
const monthFestivals = {
  January: ["Pongal", "Makar Sankranti", "Lohri", "Republic Day Parade"],
  February: ["Vasant Panchami", "Surajkund Craft Mela"],
  March: ["Holi", "Shivratri", "Dol Purnima"],
  April: ["Baisakhi", "Vishu", "Bihu", "Ram Navami"],
  May: ["Buddha Purnima", "Thrissur Pooram"],
  June: ["Rath Yatra (Puri)", "Hemis Festival"],
  July: ["Teej", "Nag Panchami", "Guru Purnima"],
  August: ["Independence Day", "Onam", "Janmashtami", "Raksha Bandhan"],
  September: ["Ganesh Chaturthi", "Dussehra", "Navratri"],
  October: ["Dussehra", "Navratri", "Diwali", "Pushkar Fair"],
  November: ["Diwali", "Dev Deepawali", "Pushkar Camel Fair", "Chhath Puja"],
  December: ["Hornbill Festival", "Christmas", "Kolkata Film Festival", "Sunburn Goa"],
};

// ─── Itinerary Generator (Knowledge-Base Fallback) ────────────────────────────
function generateItinerary({ state, vibe, days, month, budget }) {
  const persona = vibePersonas[vibe] || vibePersonas["Royal Heritage"];
  const relevantFestivals = festivals.filter(f =>
    f.state === state || f.state === "All India"
  ).slice(0, 3);
  const stateData = states.find(s => s.name === state) || { name: state };
  const relevantGuides = guides.filter(g => g.state === state).slice(0, 2);
  const relevantHotels = hotels.filter(h => h.state === state).slice(0, 2);
  const currentMonthFestivals = monthFestivals[month] || [];

  const budgetTier = budget === "budget"
    ? { label: "Budget-Friendly", range: "₹1,500–₹3,000/night", transport: "State buses, shared autos, second-class trains" }
    : budget === "mid"
    ? { label: "Mid-Range", range: "₹3,000–₹8,000/night", transport: "Private taxis, AC trains, Ola/Uber" }
    : { label: "Luxury", range: "₹8,000–₹25,000/night", transport: "Private chauffeur-driven cars, first-class trains, charter flights" };

  const itineraryDays = [];
  for (let i = 1; i <= Math.min(days, 7); i++) {
    const activities = persona.activities;
    const activity1 = activities[(i * 2 - 2) % activities.length];
    const activity2 = activities[(i * 2 - 1) % activities.length];

    let dayPlan = {
      day: i,
      theme: i === 1 ? "Arrival & Orientation" : i === days ? "Farewell & Departure" : `Cultural Immersion Day ${i}`,
      morning: i === 1
        ? `Arrive in ${state}. Check into your ${budgetTier.label.toLowerCase()} ${persona.stays[0]}. Freshen up and take a slow neighbourhood walk to absorb the local vibe.`
        : `Start with an early breakfast of authentic local flavours. Head to ${activity1} — the best experiences happen before the crowds arrive.`,
      afternoon: i === days
        ? `Final morning exploration and souvenir shopping at the local market. Pick up regional handicrafts as memories.`
        : `Enjoy a regional thali lunch at a family-run eatery. Afternoon: ${activity2}. Take time to speak with locals and hear their stories.`,
      evening: i === days
        ? `Head to the airport/station. Your cultural journey ends, but the memories last forever. 🙏`
        : relevantFestivals.length > 0 && i <= relevantFestivals.length
        ? `Evening: Attend the **${relevantFestivals[i - 1]?.name || "local cultural"}** event if in season. Otherwise, witness the evening market buzz and street food scene.`
        : `Golden hour sunset views, then dinner at a curated local restaurant. Wind down with masala chai and conversation.`,
      tip: i === 1
        ? `📍 Pro tip: Book a local guide for your first day orientation — they unlock hidden stories no guidebook has.`
        : i % 2 === 0
        ? `🎒 Pack light for today — leave valuables at the stay.`
        : `📸 The best photography light is at dawn (5:30–7:00 AM) and golden hour (5:00–6:30 PM).`,
    };
    itineraryDays.push(dayPlan);
  }

  return {
    overview: {
      destination: state,
      vibe: `${persona.icon} ${vibe}`,
      duration: `${days} Days / ${days - 1} Nights`,
      month,
      budget: budgetTier.label,
      budgetRange: budgetTier.range,
      bestFor: persona.description,
    },
    highlightFestivals: currentMonthFestivals.slice(0, 3),
    recommendedStays: relevantHotels.length > 0
      ? relevantHotels.map(h => ({ name: h.name, type: "Heritage Stay", price: h.price }))
      : persona.stays.map(s => ({ name: s, type: "Curated Category", price: budgetTier.range })),
    recommendedGuides: relevantGuides.length > 0
      ? relevantGuides.map(g => ({ name: g.name, specialty: g.specialty || g.expertise || "Cultural History" }))
      : [{ name: "Local Expert Guide", specialty: vibe }],
    transport: budgetTier.transport,
    culturalTips: [
      "🛕 Always remove footwear before entering temples and homes.",
      "📸 Ask permission before photographing locals or religious ceremonies.",
      "🙏 Greet with 'Namaste' — it opens doors and warms hearts.",
      `🌡️ ${month} weather tip: ${["December", "January", "February"].includes(month) ? "Pack light woolens for evenings." : ["March", "April", "May"].includes(month) ? "Carry sunscreen SPF 50+ and stay hydrated." : "Light cotton works best — carry an umbrella."}`,
    ],
    itinerary: itineraryDays,
    packingList: ["Comfortable walking shoes", "Modest clothing (kurta / salwar)", "Sunscreen & lip balm", "Reusable water bottle", "Cash (many heritage sites are cash-only)", "Small first-aid kit", "Journal for memories"],
  };
}

// ─── POST /api/ai/plan-journey ────────────────────────────────────────────────
router.post("/plan-journey", async (req, res) => {
  const { state, vibe, days, month, budget } = req.body;

  if (!state || !vibe || !days || !month) {
    return res.status(400).json({ error: "state, vibe, days, and month are required." });
  }

  try {
    // Try Gemini API if available
    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "your_gemini_api_key_here") {
      const { GoogleGenerativeAI } = require("@google/generative-ai");
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const festivalContext = festivals
        .filter(f => f.state === state || f.state === "All India")
        .slice(0, 5)
        .map(f => `${f.name} (${f.month}): ${f.description}`)
        .join("\n");

      const prompt = `You are a premium Indian cultural travel curator for AestheticView. Create a beautiful, detailed ${days}-day cultural itinerary for ${state} with a "${vibe}" travel vibe in the month of ${month} for a ${budget} budget.

Relevant festivals in ${state}:
${festivalContext}

Return a JSON object with this exact structure:
{
  "overview": { "destination": "${state}", "vibe": "${vibe}", "duration": "${days} Days", "month": "${month}", "budget": "${budget}", "bestFor": "one line description" },
  "highlightFestivals": ["festival1", "festival2"],
  "culturalTips": ["tip1", "tip2", "tip3", "tip4"],
  "transport": "recommended transport options",
  "packingList": ["item1", "item2", "item3", "item4", "item5"],
  "itinerary": [
    { "day": 1, "theme": "Theme", "morning": "Morning plan", "afternoon": "Afternoon plan", "evening": "Evening plan", "tip": "Pro tip" }
  ]
}

Make the descriptions vivid, poetic, and specific to ${state}'s culture. Focus on authentic local experiences.`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();

      // Parse JSON from Gemini response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const geminiItinerary = JSON.parse(jsonMatch[0]);
        return res.json({ success: true, itinerary: geminiItinerary, source: "gemini" });
      }
    }
  } catch (err) {
    console.log("Gemini API not available for planner, using knowledge base:", err.message);
  }

  // Fallback to structured knowledge base itinerary
  const itinerary = generateItinerary({ state, vibe, days: parseInt(days), month, budget: budget || "mid" });
  res.json({ success: true, itinerary, source: "knowledge_base" });
});

// ─── GET /api/ai/vibes — Return available travel vibes ────────────────────────
router.get("/vibes", (req, res) => {
  const vibes = Object.entries(vibePersonas).map(([name, data]) => ({
    name,
    icon: data.icon,
    description: data.description,
    recommendedStates: data.recommendedStates,
  }));
  res.json(vibes);
});

module.exports = router;
