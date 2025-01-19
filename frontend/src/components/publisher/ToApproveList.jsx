// src/components/ToApproveList.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ToApproveList = () => {
  return (
    <div className="space-y-6">
      {/* Product Card */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex gap-4">
          {/* Thumbnail */}
          <div className="w-48 h-32">
            <img
              src="/placeholder-image.jpg"
              alt="Website thumbnail"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">businessfig.com</span>
                  <span className="text-gray-500">Newspaper</span>
                  <span className="inline-block">🌐</span>
                </div>
                <p className="text-gray-600 mt-2">
                  BusinessFig is an online platform that provides readers with insightful articles, updates, and resources
                  across various business domains. It covers topics such as entrepreneurship, technology, marketing,
                  finance, and general business trends.
                </p>
              </div>
              <div className="text-xl font-bold">€ 52,00</div>
            </div>

            {/* Stats */}
            <div className="mt-4 flex gap-8">
              <div>
                <span className="text-gray-500">Total orders</span>
                <span className="ml-2">0</span>
              </div>
              <div>
                <span className="text-gray-500">Total revenue</span>
                <span className="ml-2">€ 0,00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Product Card - MarketGit */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex gap-4">
          {/* Thumbnail */}
          <div className="w-48 h-32">
            <img
              src="/placeholder-image.jpg"
              alt="Website thumbnail"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">marketgit.com</span>
                  <span className="text-gray-500">Blog</span>
                  <span className="inline-block">🌐</span>
                </div>
                <p className="text-gray-600 mt-2">
                  MarketGit appears to be a platform offering insights on technology, business, telecom, digital
                  marketing, e-commerce trends, and reviews on mobile apps and auto news. It focuses on helping
                  businesses and professionals stay informed about evolving market strategies and digital advancements.
                </p>
              </div>
              <div className="text-xl font-bold">€ 50,00</div>
            </div>

            {/* Stats */}
            <div className="mt-4 flex gap-8">
              <div>
                <span className="text-gray-500">Total orders</span>
                <span className="ml-2">0</span>
              </div>
              <div>
                <span className="text-gray-500">Total revenue</span>
                <span className="ml-2">€ 0,00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToApproveList;