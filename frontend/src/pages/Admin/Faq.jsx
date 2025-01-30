// FAQManagement.js
import React, { useState } from 'react';

const Faq = () => {
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: "How do I withdraw my earnings?",
      answer: "You can withdraw your earnings through PayPal or bank transfer once you reach the minimum threshold of $100.",
      isActive: true
    },
    {
      id: 2,
      question: "What are the platform fees?",
      answer: "We charge 2.5% per transaction and a 1% withdrawal fee.",
      isActive: true
    }
  ]);

  const [newFaq, setNewFaq] = useState({
    question: '',
    answer: ''
  });

  const handleAddFaq = (e) => {
    e.preventDefault();
    if (newFaq.question && newFaq.answer) {
      setFaqs(prev => [...prev, {
        id: prev.length + 1,
        ...newFaq,
        isActive: true
      }]);
      setNewFaq({ question: '', answer: '' });
    }
  };

  return (
    <div className=" rounded-lg shadow-lg">
      <div className=" p-6">
        <h2 className="text-2xl font-bold text-gray-900">FAQ Management</h2>
        <p className="mt-2 text-gray-600">Manage frequently asked questions and their answers</p>
      </div>
      
      {/* Add New FAQ */}
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold mb-4">Add New FAQ</h3>
        <form onSubmit={handleAddFaq}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
              <input
                type="text"
                value={newFaq.question}
                onChange={(e) => setNewFaq({...newFaq, question: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter FAQ question"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
              <textarea
                value={newFaq.answer}
                onChange={(e) => setNewFaq({...newFaq, answer: e.target.value})}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter FAQ answer"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add FAQ
            </button>
          </div>
        </form>
      </div>

      {/* FAQ List */}
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Existing FAQs</h3>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium text-gray-900">{faq.question}</h4>
                <span className={`px-3 py-1 rounded-full text-sm ${faq.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {faq.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{faq.answer}</p>
              <div className="flex space-x-4">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                <button className="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
                <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                  {faq.isActive ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;