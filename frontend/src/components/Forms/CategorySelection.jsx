import React from 'react';
import Select from 'react-select';
import { FiInfo } from 'react-icons/fi';
import { Popover } from '@headlessui/react';

const categoryOptions = [
  { value: "Technology", label: "Technology" },
  { value: "Health", label: "Health" },
  { value: "Education", label: "Education" },
  { value: "Science", label: "Science" },
  { value: "Business", label: "Business" },
  { value: "Entertainment", label: "Entertainment" },
  { value: "Sports", label: "Sports" },
  { value: "Travel", label: "Travel" },
  { value: "Fashion", label: "Fashion" },
  { value: "Food", label: "Food" },
  { value: "Lifestyle", label: "Lifestyle" },
  { value: "Finance", label: "Finance" },
  { value: "Art", label: "Art" },
  { value: "Music", label: "Music" },
  { value: "Politics", label: "Politics" },
  { value: "Environment", label: "Environment" },
  { value: "Automotive", label: "Automotive" },
  { value: "Gaming", label: "Gaming" },
  { value: "Real Estate", label: "Real Estate" },
  { value: "Law", label: "Law" },
  { value: "Religion", label: "Religion" },
  { value: "Philosophy", label: "Philosophy" },
  { value: "History", label: "History" },
  { value: "Literature", label: "Literature" },
  { value: "Technology & Gadgets", label: "Technology & Gadgets" },
  { value: "Social Media", label: "Social Media" },
  { value: "Parenting", label: "Parenting" },
  { value: "Pets", label: "Pets" },
  { value: "Health & Fitness", label: "Health & Fitness" },
  { value: "Psychology", label: "Psychology" },
  { value: "Self-Help", label: "Self-Help" },
  { value: "Personal Development", label: "Personal Development" },
  { value: "Photography", label: "Photography" },
  { value: "Architecture", label: "Architecture" },
  { value: "Interior Design", label: "Interior Design" },
  { value: "Crafts & DIY", label: "Crafts & DIY" },
  { value: "E-commerce", label: "E-commerce" },
  { value: "Mobile Apps", label: "Mobile Apps" },
  { value: "Web Development", label: "Web Development" },
  { value: "Software Development", label: "Software Development" },
  { value: "Artificial Intelligence", label: "Artificial Intelligence" },
  { value: "Virtual Reality", label: "Virtual Reality" },
  { value: "Augmented Reality", label: "Augmented Reality" },
  { value: "Data Science", label: "Data Science" },
  { value: "Cryptocurrency", label: "Cryptocurrency" },
  { value: "Blockchain", label: "Blockchain" },
  { value: "Startups", label: "Startups" },
  { value: "Marketing", label: "Marketing" },
  { value: "Sales", label: "Sales" },
  { value: "Investment", label: "Investment" },
  { value: "Nonprofit", label: "Nonprofit" },
  { value: "Education & Learning", label: "Education & Learning" },
  { value: "Career", label: "Career" },
];

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? '#3B82F6' : '#D1D5DB',
    boxShadow: state.isFocused ? '0 0 0 2px rgba(59, 130, 246, 0.5)' : 'none',
    '&:hover': {
      borderColor: '#3B82F6',
    },
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 10,
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#EFF6FF',
    borderRadius: '0.375rem',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#2563EB',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: '#2563EB',
    '&:hover': {
      backgroundColor: '#DBEAFE',
      color: '#1E40AF',
    },
  }),
};

const CategorySelection = ({ formData, handleCategoryChange }) => {
  return (
    <div className="max-w-4xl   ">
      <div className="p-6">
        <div className="flex items-start gap-8 border-t pt-6">
          <div className="w-1/4">
            <label className="font-semibold flex items-center gap-2">
              Categories <span className="text-red-500">*</span>
              <Popover className="relative">
                <Popover.Button className="focus:outline-none">
                  <FiInfo className="text-gray-500 hover:text-gray-700 transition-colors" size={16} />
                </Popover.Button>
                <Popover.Panel className="absolute z-10 w-64 p-3 mt-2 text-sm text-gray-600 bg-white border rounded-lg shadow-lg">
                  Select up to 20 relevant categories for your content.
                </Popover.Panel>
              </Popover>
            </label>
          </div>
          
          <div className="w-3/4 space-y-2">
            <Select
              isMulti
              name="category"
              options={categoryOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleCategoryChange}
              value={categoryOptions.filter(option => 
                formData.category.includes(option.value)
              )}
              styles={customStyles}
              isClearable
              closeMenuOnSelect={false}
              maxMenuHeight={150}
              isDisabled={formData.category.length >= 20}
              placeholder="Select categories..."
            />
            <p className="text-gray-500 text-sm">
              {formData.category.length}/20 categories selected
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySelection;