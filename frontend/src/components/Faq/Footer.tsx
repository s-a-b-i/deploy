import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-4 text-center">
      <div className="flex items-center justify-center space-x-2">
        {/* Image */}
        <img
          src="https://rankister.tawk.help/_nuxt/img/tawky.383b2c0.svg"
          alt="Tawky Logo"
          className="w-6 h-6" // Adjust size as needed
        />
        {/* Text */}
        <p className="text-sm text-gray-600">
          Add free{" "}
          <a href="#" className="text-[#7091E6] hover:underline">
            Live Chat
          </a>{" "}
          to your site
        </p>
      </div>
    </footer>
  );
};

export default Footer;