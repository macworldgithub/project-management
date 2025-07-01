// app/account/privacy/page.tsx
"use client";

import { useState } from 'react';

export default function ConnectedAccount() {
  const [activeTab] = useState('privacy');
  const [connectedAccounts, setConnectedAccounts] = useState([
    { provider: 'Google', username: 'emily.johnson@gmail.com', connected: true },
    { provider: 'GitHub', username: 'emilyjohnson', connected: true },
    { provider: 'Slack', username: '', connected: false }
  ]);
  const [usageDataEnabled, setUsageDataEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(true);

  const handleAccountAction = (provider: string) => {
    setConnectedAccounts(accounts =>
      accounts.map(account =>
        account.provider === provider
          ? { ...account, connected: !account.connected }
          : account
      )
    );
  };

  const handleExportData = () => {
    console.log('Exporting data...');
  };

  const handleDeleteAccount = () => {
    console.log('Deleting account...');
  };

  const handleSaveChanges = () => {
    console.log('Changes saved');
  };

  const handleCancel = () => {
    console.log('Changes cancelled');
  };

  return (
    <div className=" bg-gray-200 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Privacy Content */}
        {activeTab === 'privacy' && (
          <div className="space-y-8">
            {/* Connected Accounts */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Connected Accounts</h2>
              
              <div className="space-y-4">
                {connectedAccounts.map((account) => (
                  <div key={account.provider} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{account.provider}</h3>
                      <p className="text-sm text-gray-500">
                        {account.connected ? `Connected as ${account.username}` : 'Not connected'}
                      </p>
                    </div>
                    <button
                      onClick={() => handleAccountAction(account.provider)}
                      className={`px-3 py-1 text-sm rounded-md ${account.connected ? 'text-red-600 hover:text-red-800 border border-red-200 hover:bg-red-50' : 'text-blue-600 hover:text-blue-800 border border-blue-200 hover:bg-blue-50'}`}
                    >
                      {account.connected ? 'Disconnect' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Data & Privacy */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Data & Privacy</h2>
              
              <div className="space-y-6">
                {/* Usage Data Collection */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <div>
                    <h3 className="font-medium text-gray-900">Usage data collection</h3>
                    <p className="text-sm text-gray-500">
                      Allow us to collect anonymous usage data to improve our services
                    </p>
                  </div>
                  <button
                    onClick={() => setUsageDataEnabled(!usageDataEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${usageDataEnabled ? 'bg-blue-600' : 'bg-gray-200'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${usageDataEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

                {/* Marketing Communications */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <div>
                    <h3 className="font-medium text-gray-900">Marketing communications</h3>
                    <p className="text-sm text-gray-500">
                      Receive updates, offers, and news about our products
                    </p>
                  </div>
                  <button
                    onClick={() => setMarketingEnabled(!marketingEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${marketingEnabled ? 'bg-blue-600' : 'bg-gray-200'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${marketingEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

                {/* Export Data */}
                <div className="flex items-center justify-between p-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Export your data</h3>
                    <p className="text-sm text-gray-500">
                      Download a copy of your personal data
                    </p>
                  </div>
                  <button
                    onClick={handleExportData}
                    className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 border border-blue-200 rounded-md hover:bg-blue-50"
                  >
                    Request Data Export
                  </button>
                </div>
              </div>
            </div>

            {/* Delete Account */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-red-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Delete Account</h2>
              <p className="text-sm text-gray-600 mb-4">
                Once you delete your account, all of your data will be permanently removed. This action cannot be undone.
              </p>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Delete Account
              </button>
            </div>

            {/* Save/Cancel Buttons - Added at the bottom right */}
            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}