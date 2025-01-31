import React, { useState, useEffect } from "react";
import {
  BanIcon,
  CheckCircleIcon,
  TrashIcon,
  SearchIcon,
  UserIcon,
  UserRemoveIcon,
  MailIcon,
  BadgeCheckIcon,
} from "@heroicons/react/outline";
import { userService } from "../../utils/services";
import { useAuthStore } from "../../store/authStore";
import EmailModal from "../../components/Admin/EmailModal";

const User = () => {
  const { user } = useAuthStore();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedVerification, setSelectedVerification] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
const [selectedEmail, setSelectedEmail] = useState('');


  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        let response;
        if (selectedStatus === "All") {
          response = await userService.getAllUsers(user._id);
        } else {
          response = await userService.getUsersByStatus(
            user._id,
            selectedStatus === "Active"
          );
        }
        setUsers(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [selectedStatus, user._id]);

  useEffect(() => {
    const searchUsers = async () => {
      if (!searchTerm) {
        const response = await userService.getAllUsers(user._id);
        setUsers(response);
        return;
      }

      setIsLoading(true);
      try {
        const response = await userService.searchUsers(user._id, searchTerm);
        setUsers(response);
      } catch (error) {
        console.error("Error searching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchUsers, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm, user._id]);

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await userService.deleteUser(user._id, userId);
        setUsers(users.filter((user) => user._id !== userId));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleToggleStatus = async (userId, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      await userService.changeUserStatus(user._id, userId, newStatus);
      setUsers(
        users.map((user) => {
          if (user._id === userId) {
            return {
              ...user,
              status: newStatus,
            };
          }
          return user;
        })
      );
    } catch (error) {
      console.error("Error changing user status:", error);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "All" ||
      (selectedStatus === "Active" ? user.status : !user.status);
    const matchesVerification =
      selectedVerification === "All" ||
      (selectedVerification === "Verified" ? user.isVerified : !user.isVerified);
    return matchesSearch && matchesStatus && matchesVerification;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleSendEmail = (userEmail) => {
    setSelectedEmail(userEmail);
    setShowEmailModal(true);
  };

  // Add handleCloseEmailModal function
const handleCloseEmailModal = () => {
  setShowEmailModal(false);
  setSelectedEmail('');
};

  return (
    <div className="p-6 bg-gray-50">
      <div className="mb-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="mt-2 text-gray-600">Manage users and their status.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>

          <select
            className="border rounded-lg px-4 py-2"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select
            className="border rounded-lg px-4 py-2"
            value={selectedVerification}
            onChange={(e) => setSelectedVerification(e.target.value)}
          >
            <option value="All">All Verification</option>
            <option value="Verified">Verified</option>
            <option value="Unverified">Unverified</option>
          </select>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          {isLoading ? (
            <div className="p-4 text-center">Loading...</div>
          ) : (
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name/Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Verified
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Join Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {user.status ? (
                          <UserIcon className="h-5 w-5 text-green-500 mr-2" />
                        ) : (
                          <UserRemoveIcon className="h-5 w-5 text-red-500 mr-2" />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <MailIcon className="h-4 w-4 mr-1" />
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.status
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.status ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${
                          user.isVerified
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <BadgeCheckIcon className="h-4 w-4 mr-1" />
                        {user.isVerified ? "Verified" : "Unverified"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(user.lastLogin)}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex space-x-3">
                      <button
      onClick={() => handleSendEmail(user.email)}
      className="text-blue-600 hover:text-blue-900"
      title="Send Email"
    >
      <MailIcon className="h-5 w-5" />
    </button>
                        <button
                          onClick={() => handleToggleStatus(user._id, user.status)}
                          className={`${
                            user.status
                              ? "text-red-600 hover:text-red-900"
                              : "text-green-600 hover:text-green-900"
                          }`}
                          title={user.status ? "Deactivate User" : "Activate User"}
                        >
                          {user.status ? (
                            <BanIcon className="h-5 w-5" />
                          ) : (
                            <CheckCircleIcon className="h-5 w-5" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete User"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {showEmailModal && (
      <EmailModal 
        userEmail={selectedEmail} 
        onClose={handleCloseEmailModal} 
      />
    )}
    </div>
  );
};

export default User;