import React, { useState } from "react";
import { Link } from "react-router-dom";
import EditInvoicingForm from "../../components/Forms/EditInvoicingForm";

const Profile = () => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "Michael",
    lastName: "Smyth",
    phone: "03437771027",
    emailLanguage: "EN",
    publisherCompanyName: "TeqnoWebs",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="space-y-6 px-4 md:px-8 lg:px-12">
      <h1 className="text-2xl font-bold">Profile Settings</h1>

      <div className="bg-foundations-primary text-white p-4 rounded-lg">
        <h2 className="font-medium">▼ Profile</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">First name</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-200 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Last name</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-200 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Phone</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-200 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Avatar</label>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <button type="button" className="text-gray-600">
                Change
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Email Language</label>
            <select
              value={formData.emailLanguage}
              onChange={(e) =>
                setFormData({ ...formData, emailLanguage: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-200 rounded-lg"
            >
              <option value="EN">EN</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
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
              className="w-full px-4 py-2 border border-gray-200 rounded-lg"
            />
          </div>
        </div>

        <div>
          <a href="#" className="text-gray-700 hover:underline">
            Click here to change your email address
          </a>
        </div>

        <div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span>Vsl Teviškẹs Alkas</span>
            <span>
              Rygos g. 26-66, Vilnius, Vilnius, 01100, vilnius, Latvia
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                className="text-yellow-500"
                onClick={() => setShowEditForm(!showEditForm)}
              >
                ✏️
              </button>
              <button type="button" className="text-red-500">
                ✖️
              </button>
            </div>
          </div>
          <button
            type="button"
            className="mt-4 flex items-center gap-2 text-gray-700"
          >
            <span>+</span> Add Invoicing Account
          </button>
        </div>

        {!showEditForm && (
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-foundations-primary text-white px-6 py-2 rounded-lg hover:opacity-90"
            >
              Save Profile
            </button>
          </div>
        )}
      </form>

      {showEditForm && (
        <div className="mt-4 border border-gray-200 rounded-lg p-6">
          <EditInvoicingForm
            onCancel={() => setShowEditForm(false)}
            initialData={{
              firstName: "Vsl Teviškẹs",
              lastName: "Alkas",
              address: "Rygos g. 26-66, Vilnius",
              city: "Vilnius",
              zip: "01100",
              country: "Latvia",
              province: "vilnius",
            }}
          />
        </div>
      )}

      <div className="bg-foundations-primary text-white p-4 rounded-lg">
        <h2 className="font-medium">► Publisher public profile</h2>
      </div>

      <div className="flex gap-2 text-[#3D52A0]">
        <Link to="/terms" className="hover:underline">
          Terms and conditions
        </Link>
        <span>•</span>
        <Link to="https://rankister.com" className="hover:underline">
          Rankister.com
        </Link>
      </div>
    </div>
  );
};

export default Profile;