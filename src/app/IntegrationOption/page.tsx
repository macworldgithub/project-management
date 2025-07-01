import React from 'react';
import ConnectedApps from './ConnectedApps';
import Header1 from '@/components/Header1';
import APIAccess from './APIAccess';
import ProfileNavigation from '@/components/ProfileNavigation';
const IntegrationOption = () => {
  return (
    <div>
      <Header1 />
      <ProfileNavigation >
      <ConnectedApps/>
      <APIAccess />
      </ProfileNavigation>
    </div>
  );
};

export default IntegrationOption;
