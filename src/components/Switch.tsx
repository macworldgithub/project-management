'use client';
import React from 'react';

interface SwitchProps {
  checked: boolean;
  onCheckedChange: () => void;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({ checked, onCheckedChange, className }) => {
  return (
    <button
      onClick={onCheckedChange}
      className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
        checked ? 'bg-blue-600' : 'bg-gray-300'
      } ${className}`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
};
