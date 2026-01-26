import { useState } from "react";

const questions = [
  { id: 1, text: "Which type of destination do you prefer?", options: ["Mountain", "Beach", "City", "Countryside"] },
  { id: 2, text: "What kind of attractions do you like?", options: ["Monuments", "Greenery", "Adventure", "Relaxation"] },
  { id: 3, text: "Do you prefer...", options: ["Luxurious", "Antique", "Budget-friendly", "Offbeat"] },
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
      alert("Please answer all questions!");
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
        destination: "Error",
        description: "Something went wrong. Try again later.",
        image: null,
      });
    }
    setLoading(false);
  };

  return (
    <div className="relative">

      {/* 🦅 EAGLE ICON BUTTON WITH FLOATING ANIMATION */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="relative text-6xl hover:scale-110 transition-transform select-none animate-bounce"
        >
          <span>🦅</span>

          {/* Eagle label ON TOP */}
          <span
            className="absolute top-1/2 left-1/2 
                       -translate-x-1/2 -translate-y-1/2
                       text-xs font-bold text-white pointer-events-none"
            style={{ textShadow: "1px 1px 2px black" }}
          >
            Quiz
          </span>
        </button>
      )}

      {/* ORIGINAL QUIZ — UNTOUCHED */}
      {open && (
        <div className="w-80 md:w-96 max-h-[500px] bg-[#F5EDE2] text-[#2E1F13] rounded-xl shadow-lg overflow-y-auto p-4 flex flex-col">

          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Find Your Perfect Trip</h2>
            <button
              onClick={() => setOpen(false)}
              className="text-[#2E1F13] font-bold"
            >
              ✕
            </button>
          </div>

          {!result ? (
            <>
              {questions.map((q) => (
                <div key={q.id} className="mb-4">
                  <h3 className="mb-2 font-semibold">{q.text}</h3>

                  <div className="flex flex-wrap gap-2">
                    {q.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleOptionClick(q.id, opt)}
                        className={`px-3 py-1 rounded-full border text-sm ${
                          answers[q.id] === opt
                            ? "bg-[#2E1F13] text-[#F5EDE2]"
                            : "bg-[#F5EDE2] text-[#2E1F13] border-[#2E1F13]"
                        } transition-colors`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <button
                onClick={handleSubmit}
                className="mt-2 px-4 py-2 bg-[#2E1F13] text-[#F5EDE2] rounded-full font-semibold hover:opacity-90 transition"
                disabled={loading}
              >
                {loading ? "Finding..." : "See Recommendation"}
              </button>
            </>
          ) : (
            <div className="text-center">
              <h3 className="text-md font-bold mb-1">{result.destination}</h3>
              <p className="mb-2 text-sm">{result.description}</p>

              {result.image && (
                <img
                  src={result.image}
                  alt={result.destination}
                  className="mx-auto rounded-md mb-2"
                />
              )}

              <button
                onClick={() => {
                  setAnswers({});
                  setResult(null);
                }}
                className="mt-2 px-4 py-2 bg-[#2E1F13] text-[#F5EDE2] rounded-full font-semibold hover:opacity-90 transition"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
