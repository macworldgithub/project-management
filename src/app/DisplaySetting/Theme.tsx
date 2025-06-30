'use client';

import { useState } from 'react';

export default function Theme() {
  const [theme, setTheme] = useState('light');
  const [setColor] = useState('blue');
  const [fontSize, setFontSize] = useState(16);
  const [density, setDensity] = useState('comfortable');

  return (
    <div className="min-h-screen bg-gray-200 p-4 md:p-8 max-sm:-mt-8 max-md:-mt-16 md:-mt-16">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-10">
          {/* Theme Settings */}
          <div className="mb-8 text-black">
            <h3 className="font-medium text-lg mb-2">Theme Settings</h3>
            <p className="text-sm text-gray-500 mb-4">Choose your preferred theme mode</p>
            <div className="flex gap-6">
              {['light', 'dark', 'system'].map((mode) => (
                <label key={mode} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="theme"
                    value={mode}
                    checked={theme === mode}
                    onChange={() => setTheme(mode)}
                    className="accent-blue-600"
                  />
                  <div className="text-sm capitalize">{mode}</div>
                </label>
              ))}
            </div>
          </div>

          {/* Color Scheme */}
          <div className="mb-8 text-black">
            <h3 className="font-medium text-lg mb-2">Color Scheme</h3>
            <p className="text-sm text-gray-500 mb-4">Select your preferred accent color</p>
            <div className="flex gap-6 flex-wrap">
              {[
                { name: 'Blue', color: 'bg-blue-600' },
                { name: 'Purple', color: 'bg-purple-600' },
                { name: 'Green', color: 'bg-green-600' },
                { name: 'Amber', color: 'bg-amber-500' },
                { name: 'Rose', color: 'bg-rose-500' },
              ].map(({ name, color }) => (
                <label key={name} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="color"
                    checked={color.toLowerCase().includes(color.toLowerCase())}
                    onChange={() => setColor(name.toLowerCase())}
                    className="accent-blue-600"
                  />
                  <span className={`w-4 h-4 rounded-full ${color}`}></span>
                  <span className="text-sm">{name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div className="mb-8 text-black">
            <h3 className="font-medium text-lg mb-2">Font Size</h3>
            <p className="text-sm text-gray-500 mb-2">Adjust the text size for better readability</p>
            <div className="flex items-center gap-4">
              <span className="text-xs">A</span>
              <input
                type="range"
                min={12}
                max={24}
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full md:w-1/2"
              />
              <span className="text-lg">A</span>
            </div>
            <p className="text-sm text-gray-400 mt-1">Medium (Default)</p>
          </div>

          {/* Layout Density */}
          <div className="mb-8 text-black">
            <h3 className="font-medium text-lg mb-2">Layout Density</h3>
            <p className="text-sm text-gray-500 mb-4">Choose how compact you want the interface to be</p>
            <div className="flex flex-col gap-2">
              {['Compact', 'Comfortable (Default)', 'Spacious'].map((option) => (
                <label key={option} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="density"
                    value={option}
                    checked={density === option.toLowerCase().split(' ')[0]}
                    onChange={() => setDensity(option.toLowerCase().split(' ')[0])}
                    className="accent-blue-600"
                  />
                  <span className="text-sm">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button className="border border-gray-400 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 text-sm">
              Cancel
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    // </div>
  );
}
