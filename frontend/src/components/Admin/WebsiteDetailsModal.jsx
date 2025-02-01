import React from 'react';

const WebsiteDetailsModal = ({ website, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
      <div className="relative top-20 mx-auto p-6 max-w-4xl bg-white rounded-xl shadow-lg z-50">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Website Details</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Basic Information</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Media Name</label>
                  <p className="text-gray-900">{website.mediaName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Domain</label>
                  <p className="text-gray-900">{website.webDomain}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Language</label>
                  <p className="text-gray-900">{website.language}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Media Type</label>
                  <p className="text-gray-900">{website.mediaType}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Categories & Topics</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Categories</label>
                  <p className="text-gray-900">{website.category.join(", ")}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Sensitive Topics</label>
                  <p className="text-gray-900">
                    {website.sensitiveTopics?.length > 0 
                      ? website.sensitiveTopics.join(", ") 
                      : "None"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Financial Details</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Price</label>
                  <p className="text-gray-900">${website.price}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Commission</label>
                  <p className="text-gray-900">${website.commission}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Net Profit</label>
                  <p className="text-gray-900">${website.netProfit}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Publication Details</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Publication Duration</label>
                  <p className="text-gray-900">{website.publicationDuration}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Average Publication Time</label>
                  <p className="text-gray-900">{website.averagePublicationTime}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Google News</label>
                  <p className="text-gray-900">{website.googleNews ? "Yes" : "No"}</p>
                </div>
                <div>
  <label className="text-sm font-medium text-gray-500">Facebook</label>
  <p className="text-gray-900">{website.facebook || "N/A"}</p>
</div>
<div>
  <label className="text-sm font-medium text-gray-500">Reddit</label>
  <p className="text-gray-900">{website.reddit || "N/A"}</p>
</div>
<div>
  <label className="text-sm font-medium text-gray-500">Instagram</label>
  <p className="text-gray-900">{website.instagram || "N/A"}</p>
</div>
<div>
  <label className="text-sm font-medium text-gray-500">Tiktok</label>
  <p className="text-gray-900">{website.tiktok || "N/A"}</p>
</div>
<div>
  <label className="text-sm font-medium text-gray-500">Telegram</label>
  <p className="text-gray-900">{website.telegram || "N/A"}</p>
</div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteDetailsModal;