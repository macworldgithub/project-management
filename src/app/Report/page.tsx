import React from 'react'
import ReportsAnalytics from './ReportAnalytics';  
import Dashboard from './Dashboard';
import Header from './Header';

const Report = () => {
  return (
    <div>
        <Header/>
        <ReportsAnalytics/>
        <Dashboard/>
    </div>
  )
}

export default Report;