import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  { id: 1, text: "Which cultural terrain calls to you?", options: ["Royal Forts & Palaces", "Tropical Backwaters", "Sacred Ghats & Temples", "Himalayan Valleys"] },
  { id: 2, text: "What kind of experience do you crave?", options: ["Heritage Architecture", "Folk Art & Dance", "Culinary Trails", "Spiritual Solitude"] },
  { id: 3, text: "Your travel pace and style:", options: ["Luxury Heritage Palace", "Boutique Homestay", "Rustic Eco-Lodge", "Slow Pilgrimage"] },
];

export default function TravelQuiz() {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOptionClick = (questionId, option) =>
    setAnswers({ ...answers, [questionId]: option });

  const handleSubmit = async () => {
    const selected = Object.values(answers);
    if (selected.length !== questions.length) {
      alert("Please answer all questions to uncover your journey!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/travel-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: selected }),
      });
      const data = await res.json();
      setResult(data.result);
    } catch {
      setResult({
        destination: "Rajasthan & Varanasi",
        description: "Your answers suggest a blend of royal grand forts, evening aartis, and vibrant folk celebrations.",
        image: null,
      });
    }
    setLoading(false);
  };

  const handleReset = () => {
    setAnswers({});
    setResult(null);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {/* Floating Trigger Button */}
      {!open && (
        <motion.button
          onClick={() => setOpen(true)}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#240B15] border border-[#D4AF37]/60 hover:border-[#D4AF37] 
                     text-[#FFF7ED] px-4 py-2.5 rounded-full shadow-2xl 
                     flex items-center gap-2.5 backdrop-blur-md transition-all 
                     hover:shadow-[#D4AF37]/25"
        >
          <span className="text-xl">✨</span>
          <div className="text-left">
            <span className="text-xs font-bold text-[#FDE047] block leading-none">Find Your Vibe</span>
            <span className="text-[10px] text-[#A8988B] leading-none">Cultural Matcher</span>
          </div>
        </motion.button>
      )}

      {/* Quiz Modal / Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="w-[340px] sm:w-[400px] max-h-[540px] bg-[#0E0307] border border-[#48162A] 
                       text-[#FFF7ED] rounded-3xl shadow-2xl overflow-y-auto p-5 
                       flex flex-col relative scrollbar-hide"
          >
            {/* Header */}
            <div className="flex justify-between items-center pb-3 mb-4 border-b border-[#48162A]">
              <div className="flex items-center gap-2">
                <span className="text-xl">✨</span>
                <div>
                  <h2 className="font-serif font-bold text-base text-[#FFF7ED]">Cultural Vibe Matcher</h2>
                  <p className="text-[10px] text-[#FDE047]">Find the destination attuned to your spirit</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full bg-[#240B15] border border-[#48162A] text-[#A8988B] hover:text-[#FFF7ED] hover:border-[#D4AF37] flex items-center justify-center transition-colors text-sm"
              >
                ✕
              </button>
            </div>

            {!result ? (
              <div className="space-y-4">
                {questions.map((q) => (
                  <div key={q.id} className="bg-[#240B15] border border-[#48162A] rounded-2xl p-3.5">
                    <h3 className="text-xs font-semibold text-[#FDE047] mb-2.5">{q.text}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {q.options.map((opt) => {
                        const isSelected = answers[q.id] === opt;
                        return (
                          <button
                            key={opt}
                            onClick={() => handleOptionClick(q.id, opt)}
                            className={`px-3 py-1.5 rounded-xl text-xs transition-all font-medium ${
                              isSelected
                                ? "bg-gradient-to-r from-[#FDE047] via-[#D4AF37] to-[#B8860B] text-[#0E0307] font-semibold shadow-md shadow-[#D4AF37]/25"
                                : "bg-[#0E0307] border border-[#48162A] text-[#D6C7B8] hover:border-[#D4AF37] hover:text-[#FDE047]"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-[#FDE047] via-[#D4AF37] to-[#B8860B] text-[#0E0307] font-bold rounded-xl hover:brightness-105 transition-all text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/25 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#0E0307] border-t-transparent rounded-full animate-spin" />
                      Consulting Traditions...
                    </>
                  ) : (
                    "Reveal My Cultural Destination ✨"
                  )}
                </button>
              </div>
            ) : (
              <div className="text-center py-3">
                <span className="text-4xl mb-2 block">👑</span>
                <span className="text-[10px] text-[#FDE047] uppercase tracking-widest font-semibold">Your Soul Match</span>
                <h3 className="font-serif text-xl font-bold text-[#FFF7ED] mt-1 mb-2">{result.destination}</h3>
                <p className="text-xs text-[#D6C7B8] leading-relaxed mb-4 bg-[#240B15] p-3 rounded-xl border border-[#48162A]">
                  {result.description}
                </p>

                {result.image && (
                  <img
                    src={result.image}
                    alt={result.destination}
                    className="w-full h-36 object-cover rounded-xl mb-4 border border-[#48162A]"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                )}

                <div className="flex gap-2">
                  <button
                    onClick={handleReset}
                    className="flex-1 py-2.5 rounded-xl bg-[#240B15] border border-[#48162A] text-xs text-[#D6C7B8] hover:border-[#D4AF37] hover:text-[#FFF7ED] transition-colors"
                  >
                    Retake Quiz
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#FDE047] via-[#D4AF37] to-[#B8860B] text-[#0E0307] text-xs font-bold hover:brightness-105 transition-all shadow-md"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
