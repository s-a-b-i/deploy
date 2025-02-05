import React from "react"
import { FiInfo, FiX } from "react-icons/fi"
import { Popover } from "@headlessui/react"

const socialPlatforms = [
  { name: "facebook", placeholder: "https://facebook.com/yourpage", tooltip: "Enter your Facebook page URL." },
  { name: "instagram", placeholder: "https://instagram.com/yourpage", tooltip: "Enter your Instagram profile URL." },
  { name: "tiktok", placeholder: "https://tiktok.com/@yourpage", tooltip: "Enter your TikTok profile URL." },
  { name: "reddit", placeholder: "https://reddit.com/r/yoursubreddit", tooltip: "Enter your Reddit subreddit URL." },
  { name: "telegram", placeholder: "https://t.me/yourchannel", tooltip: "Enter your Telegram channel URL." },
]

const tooltipContent = {
  sensitiveTopics: "Select if your content includes sensitive topics like gambling, CBD, adult content, or trading.",
  googleNews: "Enable this option if your publication is registered with Google News.",
}

const SocialMediaSection = ({ formData, handleInputChange }) => {
  // Ensure formData.socialMedia exists and has default values
  React.useEffect(() => {
    if (!formData.socialMedia) {
      const defaultSocialMedia = socialPlatforms.reduce((acc, platform) => {
        acc[platform.name] = [""]
        return acc
      }, {})
      
      handleInputChange({
        target: {
          name: "socialMedia",
          value: defaultSocialMedia
        }
      })
    }
  }, [])

  const handleAddLink = (platform) => {
    const currentLinks = formData.socialMedia?.[platform] || [""]
    handleInputChange({
      target: {
        name: "socialMedia",
        value: {
          ...formData.socialMedia,
          [platform]: [...currentLinks, ""]
        }
      }
    })
  }

  const handleRemoveLink = (platform, index) => {
    const currentLinks = formData.socialMedia?.[platform] || [""]
    if (currentLinks.length > 1) { // Ensure we keep at least one input
      const updatedLinks = currentLinks.filter((_, i) => i !== index)
      handleInputChange({
        target: {
          name: "socialMedia",
          value: {
            ...formData.socialMedia,
            [platform]: updatedLinks.length ? updatedLinks : [""] // Ensure at least empty string
          }
        }
      })
    }
  }

  const handleLinkChange = (platform, index, value) => {
    const currentLinks = [...(formData.socialMedia?.[platform] || [""])]
    currentLinks[index] = value
    handleInputChange({
      target: {
        name: "socialMedia",
        value: {
          ...formData.socialMedia,
          [platform]: currentLinks
        }
      }
    })
  }

  // Guard for initial render when socialMedia might not exist
  if (!formData.socialMedia) {
    return null
  }

  return (
    <div className="max-w-4xl p-6"> {/* Added p-6 for consistent padding */}
    <div className="space-y-8 border-t pt-6">
      {socialPlatforms.map((platform) => (
        <div key={platform.name} className="flex items-center gap-8"> {/* Changed to items-center */}
          <label className="font-semibold flex items-center gap-2 w-1/4 capitalize">
            {platform.name}
            <Popover className="relative">
              <Popover.Button className="focus:outline-none">
                <FiInfo className="text-gray-500 hover:text-gray-700 transition-colors" size={16} />
              </Popover.Button>
              <Popover.Panel className="absolute z-10 w-64 p-3 mt-2 text-sm text-gray-600 bg-white border rounded-lg shadow-lg">
                {platform.tooltip}
              </Popover.Panel>
            </Popover>
          </label>
  
          <div className="w-3/4 space-y-4">
            {(formData.socialMedia[platform.name]?.length ? 
              formData.socialMedia[platform.name] : 
              [""]
            ).map((link, index) => (
              <div key={index} className="relative">
                <input
                  type="url"
                  value={link || ""}
                  onChange={(e) => handleLinkChange(platform.name, index, e.target.value)}
                  placeholder={platform.placeholder}
                  className="w-full border border-gray-300 rounded-md p-2.5 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveLink(platform.name, index)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
                  >
                    <FiX size={20} />
                  </button>
                )}
              </div>
            ))}
            
            <button
              type="button"
              onClick={() => handleAddLink(platform.name)}
              className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-2"
            >
              <span className="text-xl">+</span> Add another {platform.name} link
            </button>
          </div>
        </div>
      ))}
  
      {/* Sensitive Topics section */}
      <div className="border-t pt-6">
        <div className="flex items-center gap-8"> {/* Changed to items-center */}
          <label className="font-semibold flex items-center gap-2 w-1/4">
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
          
          <div className="w-3/4 grid grid-cols-2 gap-4">
            {["Gambling", "CBD", "Adult", "Trading"].map((topic) => (
              <label key={topic} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.sensitiveTopics.includes(topic)}
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
                  className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">{topic}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
  
      {/* Google News section */}
      <div className="border-t pt-6">
        <div className="flex items-center gap-8">
          <label className="font-semibold flex items-center gap-2 w-1/4">
            Google News
            <Popover className="relative">
              <Popover.Button className="focus:outline-none">
                <FiInfo className="text-gray-500 hover:text-gray-700 transition-colors" size={16} />
              </Popover.Button>
              <Popover.Panel className="absolute z-10 w-64 p-3 mt-2 text-sm text-gray-600 bg-white border rounded-lg shadow-lg">
                {tooltipContent.googleNews}
              </Popover.Panel>
            </Popover>
          </label>
          
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="googleNews"
              checked={formData.googleNews}
              onChange={(e) =>
                handleInputChange({
                  target: {
                    name: "googleNews",
                    value: e.target.checked,
                  },
                })
              }
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700">Yes</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SocialMediaSection

