import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGift, FaClock, FaPen, FaChartBar, FaGlobe } from 'react-icons/fa';
import { websiteService } from '../../utils/services';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';
import PackageDiscountModal from './PackageDiscountModal';
import HighlightMediaModal from './HighlightMediaModal';

const ToApproveList = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user); // Fetch user from the auth store
  const [websites, setWebsites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHighlightModalOpen, setIsHighlightModalOpen] = useState(false);
  const [selectedWebsite, setSelectedWebsite] = useState(null);
  const [selectedMonths, setSelectedMonths] = useState('1');

  // Fetch pending websites on component mount
  useEffect(() => {
    if (user?._id) {
      console.log('Fetching websites for userId:', user._id);
      fetchWebsites();
    } else {
      console.warn('User not found, skipping fetch.');
    }
  }, [user]);
  

  // Fetch websites from the backend
  const fetchWebsites = async () => {
    try {
      setIsLoading(true); // Set loading state
      const response = await websiteService.getWebsitesNotApproved(user._id); // Fetch websites
      setWebsites(response); // Set websites in state
      setError(null); // Clear any previous error
    } catch (err) {
      setError('Failed to fetch websites'); // Handle errors
      toast.error('Error loading websites');
    } finally {
      setIsLoading(false); // Remove loading state
    }
  };

  // Handle modal close with optional updated data
  const handleModalClose = (updatedData = null) => {
    if (updatedData && selectedWebsite) {
      setWebsites((prevWebsites) =>
        prevWebsites.map((website) =>
          website._id === selectedWebsite._id ? { ...website, ...updatedData } : website
        )
      );
    }
    setIsModalOpen(false);
    setIsHighlightModalOpen(false);
    setSelectedWebsite(null);
  };

  // Open the Package Discount modal
  const handleGiftClick = (website) => {
    setSelectedWebsite(website);
    setIsModalOpen(true);
  };

  // Open the Highlight Media modal
  const handleClockClick = (website) => {
    setSelectedWebsite(website);
    setSelectedMonths(website.highlightMonths || '1');
    setIsHighlightModalOpen(true);
  };

  // Navigate to the Edit Website page
  const handleEditClick = (websiteId) => {
    navigate(`/publisher/products/${websiteId}/edit`);
  };

  // Render loading spinner
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Render error message
  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        {error}
      </div>
    );
  }

  // Render message if user is not logged in
  if (!user) {
    return (
      <div className="text-center text-gray-600 p-4">
        Please log in to view your websites.
      </div>
    );
  }

  // Render message if no pending websites are found
  if (websites.length === 0) {
    return (
      <div className="text-center text-gray-600 p-4">
        No pending websites found.
      </div>
    );
  }

  // Render the list of pending websites
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">Websites Pending Approval</h2>
      <div className="space-y-4">
        {websites.map((website) => (
          <div
            key={website._id}
            className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start gap-6">
              {/* Left: Thumbnail */}
              <div className="w-48 h-32 rounded-lg overflow-hidden flex-shrink-0 bg-gray-50">
                {website.thumbnail ? (
                  <img
                    src={website.thumbnail}
                    alt={website.webDomain}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
              </div>

              {/* Middle: Content */}
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <h3 className="text-lg font-semibold">{website.webDomain}</h3>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-gray-600">{website.mediaType}</span>
                  <FaGlobe className="text-gray-400" />
                </div>

                <div className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {website.description}
                </div>

                <div className="flex gap-12">
                  <div>
                    <div className="text-sm text-gray-500">Language</div>
                    <div className="font-medium">{website.language}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Category</div>
                    <div className="font-medium">{website.category.join(', ')}</div>
                  </div>
                </div>
              </div>

              {/* Right: Price and Actions */}
              <div className="flex flex-col items-end gap-4">
                <div className="text-2xl font-bold">€ {website.price}</div>
                <div className="flex gap-2">
                  <button
                    className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 hover:bg-indigo-200 transition-colors"
                    onClick={() => handleGiftClick(website)}
                    title="Package Discount"
                  >
                    <FaGift size={18} />
                  </button>
                  <button
                    className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 hover:bg-emerald-200 transition-colors"
                    onClick={() => handleClockClick(website)}
                    title="Highlight Media"
                  >
                    <FaClock size={18} />
                  </button>
                  <button
                    className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-200 transition-colors"
                    onClick={() => handleEditClick(website._id)}
                    title="Edit Website"
                  >
                    <FaPen size={18} />
                  </button>
                  <button
                    className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 hover:bg-orange-200 transition-colors"
                    title="Analytics"
                  >
                    <FaChartBar size={18} />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-4 text-sm text-yellow-600 bg-yellow-50 p-2 rounded">
              Status: Pending Approval
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      <PackageDiscountModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        websiteDomain={selectedWebsite?.webDomain}
        websiteId={selectedWebsite?._id}
        discountprop={selectedWebsite?.discount}
        slotsprop={selectedWebsite?.slots}
        pricePerPublicationprop={selectedWebsite?.pricePerPublication}
      />

      <HighlightMediaModal
        isOpen={isHighlightModalOpen}
        onClose={handleModalClose}
        websiteDomain={selectedWebsite?.webDomain}
        websiteId={selectedWebsite?._id}
        selectedMonths={selectedMonths}
        onMonthsChange={setSelectedMonths}
      />
    </div>
  );
};

export default ToApproveList;
