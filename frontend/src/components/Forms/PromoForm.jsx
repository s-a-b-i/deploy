// src/components/PromoForm.jsx
import React, { useState } from 'react';

const PromoForm = ({ onCancel }) => {
  const [formData, setFormData] = useState({
    promoName: '',
    startDate: '14/01/2025 08:00 pm',
    endDate: '',
    products: [],
    discount: '20'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage promotions</h1>
      
      <p className="text-gray-600 mb-8">
        Here you can enter your temporary promotions for your already approved media on Rankister.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="flex items-center mb-1">
              Promo name
              <span className="text-red-500 ml-1">*</span>
              <div className="ml-1 text-gray-400 cursor-help">ⓘ</div>
            </label>
            <input
              type="text"
              value={formData.promoName}
              onChange={(e) => setFormData({...formData, promoName: e.target.value})}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="flex items-center mb-1">
              Start date
              <span className="text-red-500 ml-1">*</span>
              <div className="ml-1 text-gray-400 cursor-help">ⓘ</div>
            </label>
            <input
              type="text"
              value={formData.startDate}
              onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="flex items-center mb-1">
              End date
              <span className="text-red-500 ml-1">*</span>
              <div className="ml-1 text-gray-400 cursor-help">ⓘ</div>
            </label>
            <input
              type="text"
              placeholder="dd/mm/yyyy --:-- --"
              value={formData.endDate}
              onChange={(e) => setFormData({...formData, endDate: e.target.value})}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="flex items-center mb-1">
              Products
              <span className="text-red-500 ml-1">*</span>
              <div className="ml-1 text-gray-400 cursor-help">ⓘ</div>
            </label>
            <select
              value={formData.products}
              onChange={(e) => setFormData({...formData, products: e.target.value})}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
            >
              <option value="">Select products</option>
              {/* Add your product options here */}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="flex items-center mb-1">
              Discount
              <span className="text-red-500 ml-1">*</span>
              <div className="ml-1 text-gray-400 cursor-help">ⓘ</div>
            </label>
            <input
              type="text"
              value={formData.discount}
              onChange={(e) => setFormData({...formData, discount: e.target.value})}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className="bg-[#FDB022] text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            Create promos
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};


export default  PromoForm;