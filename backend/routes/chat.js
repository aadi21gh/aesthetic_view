// backend/routes/chat.js — Sanskriti AI Cultural Concierge
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// Load cultural knowledge base
const festivals = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/festivals.json"), "utf-8"));
const states = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/states.json"), "utf-8"));
const guides = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/guides.json"), "utf-8"));

// ─── Rich Cultural Knowledge Base ────────────────────────────────────────────
const culturalKnowledge = {
  etiquette: {
    temple: "Remove footwear before entering temples. Dress modestly — cover shoulders and knees. Avoid leather items at Jain temples. Photography may be restricted inside the inner sanctum.",
    mosque: "Remove shoes before entering. Women should cover their head with a dupatta or scarf. Avoid wearing revealing clothes. Maintain silence and respect during prayer times.",
    gurdwara: "Cover your head with a cloth before entering. Remove shoes. Wash your hands. Sit cross-legged on the floor. The langar (community kitchen) is open to all.",
    general: "Always ask before photographing local people or ceremonies. Accept food and gifts with your right hand. Remove shoes when entering homes. Greet elders with a respectful 'Namaste'.",
  },
  festivals: {
    diwali: "Wear traditional Indian attire — Kurta for men, Saree or Lehenga for women. Avoid black. Exchange sweets (mithai) and light diyas. Best experienced in Varanasi for the famous Ganga Ghats illumination.",
    holi: "Wear white clothes — you'll get coloured! Protect your skin and hair with oil before playing. The most vibrant celebrations are in Mathura, Vrindavan, and Barsana.",
    durga_puja: "Wear traditional Bengali attire like dhoti-kurta or saree. Visit Kolkata's Pandals during Navratri. The best nights are Saptami, Ashtami, and Navami. Respect the immersion procession.",
    pushkar: "Visit in November for the Pushkar Camel Fair. Dress modestly as it's a holy city. The entire town is vegetarian and alcohol-free. Great for camel riding and local crafts.",
    onam: "Wear Kasavu (cream and gold) saree or traditional Kerala dhoti. Enjoy Sadya — a 26-dish feast on a banana leaf. The Thrissur Pooram elephant procession is spectacular.",
    navratri: "Wear colourful chaniya-choli in Gujarat and dandiya raas venues. Each night of Navratri is associated with a colour. Participate in Garba dances.",
    kumbh: "Wear comfortable, light cotton clothes. The main bathing dates (Shahi Snan) are extremely crowded — plan early. Prayagraj hosts the Maha Kumbh every 12 years.",
    hornbill: "Visit Nagaland in December for the Hornbill Festival. Tribal performances, local food, and morungs (dormitories) are highlights. Respectfully observe tribal rituals without intrusion.",
  },
  destinations: {
    rajasthan: "Best time: October to March. Don't miss Jaisalmer's golden fort at sunset, Jodhpur's blue city lanes, and Jaipur's Hawa Mahal. Rajasthani thali and dal baati churma are must-eats.",
    kerala: "Best time: September to March (post-monsoon). Backwater houseboats in Alleppey, Munnar tea gardens, Kovalam beach. Try Appam with stew, Karimeen fry, and Puttu.",
    varanasi: "Dawn boat rides on the Ganga Ghats are transformative. Evening Aarti at Dashashwamedh Ghat is spectacular. Try Banarasi paan, thandai, and kachori from the old city lanes.",
    ladakh: "Best time: June to September. Altitude sickness is common — acclimatize for 2 days. Pangong Lake, Nubra Valley, Hemis Monastery are must-visits. Pack warm layers even in summer.",
    meghalaya: "Best time: October to May. Cherrapunji (Sohra) for living root bridges. Dawki for crystal-clear rivers. Shillong for music and local cuisine. Try jadoh (red rice with pork).",
    goa: "North Goa for party beaches (Baga, Calangute). South Goa for peace (Palolem, Agonda). Best time: November to February. Try xacuti, vindaloo, and bebinca dessert.",
  },
  packing: {
    north_india_summer: "Light cotton kurtas, loose trousers, sunscreen SPF 50+, sunglasses, wide-brim hat, water bottle, ORS packets, comfortable sandals.",
    himalaya: "Thermal layers, waterproof jacket, sturdy trekking boots, altitude sickness pills (Diamox — consult a doctor), portable charger, sunscreen, lip balm.",
    rajasthan_winter: "Light woolens for evenings, comfortable cotton for daytime. Scarf for dusty rides. Leather mojri (shoes) are both practical and stylish for markets.",
    coastal: "Light linen, swimwear, reef-safe sunscreen, mosquito repellent, light rain jacket for unexpected showers.",
  },
  food: {
    north: "Dal makhani, butter chicken, rajma chawal, chole bhature, aloo puri, lassi, kulfi, gulab jamun.",
    south: "Dosa, idli-sambar, rasam, avial, Kerala fish curry, chettinad chicken, pongal, payasam.",
    east: "Litti chokha (Bihar), macher jhol (Bengal), rasgulla, sandesh, puran poli (Maharashtra), modak.",
    west: "Dal baati churma (Rajasthan), dhokla (Gujarat), thepla, vada pav (Mumbai), misal pav, puran poli.",
    northeast: "Jadoh (Meghalaya), smoked pork (Nagaland), thukpa (Sikkim), masor tenga (Assam), bamboo shoot dishes.",
  },
};

