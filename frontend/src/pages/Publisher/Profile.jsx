import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import {
  profileService,
  invoiceAccountService,
  emailChangeService,
} from "../../utils/services";
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

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [isEditingOrAdding, setIsEditingOrAdding] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState("");
  const [invoicingAccounts, setInvoicingAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProfileCreated, setIsProfileCreated] = useState(false);
  const [profileId, setProfileId] = useState(null);
  const [editingAccount, setEditingAccount] = useState(null);
  
  const [isProfileSectionOpen, setIsProfileSectionOpen] = useState(true);
  const [isInvoicingSectionOpen, setIsInvoicingSectionOpen] = useState(true);

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
            setAvatarPreview(profileData.avatar || null);
            setIsProfileCreated(true);
          }

          const accounts = await invoiceAccountService.getInvoiceAccounts(userId);
          setInvoicingAccounts(accounts);
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

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      
      // Append text fields
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== undefined) {
          formDataToSend.append(key, formData[key]);
        }
      });
      
      // Append email
      formDataToSend.append('email', email);
      
      // Append avatar file if selected
      if (avatarFile) {
        formDataToSend.append('avatar', avatarFile);
      }

      if (isProfileCreated) {
        await profileService.updateProfile(profileId, formDataToSend);
        toast.success("Profile updated successfully!");

        useAuthStore.getState().setUserProfileImage(avatarPreview);
      } else {
        await profileService.createProfile(formDataToSend);
        setIsProfileCreated(true);
        toast.success("Profile created successfully!");

        useAuthStore.getState().setUserProfileImage(avatarPreview);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to save profile");
    }
  };


  const handleSaveInvoicingAccount = async (accountData) => {
    try {
      if (editingAccount) {
        // Update existing account
        const updatedAccount = await invoiceAccountService.updateInvoiceAccount(
          editingAccount._id,
          { ...accountData, userId }
        );
        const updatedAccounts = invoicingAccounts.map((account) =>
          account._id === editingAccount._id ? updatedAccount : account
        );
        setInvoicingAccounts(updatedAccounts);
        toast.success("Invoicing account updated!");
      } else {
        // Create new account only if no existing account
        const existingAccount = invoicingAccounts.find(
          (account) =>
            account.organizationName === accountData.organizationName ||
            (account.firstName === accountData.firstName &&
              account.lastName === accountData.lastName)
        );

        if (!existingAccount) {
          const newAccount = await invoiceAccountService.createInvoiceAccount({
            ...accountData,
            userId,
          });
          setInvoicingAccounts([...invoicingAccounts, newAccount]);
          toast.success("Invoicing account added!");
        } else {
          toast.error("Account already exists");
        }
      }

      setShowEditForm(false);
      setIsEditingOrAdding(false);
      setEditingAccount(null);
    } catch (error) {
      console.error("Error saving invoicing account:", error);
      toast.error("Failed to save invoicing account");
    }
  };

  const handleRemoveInvoicingAccount = async (accountId) => {
    try {
      await invoiceAccountService.deleteInvoiceAccount(accountId);
      setInvoicingAccounts(
        invoicingAccounts.filter((account) => account._id !== accountId)
      );
      toast.success("Invoicing account removed!");
    } catch (error) {
      console.error("Error removing invoicing account:", error);
      toast.error("Failed to remove invoicing account");
    }
  };

  const handleEditInvoicingAccount = (account) => {
    setEditingAccount(account);
    setShowEditForm(true);
    setIsEditingOrAdding(true);
  };

  const handleEmailChange = async (newEmail) => {
    try {
      const lastLogin = useAuthStore.getState().lastLogin;
      const now = new Date();
      const oneDayInMs = 24 * 60 * 60 * 1000;

      if (now - new Date(lastLogin) > oneDayInMs) {
        toast.error(
          "It's been more than a day since your last login. Please log in again to change your email."
        );
        await useAuthStore.getState().logout();
        return;
      }

      await emailChangeService.requestEmailChange(userId, newEmail);

      const verificationToken = prompt(
        "Enter verification token sent to your new email"
      );

      if (verificationToken) {
        await emailChangeService.verifyEmailChange(
          userId,
          verificationToken,
          newEmail
        );

        setEmail(newEmail);
        toast.success("Email changed successfully!");
        await useAuthStore.getState().logout();
      }
    } catch (error) {
      toast.error(error.message || "Failed to change email");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="space-y-6 px-4 md:px-8 lg:px-12">
      <h1 className="text-2xl font-bold">Profile Settings</h1>

      {/* Profile Section */}
      <div 
        className="bg-gradient-to-r from-foundations-primary to-foundations-secondary text-white p-4 rounded-lg cursor-pointer flex justify-between items-center"
        onClick={() => setIsProfileSectionOpen(!isProfileSectionOpen)}
      >
        <h2 className="font-medium">
          {isProfileSectionOpen ? '▼' : '►'} Profile
        </h2>
        <span>{isProfileSectionOpen ? 'Close' : 'Open'}</span>
      </div>

      {isProfileSectionOpen && (
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
            <button
              type="button"
              className="px-4 py-2 bg-foundations-primary text-white rounded-lg hover:bg-blue-100 transition-colors"
              onClick={() => setShowEmailModal(true)}
            >
              Click here to Change Email
            </button>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-foundations-primary text-white px-6 py-2 rounded-lg hover:opacity-90"
            >
              Save Profile
            </button>
          </div>
        </form>
      )}

      {/* Invoicing Accounts Section */}
      <div 
        className="bg-gradient-to-r from-foundations-primary to-foundations-secondary text-white p-4 rounded-lg cursor-pointer flex justify-between items-center mt-6"
        onClick={() => setIsInvoicingSectionOpen(!isInvoicingSectionOpen)}
      >
        <h2 className="font-medium">
          {isInvoicingSectionOpen ? '▼' : '►'} Invoicing Accounts
        </h2>
        <span>{isInvoicingSectionOpen ? 'Close' : 'Open'}</span>
      </div>

      {isInvoicingSectionOpen && (
        <div>
          {invoicingAccounts.length === 0 ? (
            <div className="text-gray-500 text-center py-4">
              No invoicing accounts found
            </div>
          ) : (
            invoicingAccounts.map((account) => (
              <div
                key={account._id}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow mb-2"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-lg ${
                        account.accountType === 'business'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {account.accountType === 'business' ? 'Business' : 'Personal'}
                    </span>
                    <span className="text-lg font-bold text-gray-700">
                      {account.accountType === 'business'
                        ? account.organizationName
                        : `${account.firstName} ${account.lastName}`}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{account.address}</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="text-yellow-500 hover:text-yellow-600"
                    onClick={() => handleEditInvoicingAccount(account)}
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => handleRemoveInvoicingAccount(account._id)}
                    title="Remove"
                  >
                    ✖️
                  </button>
                </div>
              </div>
            ))
          )}

          <button
            type="button"
            className="mt-4 flex items-center gap-2 text-white bg-foundations-primary px-4 py-2 rounded-lg"
            onClick={() => {
              setShowEditForm(true);
              setIsEditingOrAdding(true);
              setEditingAccount(null);
            }}
          >
            <span>+</span> Add Invoicing Account
          </button>
        </div>
      )}

      {/* Change Email Modal */}
      {showEmailModal && (
        <ChangeEmailModal
          currentEmail={email}
          onClose={() => setShowEmailModal(false)}
          onSave={handleEmailChange}
          userId={userId}
        />
      )}

      {/* Edit Invoicing Form */}
      {showEditForm && (
        <div className="mt-4">
          <EditInvoicingForm
            onCancel={() => {
              setShowEditForm(false);
              setIsEditingOrAdding(false);
              setEditingAccount(null);
            }}
            onSave={handleSaveInvoicingAccount}
            initialData={editingAccount || {}}
            userId={userId}
            editMode={!!editingAccount}
            accountId={editingAccount?._id}
          />
        </div>
      )}

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