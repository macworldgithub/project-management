// app/Dashboard/page.tsx

'use client';
import React from 'react';
import Step1 from './Step1';
import Step2 from './Step2';

const DashboardPage = () => {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-6 space-y-8">
      <Step1 />
      <Step2 />
    </div>
  );
};

export default DashboardPage;