// ─── Smart Response Generator ─────────────────────────────────────────────────
function generateSmartResponse(message) {
  const msg = message.toLowerCase();

  // Festival-specific etiquette questions
  if (msg.includes("wear") || msg.includes("attire") || msg.includes("dress")) {
    if (msg.includes("diwali")) return `🪔 **Diwali Attire:** ${culturalKnowledge.festivals.diwali}`;
    if (msg.includes("holi")) return `🎨 **Holi Attire:** ${culturalKnowledge.festivals.holi}`;
    if (msg.includes("durga") || msg.includes("puja")) return `🌸 **Durga Puja:** ${culturalKnowledge.festivals.durga_puja}`;
    if (msg.includes("onam")) return `🌺 **Onam:** ${culturalKnowledge.festivals.onam}`;
    if (msg.includes("navratri") || msg.includes("garba")) return `💃 **Navratri:** ${culturalKnowledge.festivals.navratri}`;
    if (msg.includes("temple")) return `🛕 **Temple Etiquette:** ${culturalKnowledge.etiquette.temple}`;
    if (msg.includes("mosque")) return `🕌 **Mosque Etiquette:** ${culturalKnowledge.etiquette.mosque}`;
    if (msg.includes("gurdwara")) return `🙏 **Gurdwara Etiquette:** ${culturalKnowledge.etiquette.gurdwara}`;
  }

  // Destination-specific
  if (msg.includes("rajasthan") || msg.includes("jaipur") || msg.includes("jodhpur") || msg.includes("jaisalmer")) {
    return `🏰 **Rajasthan:** ${culturalKnowledge.destinations.rajasthan}`;
  }
  if (msg.includes("kerala") || msg.includes("alleppey") || msg.includes("munnar")) {
    return `🌴 **Kerala:** ${culturalKnowledge.destinations.kerala}`;
  }
  if (msg.includes("varanasi") || msg.includes("kashi") || msg.includes("banaras")) {
    return `🛕 **Varanasi:** ${culturalKnowledge.destinations.varanasi}`;
  }
  if (msg.includes("ladakh") || msg.includes("leh")) {
    return `🏔️ **Ladakh:** ${culturalKnowledge.destinations.ladakh}`;
  }
  if (msg.includes("goa")) {
    return `🏖️ **Goa:** ${culturalKnowledge.destinations.goa}`;
  }
  if (msg.includes("meghalaya") || msg.includes("cherrapunji") || msg.includes("shillong")) {
    return `🌧️ **Meghalaya:** ${culturalKnowledge.destinations.meghalaya}`;
  }

  // Etiquette
  if (msg.includes("etiquette") || msg.includes("respect") || msg.includes("behave") || msg.includes("rules")) {
    return `🙏 **Cultural Etiquette in India:** ${culturalKnowledge.etiquette.general}`;
  }

  // Packing
  if (msg.includes("pack") || msg.includes("carry") || msg.includes("bring") || msg.includes("luggage")) {
    if (msg.includes("himalaya") || msg.includes("mountain") || msg.includes("trek")) {
      return `🎒 **Himalayan Packing Guide:** ${culturalKnowledge.packing.himalaya}`;
    }
    if (msg.includes("rajasthan")) return `🧳 **Rajasthan Packing:** ${culturalKnowledge.packing.rajasthan_winter}`;
    if (msg.includes("beach") || msg.includes("goa") || msg.includes("coastal")) {
      return `👙 **Coastal Packing:** ${culturalKnowledge.packing.coastal}`;
    }
    return `🧳 **General Packing Tip:** For North India summers — ${culturalKnowledge.packing.north_india_summer}`;
  }

  // Food
  if (msg.includes("food") || msg.includes("eat") || msg.includes("dish") || msg.includes("cuisine") || msg.includes("try")) {
    if (msg.includes("south") || msg.includes("kerala") || msg.includes("tamil") || msg.includes("karnatak")) {
      return `🍛 **South Indian Cuisine:** ${culturalKnowledge.food.south}`;
    }
    if (msg.includes("east") || msg.includes("bengal") || msg.includes("bihar") || msg.includes("orissa")) {
      return `🐟 **East Indian Cuisine:** ${culturalKnowledge.food.east}`;
    }
    if (msg.includes("west") || msg.includes("gujarat") || msg.includes("rajasthan") || msg.includes("mumbai")) {
      return `🥘 **West Indian Cuisine:** ${culturalKnowledge.food.west}`;
    }
    if (msg.includes("northeast") || msg.includes("nagaland") || msg.includes("assam") || msg.includes("meghalaya")) {
      return `🎋 **Northeast Cuisine:** ${culturalKnowledge.food.northeast}`;
    }
    return `🍛 **North Indian Cuisine:** ${culturalKnowledge.food.north}`;
  }

  // Festival lookup from database
  const festivalMatch = festivals.find(f =>
    msg.includes(f.name.toLowerCase()) || f.name.toLowerCase().includes(msg.split(" ")[0])
  );
  if (festivalMatch) {
    return `🎉 **${festivalMatch.name}** (${festivalMatch.state})\n\n${festivalMatch.description}\n\n📅 Best time: ${festivalMatch.month}\n👗 Attire: ${festivalMatch.attire}`;
  }

  // State lookup
  const stateMatch = states.find(s => msg.includes(s.name?.toLowerCase()));
  if (stateMatch) {
    return `🗺️ **${stateMatch.name}**\n\n${stateMatch.description || "A beautiful state full of culture, heritage, and natural beauty. Explore its unique festivals, cuisine, and art forms through AestheticView!"}`;
  }

  // About the app
  if (msg.includes("what") && (msg.includes("aestheticview") || msg.includes("app") || msg.includes("this"))) {
    return "✨ **AestheticView** is India's premier cultural travel companion. Discover festivals, heritage stays, local storytellers, and craft immersive cultural journeys — all curated with an aesthetic editorial lens.";
  }

  if (msg.includes("itinerary") || msg.includes("plan") || msg.includes("trip")) {
    return "🗓️ I can help you plan! Try our **AI Trip Planner** (click the ✨ icon) for a personalized day-by-day cultural itinerary based on your vibe, budget, and travel month.";
  }

  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey") || msg.includes("namaste")) {
    return "🙏 Namaste! I'm **Sanskriti**, your AI cultural travel companion for India. Ask me about:\n\n• 🎉 Festival dates & etiquette\n• 🛕 Temple & cultural dos & don'ts\n• 🍛 Regional food to try\n• 🧳 What to pack\n• 🗺️ Destination guides\n\nHow can I guide your journey today?";
  }

  if (msg.includes("bye") || msg.includes("thank") || msg.includes("thanks")) {
    return "🙏 Safe travels and may your journey be filled with unforgettable cultural moments! Come back anytime — Sanskriti is always here to guide you. ✨";
  }

  // Default fallback
  return `🙏 Great question! While I may not have a specific answer for that, I recommend exploring our States and Festivals pages for curated cultural content. You can also try our **AI Trip Planner** for a personalized itinerary!\n\nTry asking me:\n• "What to wear at Diwali?"\n• "What food to eat in Kerala?"\n• "Packing tips for Ladakh"\n• "Varanasi travel guide"`;
}

