import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { profileService } from "../../utils/services";
import ChangeEmailModal from "../../components/publisher/ChangeEmailModal";
import EditInvoicingForm from "../../components/publisher/EditInvoicingForm";
import { toast } from "react-hot-toast";

const Profile = () => {
  const user = useAuthStore((state) => state.user);
  const userId = user?._id;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    emailLanguage: "EN",
    publisherCompanyName: "",
    avatar: null,
  });
  const [showEditForm, setShowEditForm] = useState(false);
  const [isEditingOrAdding, setIsEditingOrAdding] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState("");
  const [invoicingAccounts, setInvoicingAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProfileCreated, setIsProfileCreated] = useState(false);
  const [profileId, setProfileId] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (userId) {
          const profileData = await profileService.getProfile(userId);
          if (profileData) {
            setProfileId(profileData._id);
            setFormData({
              firstName: profileData.firstName || "",
              lastName: profileData.lastName || "",
              phone: profileData.phone || "",
              emailLanguage: profileData.emailLanguage || "EN",
              publisherCompanyName: profileData.publisherCompanyName || "",
              avatar: profileData.avatar || null,
            });
            setEmail(profileData.email || "");
            setInvoicingAccounts(profileData.invoicingAccounts || []);
            setIsProfileCreated(true);
          } else {
            setIsProfileCreated(false);
          }
        } else {
          setError("Invalid user ID");
        }
      } catch (err) {
        setError("Failed to load profile data");
        console.error("Error fetching profile data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const profileData = { ...formData, email };
      if (isProfileCreated) {
        await profileService.updateProfile(profileId, profileData);
        toast.success("Profile updated successfully!");
      } else {
        await profileService.createProfile({ ...profileData, userId });
        setIsProfileCreated(true);
        toast.success("Profile created successfully!");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to save profile");
    }
  };

  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("avatar", file);
        formData.append("userId", userId);

        const uploadResponse = await profileService.uploadAvatar(formData);
        setFormData((prev) => ({ ...prev, avatar: uploadResponse.avatarUrl }));
        toast.success("Avatar uploaded successfully!");
      } catch (error) {
        console.error("Avatar upload failed:", error);
        toast.error("Failed to upload avatar");
      }
    }
  };

  const handleSaveInvoicingAccount = (accountData) => {
    if (isEditingOrAdding) {
      const updatedAccounts = invoicingAccounts.map((account, index) =>
        index === accountData.index ? accountData : account
      );
      setInvoicingAccounts(updatedAccounts);
      toast.success("Invoicing account updated!");
    } else {
      setInvoicingAccounts([...invoicingAccounts, accountData]);
      toast.success("Invoicing account added!");
    }
    setShowEditForm(false);
    setIsEditingOrAdding(false);
  };

  const handleEmailChange = (newEmail) => {
    setEmail(newEmail);
    setShowEmailModal(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="space-y-6 px-4 md:px-8 lg:px-12">
      <h1 className="text-2xl font-bold">Profile Settings</h1>

      <div className="bg-foundations-primary text-white p-4 rounded-lg">
        <h2 className="font-medium">▼ Profile</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Form Fields */}
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
        

          {/* Other input fields similar to previous implementation */}
        </div>

        <div>
          <button
            type="button"
            className="text-gray-700 hover:underline"
            onClick={() => setShowEmailModal(true)}
          >
            Click here to change your email address
          </button>
        </div>

        {invoicingAccounts.map((account, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <span>{account.name}</span>
            <span>{account.address}</span>
            <div className="flex gap-2">
              <button
                type="button"
                className="text-yellow-500"
                onClick={() => {
                  setShowEditForm(true);
                  setIsEditingOrAdding(true); // <-- SET STATE WHEN EDITING
                }}
              >
                ✏️
              </button>
              <button
                type="button"
                className="text-red-500"
                onClick={() => removeInvoicingAccount(index)}
              >
                ✖️
              </button>
            </div>
          </div>
        ))}

<button
          type="button"
          className="mt-4 flex items-center gap-2 text-gray-700"
          onClick={() => {
            setShowEditForm(true);
            setIsEditingOrAdding(true); // <-- SET STATE WHEN ADDING
          }}
        >
          <span>+</span> Add Invoicing Account
        </button>

         {!isEditingOrAdding && (
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

      {/* Change Email Modal */}
      {showEmailModal && (
        <ChangeEmailModal
          currentEmail={email}
          onClose={() => setShowEmailModal(false)}
          onSave={handleEmailChange}
        />
      )}

      {/* Edit Invoicing Form */}
      {showEditForm && (
        <div className="mt-4  ">
          <EditInvoicingForm
            onCancel={() => {
              setShowEditForm(false);
              setIsEditingOrAdding(false); // <-- RESET STATE ON CANCEL
            }}
            onSave={handleSaveInvoicingAccount}
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