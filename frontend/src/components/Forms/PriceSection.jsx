// components/FormSections/PriceSection.jsx
import React from 'react';
import { FiInfo } from 'react-icons/fi';
import { Popover } from '@headlessui/react';

const PriceSection = ({ formData, handleInputChange }) => {
  return (
    <div className="max-w-4xl ">
    <div className="p-6">
      <div className="flex items-start gap-8 border-t pt-6">
        <label className="font-semibold flex items-center gap-2 w-1/4">
          Price <span className="text-red-500">*</span>
          <Popover className="relative">
            <Popover.Button className="focus:outline-none">
              <FiInfo className="text-gray-500 hover:text-gray-700 transition-colors" size={16} />
            </Popover.Button>
            <Popover.Panel className="absolute z-10 w-64 p-3 mt-2 text-sm text-gray-600 bg-white border rounded-lg shadow-lg">
              Enter the price for your service. The minimum price allowed is 20.
            </Popover.Panel>
          </Popover>
        </label>

        <div className="w-3/4 space-y-2">
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Minimum price is 20"
            className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="20"
            required
          />
          
          <div className="text-red-500 text-sm">
            The minimum price is 20
          </div>

          {formData.price >= 10 && (
            <div className="flex gap-8 text-sm text-gray-600">
              <span>
                Rankister commission: € {formData.commission.toFixed(2)}
              </span>
              <span>
                Net profit: € {formData.netProfit.toFixed(2)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);
};

export default PriceSection;
