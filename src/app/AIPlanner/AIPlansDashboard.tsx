'use client';

import { FaCog, FaFilter, FaThList, FaRegClock } from 'react-icons/fa';

export default function AIPlansDashboard() {
  return (
    <div className="min-h-screen bg-gray-200 p-4 sm:p-8 ">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Top Settings Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-black">Automated Scheduling</h3>
              <FaRegClock className="text-gray-400" />
            </div>
            <p className=" text-gray-700 mb-4 text-sm">
              AI-powered task scheduling with intelligent dependency management and critical path analysis.
            </p>
            <div className="space-y-2">
              {['Timeline Optimization', 'Critical Path Analysis', 'Dependency Management'].map(label => (
                <div key={label} className="flex justify-between text-xs text-black font-medium">
                  <span>{label}</span>
                  <input type="checkbox" defaultChecked className="toggle" />
                </div>
              ))}
            </div>
            <div className="h-24 mt-4 bg-gradient-to-t from-blue-100 to-blue-400 rounded" />
            <button className="mt-4 w-full bg-gray-100 py-2 rounded text-sm text-gray-700 flex items-center justify-center gap-2">
              <FaCog /> Configure Settings
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-black">Risk Assessment</h3>
              <span className="text-yellow-500 text-xl font-bold">⚠️</span>
            </div>
            <p className="text-sm text-gray-700 mb-4">
              Predictive risk analysis with mitigation strategies and impact assessment for your project.
            </p>
            <div className="space-y-2">
              {['Risk Prediction', 'Mitigation Suggestions', 'Impact Analysis'].map(label => (
                <div key={label} className="flex justify-between text-xs text-black font-medium">
                  <span>{label}</span>
                  <input type="checkbox" defaultChecked className="toggle" />
                </div>
              ))}
            </div>
            <div className="h-24 mt-4 bg-gradient-to-r from-green-600 via-orange-400 to-red-400 rounded" />
            <button className="mt-4 w-full bg-gray-100 py-2 rounded text-sm text-gray-700 flex items-center justify-center gap-2">
              <FaCog /> Configure Settings
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-black">Resource Allocation</h3>
              <span className="text-green-600 text-xl font-bold">🧑‍💼</span>
            </div>
            <p className="text-sm text-gray-700 mb-4">
              Optimize team assignments and resource utilization with AI-powered allocation strategies.
            </p>
            <div className="space-y-2">
              {['Workload Balancing', 'Skill Matching', 'Cost Optimization'].map(label => (
                <div key={label} className="flex justify-between text-xs text-black font-medium">
                  <span>{label}</span>
                  <input type="checkbox" defaultChecked className="toggle" />
                </div>
              ))}
            </div>
            <div className="h-24 mt-4 bg-gradient-to-tr from-red-300 via-blue-400 to-green-400 rounded-full" />
            <button className="mt-4 w-full bg-gray-100 py-2 rounded text-sm text-gray-700 flex items-center justify-center gap-2">
              <FaCog /> Configure Settings
            </button>
          </div>
        </div>

        {/* AI Generated Plans */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-black">AI-Generated Plans</h2>
            <div className="flex items-center gap-2 text-sm text-black">
              <button className="bg-white px-3 py-1 rounded shadow-sm flex items-center gap-1"><FaFilter /> Filter</button>
              <button className="bg-white px-3 py-1 rounded shadow-sm flex items-center gap-1"><FaThList /> Sort By</button>
              <button className="bg-white px-3 py-1 rounded shadow-sm flex items-center gap-1"><FaRegClock /> View</button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Optimized Timeline', duration: '3 months, 2 weeks', utilization: 85, risk: 'Low', badge: 'Recommended', color: 'green' },
              { title: 'Cost Efficient', duration: '4 months', utilization: 70, risk: 'Medium', badge: 'Alternative', color: 'blue' },
              { title: 'Accelerated Timeline', duration: '2 months, 3 weeks', utilization: 95, risk: 'High', badge: 'Aggressive', color: 'orange' },
            ].map((plan, i) => (
              <div key={i} className="bg-white rounded-xl shadow p-5">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-black">{plan.title}</h3>
                  <span className={`text-xs bg-${plan.color}-100 text-${plan.color}-700 px-2 py-0.5 rounded`}>{plan.badge}</span>
                </div>
                <p className="text-sm text-gray-700 mt-2 font-medium"><strong>Duration:</strong> {plan.duration}</p>
                <div className="flex justify-between text-sm mt-3">
                  <p className="text-black font-medium">Team Utilization</p>
                  <p className="font-bold text-black">{plan.utilization}%</p>
                </div>
                <div className="w-full bg-gray-200 h-1 rounded-full">
                  <div className={`h-full rounded-full bg-${plan.color}-500`} style={{ width: `${plan.utilization}%` }} />
                </div>
                <div className="flex justify-between text-sm mt-3">
                  <p className="text-black font-medium">Risk Score</p>
                  <p className={`text-${plan.color}-600 font-bold`}>{plan.risk}</p>
                </div>
                <div className="h-20 mt-2 bg-gradient-to-t from-white via-${plan.color}-300 to-${plan.color}-500 rounded" />
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700">✓ Select</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
