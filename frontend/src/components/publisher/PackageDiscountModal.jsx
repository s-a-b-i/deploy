// components/publisher/PackageDiscountModal.jsx
import React, { useState } from 'react';

const PackageDiscountModal = ({ isOpen, onClose, websiteDomain }) => {
  const [isDiscountActive, setIsDiscountActive] = useState(false);
  const [slots, setSlots] = useState('5');
  const [pricePerPublication, setPricePerPublication] = useState('150');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle save logic here
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Site package sales discount</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Allow users to purchase multiple publications on your website at a discounted price, decide the 
          price per single publication and what is the number of publications to purchase to get the discount.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <span className="text-gray-700 font-medium">Discount for active package</span>
              <input
                type="checkbox"
                checked={isDiscountActive}
                onChange={(e) => setIsDiscountActive(e.target.checked)}
                className="rounded border-gray-300"
              />
              <span>Yes</span>
            </label>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Slots</label>
            <select
              value={slots}
              onChange={(e) => setSlots(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2"
              disabled={!isDiscountActive} // Disable based on checkbox
            >
              <option value="5">5 slot</option>
              <option value="10">10 slot</option>
              <option value="15">15 slot</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Price per publication</label>
            <div className="relative">
              <input
                type="number"
                value={pricePerPublication}
                onChange={(e) => setPricePerPublication(e.target.value)}
                min="20"
                className="w-full rounded-lg border border-gray-300 p-2 pr-8"
                disabled={!isDiscountActive} // Disable based on checkbox
              />
              <span className="absolute right-3 top-2 text-gray-500">€</span>
            </div>
            <p className="text-red-500 text-sm">The minimum price is 20</p>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-foundations-primary text-white px-6 py-2 rounded-lg hover:bg-orange-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PackageDiscountModal;
