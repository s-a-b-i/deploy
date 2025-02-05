import React from 'react';
import { FiInfo } from 'react-icons/fi';
import { Popover } from '@headlessui/react';

const languageOptions = [
  { value: "Austria", label: "Austria" },
  { value: "Belgium", label: "Belgium" },
  { value: "Germany", label: "Germany" },
  { value: "Liechtenstein", label: "Liechtenstein" },
  { value: "Luxembourg", label: "Luxembourg" },
  { value: "Switzerland", label: "Switzerland" },
  { value: "France", label: "France" },
  { value: "Slovakia", label: "Slovakia" },
  { value: "Slovenia", label: "Slovenia" },
  { value: "Czech Republic", label: "Czech Republic" },
  { value: "Hungary", label: "Hungary" },
  { value: "Italy", label: "Italy" },
  { value: "Spain", label: "Spain" },
  { value: "Mexico", label: "Mexico" },
  { value: "Chile", label: "Chile" },
  { value: "Argentina", label: "Argentina" },
  { value: "Colombia", label: "Colombia" },
  { value: "Guatemala", label: "Guatemala" },
  { value: "Honduras", label: "Honduras" },
  { value: "Ecuador", label: "Ecuador" },
  { value: "Peru", label: "Peru" },
  { value: "Bolivia", label: "Bolivia" },
  { value: "Paraguay", label: "Paraguay" },
  { value: "Uruguay", label: "Uruguay" },
  { value: "Venezuela", label: "Venezuela" },
  { value: "Costa Rica", label: "Costa Rica" },
  { value: "El Salvador", label: "El Salvador" },
  { value: "Nicaragua", label: "Nicaragua" },
  { value: "Panama", label: "Panama" },
  { value: "Dominican Republic", label: "Dominican Republic" },
  { value: "Cuba", label: "Cuba" },
  { value: "Denmark", label: "Denmark" },
  { value: "Sweden", label: "Sweden" },
  { value: "Norway", label: "Norway" },
  { value: "Finland", label: "Finland" },
  { value: "Estonia", label: "Estonia" },
  { value: "Netherlands", label: "Netherlands" },
  { value: "Greece", label: "Greece" },
  { value: "Romania", label: "Romania" },
  { value: "Poland", label: "Poland" },
  { value: "Bulgaria", label: "Bulgaria" },
  { value: "Portugal", label: "Portugal" },
  { value: "Brazil", label: "Brazil" },
  { value: "Belarus", label: "Belarus" },
  { value: "Russia", label: "Russia" },
  { value: "Lithuania", label: "Lithuania" },
  { value: "Latvia", label: "Latvia" },
  { value: "Ireland", label: "Ireland" },
  { value: "United States", label: "United States" },
  { value: "Canada", label: "Canada" },
  { value: "Australia", label: "Australia" },
  { value: "Singapore", label: "Singapore" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "UAE", label: "UAE" },
  { value: "China", label: "China" },
  { value: "Hong Kong", label: "Hong Kong" },
  { value: "South Korea", label: "South Korea" },
  { value: "Japan", label: "Japan" }
];


const mediaTypes = [
  { value: "Blog", label: "Blog" },
  { value: "Social Pages", label: "Social Pages" },
  { value: "Newspaper", label: "Newspaper" },
];

const BasicInfo = ({ formData, handleInputChange }) => {
  const tooltipContent = {
    language: "Select primary language",
    mediaType: "Choose media platform",
    nofollow: "Add nofollow attribute",
    webDomain: "Enter website URL",
    mediaName: "Enter official name"
  };

  return (
    <div className="max-w-4xl ">
      <div className="space-y-8 p-6">
        {/* Language */}
        <div className='flex items-center gap-8 border-t pt-6'>
          <label className="font-semibold flex items-center gap-2 w-1/4">
            Language <span className="text-red-500">*</span>
            <Popover className="relative">
              <Popover.Button className="focus:outline-none">
                <FiInfo className="text-gray-500 hover:text-gray-700 transition-colors" size={16} />
              </Popover.Button>
              <Popover.Panel className="absolute z-10 w-64 p-3 mt-2 text-sm text-gray-600 bg-white border rounded-lg shadow-lg">
                {tooltipContent.language}
              </Popover.Panel>
            </Popover>
          </label>
          <select
            name="language"
            value={formData.language}
            onChange={handleInputChange}
            className="w-3/4 border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select language</option>
            {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Media Type */}
        <div className='flex items-center gap-8 border-t pt-6'>
          <label className="font-semibold flex items-center gap-2 w-1/4">
            Media Type <span className="text-red-500">*</span>
            <Popover className="relative">
              <Popover.Button className="focus:outline-none">
                <FiInfo className="text-gray-500 hover:text-gray-700 transition-colors" size={16} />
              </Popover.Button>
              <Popover.Panel className="absolute z-10 w-64 p-3 mt-2 text-sm text-gray-600 bg-white border rounded-lg shadow-lg">
                {tooltipContent.mediaType}
              </Popover.Panel>
            </Popover>
          </label>
          <select
            name="mediaType"
            value={formData.mediaType}
            onChange={handleInputChange}
            className="w-3/4 border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select media type</option>
            {mediaTypes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Nofollow */}
        <div className='flex items-center gap-8 border-t pt-6'>
          <label className="font-semibold flex items-center gap-2 w-1/4">
            Nofollow <span className="text-red-500">*</span>
            <Popover className="relative">
              <Popover.Button className="focus:outline-none">
                <FiInfo className="text-gray-500 hover:text-gray-700 transition-colors" size={16} />
              </Popover.Button>
              <Popover.Panel className="absolute z-10 w-64 p-3 mt-2 text-sm text-gray-600 bg-white border rounded-lg shadow-lg">
                {tooltipContent.nofollow}
              </Popover.Panel>
            </Popover>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="nofollow"
              checked={formData.nofollow}
              onChange={handleInputChange}
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700">Yes</span>
          </div>
        </div>

        {/* Web Domain */}
        <div className='flex items-center gap-8 border-t pt-6'>
          <label className="font-semibold flex items-center gap-2 w-1/4">
            Web Domain <span className="text-red-500">*</span>
            <Popover className="relative">
              <Popover.Button className="focus:outline-none">
                <FiInfo className="text-gray-500 hover:text-gray-700 transition-colors" size={16} />
              </Popover.Button>
              <Popover.Panel className="absolute z-10 w-64 p-3 mt-2 text-sm text-gray-600 bg-white border rounded-lg shadow-lg">
                {tooltipContent.webDomain}
              </Popover.Panel>
            </Popover>
          </label>
          <input
            type="url"
            name="webDomain"
            value={formData.webDomain}
            onChange={handleInputChange}
            placeholder="https://example.com"
            className="w-3/4 border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Media Name */}
        <div className='flex items-center gap-8 border-t pt-6'>
          <label className="font-semibold flex items-center gap-2 w-1/4">
            Media Name <span className="text-red-500">*</span>
            <Popover className="relative">
              <Popover.Button className="focus:outline-none">
                <FiInfo className="text-gray-500 hover:text-gray-700 transition-colors" size={16} />
              </Popover.Button>
              <Popover.Panel className="absolute z-10 w-64 p-3 mt-2 text-sm text-gray-600 bg-white border rounded-lg shadow-lg">
                {tooltipContent.mediaName}
              </Popover.Panel>
            </Popover>
          </label>
          <input
            type="text"
            name="mediaName"
            value={formData.mediaName}
            onChange={handleInputChange}
            className="w-3/4 border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            placeholder="Enter media name"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;