import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sendChatMessage } from "@/utils/api";

const QUICK_CHIPS = [
  "What to wear at Holi? 🎨",
  "Temple etiquette tips 🛕",
  "Best food in Kerala 🍛",
  "Packing for Ladakh 🏔️",
  "Varanasi travel guide",
  "Navratri celebration tips 💃",
];

export default function ChatBox() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const handleOpen = () => {
    setOpen(true);
    if (messages.length === 0) {
      setMessages([
        {
          sender: "ai",
          text: "🙏 **Namaste!** I'm **Sanskriti**, your AI cultural guide for India.\n\nAsk me about festival dates, sacred rituals, traditional attire, regional cuisines, or customized cultural routes!",
        },
      ]);
    }
  };

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    const userMsg = text.replace(/[🎨🛕🍛🏔️💃]/g, "").trim();
    const newMessages = [...messages, { sender: "user", text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await sendChatMessage(userMsg);
      setMessages([...newMessages, { sender: "ai", text: res.data.reply }]);
    } catch {
      setMessages([...newMessages, { sender: "ai", text: "🙏 I'm having trouble connecting to tradition archives. Please try again in a moment." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = () => sendMessage(input);
  const handleChip = (chip) => sendMessage(chip);

  const renderText = (text) => {
    return text.split("\n").map((line, i) => {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <p key={i} className={`${i > 0 ? "mt-1" : ""} leading-relaxed`}>
          {parts.map((part, j) =>
            j % 2 === 1 ? <strong key={j} className="text-[#FDE047] font-bold">{part}</strong> : part
          )}
        </p>
      );
    });
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      {!open && (
        <motion.button
          onClick={handleOpen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center gap-2.5 bg-gradient-to-r from-[#FDE047] via-[#D4AF37] to-[#B8860B] text-[#0E0307] px-4 py-3 rounded-2xl shadow-2xl shadow-[#D4AF37]/35 transition-all duration-300 border border-[#FDE047]/60"
        >
          <span className="text-xl">🙏</span>
          <div className="text-left">
            <p className="text-xs font-black leading-none">Sanskriti AI</p>
            <p className="text-[10px] text-[#0E0307]/80 font-semibold leading-none mt-0.5">Cultural Concierge</p>
          </div>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0E0307] animate-pulse" />
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="w-80 sm:w-96 h-[500px] bg-[#0E0307] border border-[#48162A] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#240B15] to-[#300E1C] px-4 py-3.5 flex items-center justify-between border-b border-[#48162A]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FBBF24] via-[#D4AF37] to-[#B8860B] text-[#0E0307] font-bold flex items-center justify-center text-sm shadow-md">
                  🙏
                </div>
                <div>
                  <p className="font-bold text-[#FDE047] text-xs leading-none">Sanskriti AI</p>
                  <p className="text-[10px] text-[#A8988B] mt-0.5">Cultural Travel Guide</p>
                </div>
                <span className="w-2 h-2 bg-emerald-400 rounded-full ml-1" />
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-full bg-[#0E0307] border border-[#48162A] text-[#A8988B] hover:text-[#FFF7ED] flex items-center justify-center text-xs transition"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3.5 space-y-3 scrollbar-hide">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.sender === "ai" && (
                    <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[10px] mr-2 flex-shrink-0 mt-1">
                      🙏
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-xs ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-[#FDE047] via-[#D4AF37] to-[#B8860B] text-[#0E0307] font-medium rounded-tr-xs shadow-md"
                        : "bg-[#240B15] border border-[#48162A] text-[#FFF7ED] rounded-tl-xs leading-relaxed"
                    }`}
                  >
                    {renderText(msg.text)}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[10px]">
                    🙏
                  </div>
                  <div className="bg-[#240B15] border border-[#48162A] rounded-2xl px-3.5 py-2.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FDE047] animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FDE047] animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FDE047] animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Chips */}
            <div className="px-3 py-2 border-t border-[#48162A]/60 flex overflow-x-auto gap-1.5 scrollbar-hide">
              {QUICK_CHIPS.map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleChip(chip)}
                  className="flex-shrink-0 text-[10px] px-2.5 py-1 rounded-full bg-[#240B15] border border-[#48162A] text-[#A8988B] hover:text-[#FDE047] hover:border-[#D4AF37] transition whitespace-nowrap"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-[#240B15] border-t border-[#48162A] flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                placeholder="Ask about temples, festivals, foods..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 bg-[#0E0307] border border-[#48162A] text-xs text-[#FFF7ED] placeholder-[#A8988B]/60 rounded-xl px-3 py-2.5 focus:border-[#D4AF37] focus:outline-none"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#FDE047] via-[#D4AF37] to-[#B8860B] text-[#0E0307] flex items-center justify-center font-bold text-sm hover:brightness-105 transition disabled:opacity-40"
              >
                ➤
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}