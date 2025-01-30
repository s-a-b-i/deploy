import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import {
  profileService,
  emailChangeService,
} from "../../utils/services";
import ProfileSection from "../../components/publisher/ProfileSection";
import ChangeEmailModal from "../../components/publisher/ChangeEmailModal";
import { toast } from "react-hot-toast";
import Loader from "../../components/Loader";

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
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProfileCreated, setIsProfileCreated] = useState(false);
  const [profileId, setProfileId] = useState(null);
  const [isProfileSectionOpen, setIsProfileSectionOpen] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
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
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      
      formDataToSend.append('userId', userId);
      
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== undefined) {
          formDataToSend.append(key, formData[key]);
        }
      });
      
      formDataToSend.append('email', email);
      
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
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = async (newEmail) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  return (
    <div className="space-y-6 px-4 md:px-8 lg:px-12">
      <h1 className="text-2xl font-bold">Profile Settings</h1>

      <ProfileSection
        isOpen={isProfileSectionOpen}
        toggleSection={() => setIsProfileSectionOpen(!isProfileSectionOpen)}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        handleAvatarChange={handleAvatarChange}
        avatarPreview={avatarPreview}
        email={email}
        setShowEmailModal={setShowEmailModal}
      />

      {showEmailModal && (
        <ChangeEmailModal
          currentEmail={email}
          onClose={() => setShowEmailModal(false)}
          onSave={handleEmailChange}
          userId={userId}
        />
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