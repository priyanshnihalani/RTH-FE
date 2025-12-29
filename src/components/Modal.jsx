import { X } from "lucide-react";

const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* -------- Overlay -------- */}
      <div
        className="
          absolute inset-0
          bg-black/40
          backdrop-blur-sm
          min-h-screen
        "
        onClick={onClose}
      />

      {/* -------- Modal Box -------- */}
      <div
        className="
          relative z-10
          w-full max-w-2xl
          bg-white/80 backdrop-blur-xl
          rounded-3xl
          border border-white/40
          shadow-[0_30px_80px_rgba(0,0,0,0.18)]
          p-8
          animate-in fade-in zoom-in-95 duration-200
        "
      >
        {/* -------- Header -------- */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="
              p-2 rounded-xl
              text-gray-500
              hover:bg-gray-100
              hover:text-gray-800
              transition
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* -------- Body -------- */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
