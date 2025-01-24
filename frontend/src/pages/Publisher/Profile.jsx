import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { profileService, invoiceAccountService } from "../../utils/services";
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
  const [editingAccount, setEditingAccount] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (userId) {
          // Fetch profile data
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
            setIsProfileCreated(true);
          }

          // Fetch invoicing accounts
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

  const handleSaveInvoicingAccount = async (accountData) => {
    try {
      if (editingAccount) {
        // Update existing account
        const updatedAccount = await invoiceAccountService.updateInvoiceAccount(
          editingAccount._id, 
          { ...accountData, userId }
        );
        const updatedAccounts = invoicingAccounts.map(account => 
          account._id === editingAccount._id ? updatedAccount : account
        );
        setInvoicingAccounts(updatedAccounts);
        toast.success("Invoicing account updated!");
      } else {
        // Create new account only if no existing account
        const existingAccount = invoicingAccounts.find(
          account => account.organizationName === accountData.organizationName ||
                     (account.firstName === accountData.firstName && 
                      account.lastName === accountData.lastName)
        );
  
        if (!existingAccount) {
          const newAccount = await invoiceAccountService.createInvoiceAccount({
            ...accountData,
            userId
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
      setInvoicingAccounts(invoicingAccounts.filter(account => account._id !== accountId));
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

        {invoicingAccounts.length === 0 ? (
        <div className="text-gray-500 text-center py-4">
          No invoicing accounts found
        </div>
      ) : (
        invoicingAccounts.map((account) => (
          <div
            key={account._id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <span>{account.accountType === 'business' ? account.organizationName : `${account.firstName} ${account.lastName}`}</span>
              <div className="text-gray-500 text-sm">{account.address}</div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="text-yellow-500"
                onClick={() => handleEditInvoicingAccount(account)}
              >
                ✏️
              </button>
              <button
                type="button"
                className="text-red-500"
                onClick={() => handleRemoveInvoicingAccount(account._id)}
              >
                ✖️
              </button>
            </div>
          </div>
        ))
      )}

      <button
        type="button"
        className="mt-4 flex items-center gap-2 text-gray-700"
        onClick={() => {
          setShowEditForm(true);
          setIsEditingOrAdding(true);
          setEditingAccount(null);
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