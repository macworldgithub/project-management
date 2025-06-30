// app/account/billing/page.tsx
"use client";

import { useState } from 'react';

export default function Payment() {
  const [activeTab, setActiveTab] = useState('billing');
  const [billingEmail, setBillingEmail] = useState('billing@yourcompany.com');
  const [companyName, setCompanyName] = useState('Acme Inc.');
  const [streetAddress, setStreetAddress] = useState('123 Main Street');
  const [cityStateZip, setCityStateZip] = useState('San Francisco, CA 94105');
  const [country, setCountry] = useState('United States');
  const [taxId, setTaxId] = useState('US123456789');
//   const [additionalEmails, setAdditionalEmails] = useState('');

  const paymentMethods = [
    { id: 1, type: 'Visa', last4: '4242', expires: '12/2024' },
    { id: 2, type: 'Mastercard', last4: '6888', expires: '09/2025' }
  ];

  const billingHistory = [
    { id: 'INV-2025-0012', date: 'Jun 23, 2025', amount: '$188.00', status: 'Paid' },
    { id: 'INV-2024-0011', date: 'Jun 23, 2024', amount: '$189.00', status: 'Paid' },
    { id: 'INV-2023-0010', date: 'Jun 23, 2023', amount: '$179.00', status: 'Paid' },
    { id: 'INV-2022-0009', date: 'Jun 23, 2022', amount: '$179.00', status: 'Paid' }
  ];

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    // Add save logic here
    console.log('Changes saved');
  };

  return (
    <div className="min-h-screen bg-gray-200 p-4 md:p-8 max-sm:-mt-12 max-md:-mt-14 md:-mt-18">
      <div className="max-w-6xl mx-auto">

        {/* Billing Content */}
        {activeTab === 'billing' && (
          <div className="space-y-8">
            {/* Payment Methods */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Methods</h2>
              
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-6 rounded flex items-center justify-center ${method.type === 'Visa' ? 'bg-blue-900' : 'bg-red-600'}`}>
                        <span className="text-white text-xs font-bold">{method.type === 'Visa' ? 'VISA' : 'MC'}</span>
                      </div>
                      <div>
                        <p className="font-medium">{method.type} ending in {method.last4}</p>
                        <p className="text-sm text-gray-500">Expires {method.expires}</p>
                      </div>
                    </div>
                    <button className="text-sm text-red-600 hover:text-red-800">
                      Remove
                    </button>
                  </div>
                ))}
                
                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Add Payment Method
                </button>
              </div>
            </div>

            {/* Billing History */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Billing History</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">INVOICE</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DATE</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AMOUNT</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {billingHistory.map((invoice) => (
                      <tr key={invoice.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{invoice.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {invoice.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900">Download</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Invoice Settings */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Invoice Settings</h2>
              
              <form onSubmit={handleSaveChanges}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="billingEmail" className="block text-sm font-medium text-gray-700 mb-1">
                      Billing Email
                    </label>
                    <input
                      type="email"
                      id="billingEmail"
                      value={billingEmail}
                      onChange={(e) => setBillingEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700 mb-1">
                      Billing Address
                    </label>
                    <input
                      type="text"
                      id="streetAddress"
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Street address"
                    />
                    <input
                      type="text"
                      id="cityStateZip"
                      value={cityStateZip}
                      onChange={(e) => setCityStateZip(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="City, State ZIP"
                    />
                    <input
                      type="text"
                      id="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Country"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="taxId" className="block text-sm font-medium text-gray-700 mb-1">
                      Tax ID (Optional)
                    </label>
                    <input
                      type="text"
                      id="taxId"
                      value={taxId}
                      onChange={(e) => setTaxId(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Send receipts to additional email addresses
                    </p>
                  </div>
                </div>

                {/* Tax Information */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-md font-medium text-gray-800 mb-4">Tax Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="taxRegion" className="block text-sm font-medium text-gray-700 mb-1">
                        Tax Region
                      </label>
                      <select
                        id="taxRegion"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option>United States</option>
                        <option>European Union</option>
                        <option>United Kingdom</option>
                        <option>Canada</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="taxIdType" className="block text-sm font-medium text-gray-700 mb-1">
                        Tax ID Type
                      </label>
                      <select
                        id="taxIdType"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option>EIN (Employer Identification Number)</option>
                        <option>VAT (Value Added Tax)</option>
                        <option>GST (Goods and Services Tax)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end gap-3">
                  <button
                    type="button"
                    className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}