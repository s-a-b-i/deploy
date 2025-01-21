// components/publisher/ToApproveList.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGift, FaClock, FaPen, FaChartBar } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { websiteService } from '../../utils/services';
import PackageDiscountModal from './PackageDiscountModal';
import HighlightMediaModal from './HighlightMediaModal';

const ToApproveList = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
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
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Websites To Approve</h1>
      
      <div className="space-y-4">
        {websites.map((website) => (
          <div key={website._id} className="border border-gray-200 rounded-lg p-4 space-y-4 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Thumbnail */}
              <div className="w-full md:w-48 h-32 bg-gray-100 rounded-lg overflow-hidden">
                {website.thumbnail ? (
                  <img
                    src={website.thumbnail}
                    alt={website.webDomain}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                  <h3 className="font-medium">{website.webDomain}</h3>
                </div>

                <div className="flex items-center gap-2 text-gray-600 mt-1">
                  <span>{website.mediaType}</span>
                  <span className="inline-block w-5 h-5 rounded-full bg-gray-200">
                    {website.language && <span>{website.language}</span>}
                  </span>
                </div>

                <p className="text-gray-600 mt-2 text-sm line-clamp-3">
                  {website.description}
                </p>

                <div className="flex flex-wrap gap-4 mt-4">
                  <div>
                    <div className="text-gray-600">Total orders</div>
                    <div>{website.totalOrders || 0}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Total revenue</div>
                    <div>€ {website.totalRevenue || '0,00'}</div>
                  </div>
                </div>
              </div>

              {/* Price and Actions */}
              <div className="flex flex-col items-end gap-4">
                <div className="text-xl font-bold">€ {website.price || '0,00'}</div>
                <div className="flex gap-2">
                  <button
                    className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-200 transition-colors"
                    onClick={() => handleGiftClick(website)}
                    title="Package Discount"
                  >
                    <FaGift />
                  </button>
                  <button 
                    className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 hover:bg-green-200 transition-colors"
                    onClick={() => handleClockClick(website)}
                    title="Highlight Media"
                  >
                    <FaClock />
                  </button>
                  <button 
                    className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-200 transition-colors"
                    onClick={() => handleEditClick(website._id)}
                    title="Edit Website"
                  >
                    <FaPen />
                  </button>
                  <button 
                    className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 hover:bg-orange-200 transition-colors"
                    title="Analytics"
                  >
                    <FaChartBar />
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
        onClose={() => setIsModalOpen(false)}
        websiteDomain={selectedWebsite?.webDomain}
      />

      <HighlightMediaModal
        isOpen={isHighlightModalOpen}
        onClose={() => setIsHighlightModalOpen(false)}
        websiteDomain={selectedWebsite?.webDomain}
      />
    </div>
  );
};

export default ToApproveList;