// components/publisher/ToApproveList.jsx
import React from 'react';
import { FaGift, FaClock, FaPen, FaChartBar } from 'react-icons/fa';

const ToApproveList = () => {
  const websites = [
    {
      id: 1,
      domain: 'businessfig.com',
      type: 'Newspaper',
      description: 'BusinessFig is an online platform that provides readers with insightful articles, updates, and resources across various business domains. It covers topics such as entrepreneurship, technology, marketing, finance, and general business trends. With a focus on practical advice and informative content, BusinessFig aims to help professionals, business owners, and enthusiasts stay informed about the latest developments and strategies in the corporate world.',
      price: '52,00',
      totalOrders: 0,
      totalRevenue: '0,00',
      thumbnail: '/path-to-businessfig-thumbnail.jpg'
    },
    {
      id: 2,
      domain: 'marketgit.com',
      type: 'Blog',
      description: 'MarketGit appears to be a platform offering insights on technology, business, telecom, digital marketing, e-commerce trends, and reviews on mobile apps and auto news. It focuses on helping businesses and professionals stay informed about evolving market strategies and digital advancements.',
      price: '50,00',
      totalOrders: 0,
      totalRevenue: '0,00',
      thumbnail: '/path-to-marketgit-thumbnail.jpg'
    }
  ];

  return (
    <div className="space-y-4">
      {websites.map((website) => (
        <div key={website.id} className="border border-gray-200 rounded-lg p-4 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Thumbnail */}
            <div className="w-full md:w-48 h-32 bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src={website.thumbnail} 
                alt={website.domain}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                <h3 className="font-medium">{website.domain}</h3>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600 mt-1">
                <span>{website.type}</span>
                <span className="inline-block w-5 h-5 rounded-full bg-gray-200">🌐</span>
              </div>
              
              <p className="text-gray-600 mt-2 text-sm">{website.description}</p>
              
              <div className="flex flex-wrap gap-4 mt-4">
                <div>
                  <div className="text-gray-600">Total orders</div>
                  <div>{website.totalOrders}</div>
                </div>
                <div>
                  <div className="text-gray-600">Total revenue</div>
                  <div>€ {website.totalRevenue}</div>
                </div>
              </div>
            </div>
            
            {/* Price and Actions */}
            <div className="flex flex-col items-end gap-4">
              <div className="text-xl font-bold">€ {website.price}</div>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-200">
                  <FaGift />
                </button>
                <button className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 hover:bg-green-200">
                  <FaClock />
                </button>
                <button className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-200">
                  <FaPen />
                </button>
                <button className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 hover:bg-orange-200">
                  <FaChartBar />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToApproveList;