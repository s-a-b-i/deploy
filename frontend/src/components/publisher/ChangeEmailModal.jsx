// components/ChangeEmailModal.jsx
import React, { useState } from "react";

const ChangeEmailModal = ({ currentEmail, onClose, onSave }) => {
  const [newEmail, setNewEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSave = () => {
    if (!newEmail.trim()) {
      setEmailError("Email cannot be empty");
      return;
    }

    if (!validateEmail(newEmail)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    onSave(newEmail);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Change Email Address</h2>
        <p className="mb-4 text-gray-700">Current Email: {currentEmail}</p>
        
        <label className="block text-gray-700 mb-2">New Email Address</label>
        <input
          type="email"
          placeholder="Enter new email"
          value={newEmail}
          onChange={(e) => {
            setNewEmail(e.target.value);
            setEmailError("");
          }}
          className={`w-full px-4 py-2 border ${
            emailError ? 'border-red-500' : 'border-gray-200'
          } rounded-lg mb-2`}
        />
        {emailError && (
          <p className="text-red-500 text-sm mb-4">{emailError}</p>
        )}
        
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeEmailModal;