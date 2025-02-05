// ProfileSection.jsx
import React from 'react';

const ProfileSection = ({
  isOpen,
  toggleSection,
  formData,
  setFormData,
  handleSubmit,
  handleAvatarChange,
  avatarPreview,
  email,
  setShowEmailModal
}) => {
  return (
    <>
      <div 
        className="bg-gradient-to-r from-foundations-primary to-foundations-secondary text-white p-4 rounded-lg cursor-pointer flex justify-between items-center"
        onClick={toggleSection}
      >
        <h2 className="font-medium">
          {isOpen ? '▼' : '►'} Profile
        </h2>
        <span>{isOpen ? 'Close' : 'Open'}</span>
      </div>

      {isOpen && (
        <form onSubmit={handleSubmit} className="space-y-8 p-6">
          <div className="space-y-8">
            <div className="flex items-center gap-8 border-t pt-6">
              <label className="font-semibold w-1/4">First name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="w-3/4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-8 border-t pt-6">
              <label className="font-semibold w-1/4">Last name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="w-3/4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-8 border-t pt-6">
              <label className="font-semibold w-1/4">Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-3/4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-8 border-t pt-6">
              <label className="font-semibold w-1/4">Avatar</label>
              <div className="w-3/4">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden" 
                  id="avatarUpload"
                />
                <div className="flex items-center gap-4">
                  {avatarPreview ? (
                    <img 
                      src={avatarPreview} 
                      alt="Avatar preview" 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  )}
                  <label 
                    htmlFor="avatarUpload" 
                    className="text-gray-600 cursor-pointer"
                  >
                    Change
                  </label>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-8 border-t pt-6">
              <label className="font-semibold w-1/4">Email Language</label>
              <select
                value={formData.emailLanguage}
                onChange={(e) =>
                  setFormData({ ...formData, emailLanguage: e.target.value })
                }
                className="w-3/4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="EN">EN</option>
              </select>
            </div>

            <div className="flex items-center gap-8 border-t pt-6">
              <label className="font-semibold w-1/4 flex items-center gap-2">
                Publisher company name <span className="text-blue-500">ⓘ</span>
              </label>
              <input
                type="text"
                value={formData.publisherCompanyName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    publisherCompanyName: e.target.value,
                  })
                }
                className="w-3/4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-8 border-t pt-6 justify-start">
  <button
    type="button"
    className="px-4 py-2 bg-foundations-primary text-white rounded-lg hover:bg-blue-100 transition-colors"
    onClick={() => setShowEmailModal(true)}
  >
    Click here to Change Email
  </button>
</div>


          <div className="flex items-center gap-8 border-t pt-6">
            <div className="w-1/4"></div>
            <div className="w-3/4 flex justify-end">
              <button
                type="submit"
                className="bg-foundations-primary text-white px-6 py-2 rounded-lg hover:opacity-90"
              >
                Save Profile
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default ProfileSection;