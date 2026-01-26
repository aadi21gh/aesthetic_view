export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 pointer-events-auto overflow-hidden">
      <div className="bg-[#F5EEDC] p-6 rounded-xl relative w-11/12 max-w-lg text-black">
        <button
          className="absolute top-2 right-2 text-[#5A3E2B] font-bold text-xl"
          onClick={onClose}
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
}

