// components/FormSections/SocialMediaSection.jsx
import React from 'react';
import { FiInfo } from 'react-icons/fi';
import { Popover } from '@headlessui/react';

const socialPlatforms = [
  { name: 'facebook', placeholder: 'https://facebook.com/yourpage', tooltip: 'Enter your Facebook page URL.' },
  { name: 'instagram', placeholder: 'https://instagram.com/yourpage', tooltip: 'Enter your Instagram profile URL.' },
  { name: 'tiktok', placeholder: 'https://tiktok.com/@yourpage', tooltip: 'Enter your TikTok profile URL.' },
  { name: 'reddit', placeholder: 'https://reddit.com/r/yoursubreddit', tooltip: 'Enter your Reddit subreddit URL.' },
  { name: 'telegram', placeholder: 'https://t.me/yourchannel', tooltip: 'Enter your Telegram channel URL.' },
];

const tooltipContent = {
  sensitiveTopics: "Select if your content includes sensitive topics like gambling, CBD, adult content, or trading.",
  googleNews: "Enable this option if your publication is registered with Google News.",
};

const SocialMediaSection = ({ formData, handleInputChange }) => {
  return (
    <div className="space-y-4">
      {socialPlatforms.map((platform) => (
        <div key={platform.name}>
          <div className="flex items-center gap-2">
            <label className="block font-semibold capitalize">{platform.name}</label>
            <Popover className="relative">
              <Popover.Button className="focus:outline-none">
                <FiInfo className="text-gray-500 hover:text-gray-700 transition-colors" size={16} />
              </Popover.Button>
              <Popover.Panel className="absolute z-10 w-64 p-3 mt-2 text-sm text-gray-600 bg-white border rounded-lg shadow-lg">
                {platform.tooltip}
              </Popover.Panel>
            </Popover>
          </div>
          <input
            type="url"
            name={platform.name}
            value={formData[platform.name]}
            onChange={handleInputChange}
            placeholder={platform.placeholder}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
      ))}

      {/* Sensitive Topics */}
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
        <label className="font-semibold mb-2 md:mb-0 md:mr-12 flex items-center gap-1">
          Sensitive Topics
          <Popover className="relative">
            <Popover.Button className="focus:outline-none">
              <FiInfo className="text-gray-500 hover:text-gray-700 transition-colors" size={16} />
            </Popover.Button>

            <Popover.Panel className="absolute z-10 w-64 p-3 mt-2 text-sm text-gray-600 bg-white border rounded-lg shadow-lg">
              {tooltipContent.sensitiveTopics}
            </Popover.Panel>
          </Popover>
        </label>
        <div className="grid grid-cols-2 gap-4 md:flex md:space-x-10">
          {["Gambling", "CBD", "Adult", "Trading"].map((topic) => (
            <label key={topic} className="flex items-center">
              <input
                type="checkbox"
                name="sensitiveTopics"
                value={topic}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  handleInputChange({
                    target: {
                      name: "sensitiveTopics",
                      value: isChecked
                        ? [...formData.sensitiveTopics, topic]
                        : formData.sensitiveTopics.filter((t) => t !== topic),
                    },
                  });
                }}
                checked={formData.sensitiveTopics.includes(topic)}
                className="mr-2"
              />
              <span>{topic}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Google News */}
      <div>
  <label className="flex items-center gap-2"> {/* Use gap-2 to create space between label text and checkbox */}
    <span className="font-semibold">Google News</span>
    <Popover className="relative mr-16">
      <Popover.Button className="focus:outline-none">
        <FiInfo className="text-gray-500 hover:text-gray-700 transition-colors" size={16} />
      </Popover.Button>

      <Popover.Panel className="absolute z-10 w-64 p-3 mt-2 text-sm text-gray-600 bg-white border rounded-lg shadow-lg">
        {tooltipContent.googleNews}
      </Popover.Panel>
    </Popover>
    <input
      type="checkbox"
      name="googleNews"
      checked={formData.googleNews}
      onChange={handleInputChange}
      className="h-4 w-4"  // Removed ml-4, no margin needed here
    />
  </label>
</div>

    </div>
  );
};

export default SocialMediaSection;
