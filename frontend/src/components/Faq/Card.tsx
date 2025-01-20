import React from "react";

const Card = ({ card, viewMode }) => {
  return (
    <div
      className={`bg-white shadow-md p-6 rounded-lg border border-gray-200 transition-all duration-300 ease-in-out transform hover:border-blue-500 hover:-translate-y-1 ${
        viewMode === "list" ? "flex items-center space-x-4" : "text-center"
      }`}
    >
      <div className="text-[#7091E6] mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={`w-12 h-12 ${viewMode === "list" ? "mr-4" : "mx-auto"}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 10h7m4 0h7M5 14h14M7 18h10m-5-8V6m0 4v2m0-2H7m10 0h4"
          />
        </svg>
      </div>
      <div>
        <h3 className="text-xl font-semibold">{card.title}</h3>
        <p className="text-sm text-[#7091E6]">{card.articles}</p>
        <p className="text-xs text-gray-500">{card.updated}</p>
      </div>
    </div>
  );
};

export default Card;