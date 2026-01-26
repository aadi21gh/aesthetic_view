import { useState, useRef, useEffect } from "react";

export default function ChatBox() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const predefinedQA = {
    "what is aestheticview":
      "AestheticView is your travel companion app to explore Indian states, festivals, hotels, and cultural guides.",
    "which states are covered in the app":
      "All major Indian states are included, from Rajasthan to Kerala, each with attractions, hotels, and festivals.",
    "can i book hotels through the app":
      "Yes! You can browse hotels and make instant bookings with details like price, location, and amenities.",
    "how can i explore festivals":
      "Go to the Festivals section to see details about Indian festivals, including dates, attire, and locations.",
    "who are the cultural guides":
      "Cultural guides are experts in each state who provide local insights, historical info, and travel tips.",
    "can the app give travel suggestions":
      "Absolutely! Ask about places to visit, festivals, or hotels, and the chatbot will suggest options.",
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input;
    const newMessages = [...messages, { sender: "user", text: userMessage }];
    setMessages(newMessages);
    setInput("");

    const key = userMessage.toLowerCase();
    const reply = predefinedQA[key] || "Sorry, I don't understand that yet.";

    setMessages([
      ...newMessages,
      {
        sender: "ai",
        text: reply,
      },
    ]);
  };

  const handleOpen = () => {
    setOpen(true);
    if (messages.length === 0) {
      setMessages([
        {
          sender: "ai",
          text: "Hi! I am AestheticBot 🤖. Ask me anything about Indian states, festivals, hotels, or cultural guides.",
        },
      ]);
    }
  };

  return (
    <div className="relative">

      {/* 🐐 GOAT ICON BUTTON WITH "Chat" WRITTEN ON IT */}
      {!open && (
        <button
          onClick={handleOpen}
          className="relative text-6xl hover:scale-110 transition-transform select-none"
        >
          {/* GOAT EMOJI WITH WALKING ANIMATION */}
          <span className="block animate-goat-walk">🐐</span>

          {/* "Chat" text ON TOP of the goat */}
          <span
            className="absolute top-1/2 left-1/2 
                       -translate-x-1/2 -translate-y-1/2
                       text-xs font-bold text-white pointer-events-none"
            style={{ textShadow: "1px 1px 2px black" }}
          >
            Chat
          </span>
        </button>
      )}

      {/* FULL CHATBOX */}
      {open && (
        <div className="w-80 h-96 bg-[#F5EDE2] text-[#2E1F13] rounded-xl shadow-xl border border-[#5A3E24] flex flex-col overflow-hidden">

          {/* HEADER */}
          <div className="bg-[#2E1F13] text-[#F5EDE2] px-4 py-2 flex justify-between items-center">
            <span>Ask AestheticBot</span>

            <button
              onClick={() => setOpen(false)}
              className="font-bold hover:text-gray-300"
            >
              ✖
            </button>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 p-2 overflow-y-auto space-y-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded max-w-[75%] ${
                  msg.sender === "user"
                    ? "bg-[#D9CBBF] self-end ml-auto text-black"
                    : "bg-[#EDE1D6] self-start text-black"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* INPUT FIELD */}
          <div className="flex border-t border-gray-300 p-2">
            <input
              className="flex-1 border rounded px-2 py-1 focus:outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
            />
            <button
              onClick={handleSend}
              className="ml-2 px-3 bg-[#2E1F13] text-[#F5EDE2] rounded hover:opacity-90 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}