// components/publisher/ToApproveList.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGift, FaClock, FaPen, FaChartBar ,FaGlobe } from 'react-icons/fa';


import { websiteService } from '../../utils/services';
import toast from 'react-hot-toast';
import PackageDiscountModal from './PackageDiscountModal';
import HighlightMediaModal from './HighlightMediaModal';

const ToApproveList = () => {
  const navigate = useNavigate();
  const [selectedMonths, setSelectedMonths] = useState('1');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHighlightModalOpen, setIsHighlightModalOpen] = useState(false);
  const [selectedWebsite, setSelectedWebsite] = useState(null);
  const [websites, setWebsites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWebsites();
  }, []);

  const fetchWebsites = async () => {
    try {
      setIsLoading(true);
      const data = await websiteService.getWebsites();
      setWebsites(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch websites');
      toast.error('Error loading websites');
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = async () => {
    setIsModalOpen(false);
    setIsHighlightModalOpen(false);
    await fetchWebsites(); // Refresh the list after modal actions
  };

  const handleGiftClick = (website) => {
    setSelectedWebsite(website);
    setIsModalOpen(true);
  };

  const handleClockClick = (website) => {
    setSelectedWebsite(website);
    setIsHighlightModalOpen(true);
  };

  const handleEditClick = (websiteId) => {
    navigate(`/publisher/products/${websiteId}/edit`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        {error}
      </div>
    );
  }

  if (websites.length === 0) {
    return (
      <div className="text-center text-gray-600 p-4">
        No websites found.
      </div>
    );
  }


  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="space-y-4">
        {websites.map((website) => (
          <div 
            key={website._id} 
            className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start gap-6">
              {/* Left: Image */}
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

                 {/* Description */}
                 <div className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {website.description}
                </div>

                <div className="flex gap-12">
                  <div>
                    <div className="text-sm text-gray-500">Total orders</div>
                    <div className="font-medium">{website.totalOrders || 0}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Total revenue</div>
                    <div className="font-medium">€ {website.totalRevenue || '0,00'}</div>
                  </div>
                </div>
              </div>

              {/* Right: Price and Actions */}
              <div className="flex flex-col items-end gap-4">
                <div className="text-2xl font-bold">€ {website.price || '149,99'}</div>
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
          </div>
        ))}
      </div>

      {/* Modals */}
      <PackageDiscountModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        websiteDomain={selectedWebsite?.webDomain}
        websiteId={selectedWebsite?._id}
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