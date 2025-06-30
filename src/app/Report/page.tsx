import React from 'react'
import ReportsAnalytics from './ReportAnalytics';
import Dashboard from './Dashboard';
import Header from './Header';

const Report = () => {
  return (
    <div>
        <Header/>
        <div className='md:-mb-8 lg:-mb-22 max-lg:46'>
        <ReportsAnalytics/>
        </div>
        <Dashboard/>
    </div>
  )
}

export default Report;