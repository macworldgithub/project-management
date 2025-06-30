import React from 'react'
import AIProject from "./AIProject";
import Header1 from '@/components/Header1';
import ProjectRequirements from './ProjectRequirements';
import AIPlansDashboard from './AIPlansDashboard';
import Customization from './Customization'
const AIPlanner = () => {
  return (
    <div>
        <Header1/>
        <AIProject/>
        <ProjectRequirements/>
        <AIPlansDashboard/>
        <Customization/>
    </div>
  )
}

export default AIPlanner;