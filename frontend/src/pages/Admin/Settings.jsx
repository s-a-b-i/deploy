import React, { useState } from 'react';

const Settings = () => {
  // State for platform settings
  const [platformSettings, setPlatformSettings] = useState({
    paymentMethods: {
      paypal: true,
      stripe: true,
      bankTransfer: false
    },
    notifications: {
      emailAlerts: true,
      pushNotifications: true,
      smsAlerts: false
    },
    fees: {
      transactionFee: 2.5,
      withdrawalFee: 1.0
    }
  });

  // State for FAQs
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

  // State for new FAQ
  const [newFaq, setNewFaq] = useState({
    question: '',
    answer: ''
  });

  const handleSettingChange = (category, setting) => {
    setPlatformSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting]
      }
    }));
  };

  const handleFeeChange = (feeType, value) => {
    setPlatformSettings(prev => ({
      ...prev,
      fees: {
        ...prev.fees,
        [feeType]: parseFloat(value)
      }
    }));
  };

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
    <div className="min-h-screen  p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Platform Settings</h1>
          <p className="mt-2 text-gray-600">Manage platform configuration and support information</p>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 gap-8">
          {/* Payment Methods */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Methods</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={platformSettings.paymentMethods.paypal}
                    onChange={() => handleSettingChange('paymentMethods', 'paypal')}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">PayPal</span>
                </label>
                <button className="text-sm text-blue-600 hover:text-blue-800">Configure</button>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={platformSettings.paymentMethods.stripe}
                    onChange={() => handleSettingChange('paymentMethods', 'stripe')}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">Stripe</span>
                </label>
                <button className="text-sm text-blue-600 hover:text-blue-800">Configure</button>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={platformSettings.paymentMethods.bankTransfer}
                    onChange={() => handleSettingChange('paymentMethods', 'bankTransfer')}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">Bank Transfer</span>
                </label>
                <button className="text-sm text-blue-600 hover:text-blue-800">Configure</button>
              </div>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Notification Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={platformSettings.notifications.emailAlerts}
                    onChange={() => handleSettingChange('notifications', 'emailAlerts')}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">Email Alerts</span>
                </label>
              </div>
              <div className="flex items-center">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={platformSettings.notifications.pushNotifications}
                    onChange={() => handleSettingChange('notifications', 'pushNotifications')}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">Push Notifications</span>
                </label>
              </div>
              <div className="flex items-center">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={platformSettings.notifications.smsAlerts}
                    onChange={() => handleSettingChange('notifications', 'smsAlerts')}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">SMS Alerts</span>
                </label>
              </div>
            </div>
          </div>

          {/* Platform Fees */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Platform Fees</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transaction Fee (%)
                </label>
                <input
                  type="number"
                  value={platformSettings.fees.transactionFee}
                  onChange={(e) => handleFeeChange('transactionFee', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Withdrawal Fee (%)
                </label>
                <input
                  type="number"
                  value={platformSettings.fees.withdrawalFee}
                  onChange={(e) => handleFeeChange('withdrawalFee', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* FAQ Management */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">FAQ Management</h2>
            
            {/* Add New FAQ */}
            <form onSubmit={handleAddFaq} className="mb-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Question
                  </label>
                  <input
                    type="text"
                    value={newFaq.question}
                    onChange={(e) => setNewFaq({...newFaq, question: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Answer
                  </label>
                  <textarea
                    value={newFaq.answer}
                    onChange={(e) => setNewFaq({...newFaq, answer: e.target.value})}
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Add FAQ
                </button>
              </div>
            </form>

            {/* FAQ List */}
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.id} className="border border-gray-200 rounded-md p-4">
                  <div className="font-medium text-gray-900 mb-2">{faq.question}</div>
                  <div className="text-gray-600 mb-3">{faq.answer}</div>
                  <div className="flex space-x-3">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                    <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                    <button className="text-gray-600 hover:text-gray-800 text-sm">
                      {faq.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="mt-6">
          <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
            Save All Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;