// ─── POST /api/chat ───────────────────────────────────────────────────────────
router.post("/", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ reply: "Message is required" });

  try {
    // Try Gemini API first if key is available
    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "your_gemini_api_key_here") {
      const { GoogleGenerativeAI } = require("@google/generative-ai");
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const festivalContext = festivals.slice(0, 10).map(f => `${f.name} (${f.state}, ${f.month})`).join(", ");
      const stateContext = states.slice(0, 10).map(s => s.name).join(", ");

      const prompt = `You are Sanskriti, an expert AI cultural travel guide for India. You are embedded in AestheticView, a premium cultural travel platform. 
      
You have deep knowledge about Indian festivals, states, cultural etiquette, regional cuisines, packing tips, and travel logistics.

Available festivals in our platform: ${festivalContext}
Available states: ${stateContext}

User question: "${message}"

Respond in a warm, knowledgeable, and culturally sensitive tone. Keep responses concise (under 150 words). Use relevant emojis. If relevant, mention specific festival names, state attractions, or local foods from our platform.`;

      const result = await model.generateContent(prompt);
      const reply = result.response.text();
      return res.json({ reply, source: "gemini" });
    }
  } catch (err) {
    console.log("Gemini API not available, using cultural knowledge base:", err.message);
  }

  // Fallback to cultural knowledge base
  const reply = generateSmartResponse(message);
  res.json({ reply, source: "knowledge_base" });
});

module.exports = router;
