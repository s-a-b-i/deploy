// components/publisher/HighlightMediaModal.jsx
import React, { useState } from 'react';

const HighlightMediaModal = ({ isOpen, onClose, websiteDomain }) => {
  const [months, setMonths] = useState('1');
  const PRICE_PER_MONTH = 29.00;

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle highlight logic here
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Highlight your Media</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="text-gray-600 mb-8">
          In this section you can highlight this Media for a minimum of 1 month up to a maximum of 6 months. 
          By highlighting it this will appear at the top of the list in searches for users matching your 
          Media criteria. Payment for the highlighting can only be made through your Rankister balance. 
          Remember to deposit if you want to highlight Media!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Months</label>
            <select
              value={months}
              onChange={(e) => setMonths(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2"
            >
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>{num} month{num > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-between items-center mt-8">
            <div className="text-xl">
              Total: € {(PRICE_PER_MONTH * parseInt(months)).toFixed(2)}
            </div>
            <button
              type="submit"
              className="bg-foundations-primary text-white px-6 py-2 rounded-lg hover:bg-orange-600"
            >
              Highlight your Media
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HighlightMediaModal;