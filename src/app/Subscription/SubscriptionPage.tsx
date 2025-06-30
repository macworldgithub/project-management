// app/account/subscription/page.tsx
"use client";

import { useState } from 'react';

export default function SubscriptionPage() {
  const [activeTab] = useState('subscription');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('annually');
  const [autoRenew, setAutoRenew] = useState(true);

  const plans = [
    {
      name: 'FEATURE',
      storage: '10 GB',
      projects: '5',
      teamMembers: '3',
      apiAccess: '×',
      analytics: '×',
      support: '×',
      price: '$0/year'
    },
    {
      name: 'BASIC',
      storage: '60 GB',
      projects: '20',
      teamMembers: '15',
      apiAccess: '√',
      analytics: '×',
      support: '×',
      price: '$99/year'
    },
    {
      name: 'PRO',
      storage: 'Unlimited',
      projects: 'Unlimited',
      teamMembers: 'Unlimited',
      apiAccess: '√',
      analytics: '√',
      support: '√',
      price: '$199/year'
    },
    {
      name: 'ENTERPRISE',
      storage: 'Unlimited',
      projects: 'Unlimited',
      teamMembers: 'Unlimited',
      apiAccess: '√',
      analytics: '√',
      support: '√',
      price: 'Contact Sales'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-200 p-4 md:p-8 max-sm:-mt-12 max-md:-mt-14 md:-mt-18" >
      <div className="max-w-6xl mx-auto">

        {/* Subscription Content */}
        {activeTab === 'subscription' && (
          <div className="space-y-8">
            {/* Current Plan */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Current Plan</h2>
              <p className="text-gray-600 mb-4">You are currently on the Pro Plan</p>
              
              <div className="border border-gray-200 rounded-lg p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Pro Plan</h3>
                    <p className="text-gray-500">What actually</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-800">$198.00/year</p>
                    <p className="text-gray-500">Renewal on July 13, 2025</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Change Plan
                  </button>
                  <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Cancel Subscription
                  </button>
                </div>
              </div>
            </div>

            {/* Usage Statistics */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Usage Statistics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-500 mb-1">Storage</p>
                  <p className="font-medium">15.2 GB / 50 GB</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-500 mb-1">Projects</p>
                  <p className="font-medium">6 / 20</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-500 mb-1">Team Members</p>
                  <p className="font-medium">12 / 15</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-500 mb-1">API Calls</p>
                  <p className="font-medium">8,542 / 50,000</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '17%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Plan Comparison */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Plan Comparison</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FEATURE</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BASIC</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PRO</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ENTERPRISE</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Storage</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10 GB</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">60 GB</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Unlimited</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Projects</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">20</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Unlimited</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Team Members</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Unlimited</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">API Access</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">×</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">√</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">√</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Advanced Analytics</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">×</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">√</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">√</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Priority Support</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">×</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">√</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">√</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Price</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$0/year</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$99/year</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$199/year</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Billing Cycle */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Billing Cycle</h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Select billing frequency</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-4 w-4 text-blue-600"
                        name="billingCycle"
                        checked={billingCycle === 'monthly'}
                        onChange={() => setBillingCycle('monthly')}
                      />
                      <span className="ml-2 text-gray-700">Monthly ($18.99/month)</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-4 w-4 text-blue-600"
                        name="billingCycle"
                        checked={billingCycle === 'annually'}
                        onChange={() => setBillingCycle('annually')}
                      />
                      <span className="ml-2 text-gray-700">Annually ($189/year) <span className="text-green-600">Save 20%</span></span>
                    </label>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-2">Auto-renewal</p>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                      checked={autoRenew}
                      onChange={() => setAutoRenew(!autoRenew)}
                    />
                    <span className="ml-2 text-gray-700">Automatically renew my subscription</span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1">We'll notify you before your subscription renews</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}