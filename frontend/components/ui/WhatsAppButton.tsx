"use client";

import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <a
        href="https://wa.me/9779861439369"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
      >
        <FaWhatsapp size={28} />
      </a>

      {/* Tooltip */}
      <span className="absolute right-16 bottom-3 bg-gray-800 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-md">
        Chat with us
      </span>
    </div>
  );
};

export default WhatsAppButton;
