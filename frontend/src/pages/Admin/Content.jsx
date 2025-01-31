import React, { useState, useEffect } from 'react';

const Content = () => {
  const [pendingContent, setPendingContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPendingContent([
        {
          id: 1,
          type: 'product',
          title: 'Gaming Laptop XPS 15',
          publisher: 'Tech Store Inc.',
          status: 'pending',
          dateSubmitted: '2025-01-28',
        },
        {
          id: 2,
          type: 'promo',
          title: 'Summer Sale Campaign',
          publisher: 'Fashion Outlet',
          status: 'flagged',
          dateSubmitted: '2025-01-29',
        },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  const handleApprove = (id) => {
    setPendingContent(prevContent =>
      prevContent.map(item =>
        item.id === id ? { ...item, status: 'approved' } : item
      )
    );
  };

  const handleReject = (id) => {
    setPendingContent(prevContent =>
      prevContent.map(item =>
        item.id === id ? { ...item, status: 'rejected' } : item
      )
    );
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
          <p className="mt-2 text-gray-600">Manage and moderate site content</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {loading ? (
            [1, 2, 3].map((index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6 animate-pulse">
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-10 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))
          ) : (
            <>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-700">Pending Review</h3>
                <p className="text-3xl font-bold text-blue-600 mt-2">
                  {pendingContent.filter(item => item.status === 'pending').length}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-700">Flagged Content</h3>
                <p className="text-3xl font-bold text-red-600 mt-2">
                  {pendingContent.filter(item => item.status === 'flagged').length}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-700">Total Content</h3>
                <p className="text-3xl font-bold text-green-600 mt-2">{pendingContent.length}</p>
              </div>
            </>
          )}
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Content Review</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    {['Title', 'Type', 'Publisher', 'Status', 'Date', 'Actions'].map((heading) => (
                      <th
                        key={heading}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loading ? (
                    [1, 2].map((index) => (
                      <tr key={index} className="animate-pulse">
                        {Array(6).fill().map((_, i) => (
                          <td key={i} className="px-6 py-4">
                            <div className="h-6 bg-gray-300 rounded w-full"></div>
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    pendingContent.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{item.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.publisher}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                            item.status === 'flagged' ? 'bg-red-100 text-red-800' : 
                            item.status === 'approved' ? 'bg-green-100 text-green-800' : 
                            'bg-gray-100 text-gray-800'}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.dateSubmitted}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleApprove(item.id)}
                            className="text-green-600 hover:text-green-900 mr-4"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(item.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
