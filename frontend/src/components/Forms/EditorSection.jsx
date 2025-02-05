import React, { useState, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FiInfo } from 'react-icons/fi';
import { Popover } from '@headlessui/react';
import { debounce } from 'lodash';

const editorModules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ align: [] }],
    ['clean'],
  ],
  keyboard: {
    bindings: {
      tab: false
    }
  },
  clipboard: {
    matchVisual: false
  }
};

const editorFormats = ['bold', 'italic', 'underline', 'list', 'bullet', 'align'];

const EditorSection = ({ 
  description, 
  publicationGuidelines, 
  handleDescriptionChange, 
  setPublicationGuidelines,
  formData,
  handleInputChange 
}) => {
  const [error, setError] = useState('');

  const cleanHtmlContent = (htmlContent) => {
    return htmlContent.replace(/<p>/g, '').replace(/<\/p>/g, '');
  };

  const validateWordCount = useCallback(
    debounce((value) => {
      const text = value.replace(/<[^>]*>/g, '');
      const wordCount = text.trim().split(/\s+/).length;
      if (wordCount < 100) {
        setError('Description must be at least 100 words.');
      } else {
        setError('');
      }
    }, 500),
    []
  );

  const handleEditorChange = useCallback((value) => {
    if (value.length > 50000) {
      value = value.slice(0, 50000);
    }
    const cleanedValue = cleanHtmlContent(value);
    handleDescriptionChange(cleanedValue);
    validateWordCount(cleanedValue);
  }, [handleDescriptionChange, validateWordCount]);

  const handleGuidelinesChange = useCallback((value) => {
    if (value.length > 50000) {
      value = value.slice(0, 50000);
    }
    const cleanedValue = cleanHtmlContent(value);
    setPublicationGuidelines(cleanedValue);
  }, [setPublicationGuidelines]);

  return (
    <div className="max-w-4xl">
      <div className="space-y-8 p-6">
        {/* Description */}
        <div className="space-y-2 border-t pt-6">
          <div className="flex items-center gap-8">
            <label className="font-semibold flex items-center gap-2 w-1/4">
              Description <span className="text-red-500">*</span>
              <Popover className="relative">
                <Popover.Button className="focus:outline-none">
                  <FiInfo className="text-gray-500 hover:text-gray-700 transition-colors" size={16} />
                </Popover.Button>
                <Popover.Panel className="absolute z-10 w-64 p-3 mt-2 text-sm text-gray-600 bg-white border rounded-lg shadow-lg">
                  Provide a detailed description of your service. Be clear and concise.
                </Popover.Panel>
              </Popover>
            </label>
            <div className="w-3/4">
              <ReactQuill
                theme="snow"
                value={description}
                onChange={handleEditorChange}
                className="border border-gray-300 rounded-md"
                modules={editorModules}
                formats={editorFormats}
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
          </div>
        </div>

        {/* Publication Guidelines */}
        <div className="space-y-2 border-t pt-6">
          <div className="flex items-center gap-8">
            <label className="font-semibold flex items-center gap-2 w-1/4">
              Publication Guidelines <span className="text-red-500">*</span>
              <Popover className="relative">
                <Popover.Button className="focus:outline-none">
                  <FiInfo className="text-gray-500 hover:text-gray-700 transition-colors" size={16} />
                </Popover.Button>
                <Popover.Panel className="absolute z-10 w-64 p-3 mt-2 text-sm text-gray-600 bg-white border rounded-lg shadow-lg">
                  Include any important publication rules or restrictions. Be specific.
                </Popover.Panel>
              </Popover>
            </label>
            <div className="w-3/4">
              <ReactQuill
                theme="snow"
                value={publicationGuidelines}
                onChange={handleGuidelinesChange}
                className="border border-gray-300 rounded-md"
                modules={editorModules}
                formats={editorFormats}
              />
            </div>
          </div>
        </div>

        {/* Publication Duration */}
        <div className="flex items-center gap-8 border-t pt-6">
          <label className="font-semibold flex items-center gap-2 w-1/4">
            Publication Duration <span className="text-red-500">*</span>
            <Popover className="relative">
              <Popover.Button className="focus:outline-none">
                <FiInfo className="text-gray-500 hover:text-gray-700 transition-colors" size={16} />
              </Popover.Button>
              <Popover.Panel className="absolute z-10 w-64 p-3 mt-2 text-sm text-gray-600 bg-white border rounded-lg shadow-lg">
                Select how long the publication will be available. Choose from predefined durations.
              </Popover.Panel>
            </Popover>
          </label>
          <select
            name="publicationDuration"
            value={formData.publicationDuration}
            onChange={handleInputChange}
            className="w-3/4 border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select duration</option>
            <option value="1 year">1 Year</option>
            <option value="2 years">2 Years</option>
            <option value="Permanent">Permanent</option>
          </select>
        </div>

        {/* Average Publication Time */}
        <div className="flex items-center gap-8 border-t pt-6">
          <label className="font-semibold flex items-center gap-2 w-1/4">
            Average Publication Time <span className="text-red-500">*</span>
            <Popover className="relative">
              <Popover.Button className="focus:outline-none">
                <FiInfo className="text-gray-500 hover:text-gray-700 transition-colors" size={16} />
              </Popover.Button>
              <Popover.Panel className="absolute z-10 w-64 p-3 mt-2 text-sm text-gray-600 bg-white border rounded-lg shadow-lg">
                This field represents the average time it takes for the publication to be processed.
              </Popover.Panel>
            </Popover>
          </label>
          <select
            name="averagePublicationTime"
            value={formData.averagePublicationTime}
            onChange={handleInputChange}
            className="w-3/4 border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select publication time</option>
            <option value="Max 28">Max 28</option>
            <option value="Max 48">Max 48</option>
            <option value="Max 96">Max 96</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default EditorSection;