export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex justify-center items-center z-50 p-4 pointer-events-auto overflow-hidden animate-fadeIn">
      <div className="bg-[#0E0307] border border-[#48162A] p-6 sm:p-8 rounded-3xl relative w-full max-w-lg text-[#FFF7ED] shadow-2xl shadow-black/90">
        <button
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#240B15] border border-[#48162A] text-[#A8988B] hover:text-[#FFF7ED] hover:border-[#D4AF37] flex items-center justify-center transition-colors text-sm"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
