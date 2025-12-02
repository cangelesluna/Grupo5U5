import React from "react";

const Modal = ({ visible, mensaje, tipo = "info", onClose }) => {
  if (!visible) return null;

  const iconos = {
    success: (
      <svg
        className="text-green-600 w-12 h-12 mx-auto mb-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 12.75l6 6 9-13.5"
        />
      </svg>
    ),
    error: (
      <svg
        className="text-red-600 w-12 h-12 mx-auto mb-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    ),
    warning: (
      <svg
        className="text-yellow-500 w-12 h-12 mx-auto mb-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v4m0 4h.01M2.25 12l9.75-9.75L21.75 12l-9.75 9.75L2.25 12z"
        />
      </svg>
    ),
    info: (
      <svg
        className="text-blue-600 w-12 h-12 mx-auto mb-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9h.01M12 12v3m0 6a9 9 0 100-18 9 9 0 000 18z"
        />
      </svg>
    ),
  };

  return (
    <div
      className="
        fixed inset-0 flex justify-center items-center 
        bg-black/40 backdrop-blur-sm z-50 animate-fade
      "
      onClick={onClose}
    >
      <div
        className="
          bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100
          px-6 py-6 rounded-xl shadow-xl w-80 text-center 
          animate-slide-up border border-pink-300 dark:border-gray-700
        "
        onClick={(e) => e.stopPropagation()}
      >
        {iconos[tipo]}

        <p className="text-lg font-medium">{mensaje}</p>

        <button
          className="
            mt-5 w-full bg-pink-600 hover:bg-pink-700 
            text-white py-2 rounded-lg transition
          "
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>

      <style>{`
        .animate-fade {
          animation: fadeIn 0.2s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Modal;
