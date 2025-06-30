// import React from 'react'
// import ConnectedApps from "./ConnectedApps";
// import Header1 from '@/components/Header1';
// import APIAccess from './APIAccess';
// const IntegrationOption = () => {
//   return (
//     <div>
//         <Header1/>
//         <ConnectedApps/> 
//         <APIAccess/>
//     </div>
//   )
// }

// export default IntegrationOption;


import React from 'react';
import ConnectedApps from './ConnectedApps';
import Header1 from '@/components/Header1';
import APIAccess from './APIAccess';
import ProfileNavigation from '@/components/ProfileNavigation';
const IntegrationOption = () => {
  return (
    <div>
      <Header1 />
      <ProfileNavigation />
      <div className=''>
      <ConnectedApps/>
      </div>
      <div className='-mt-12'>
      <APIAccess />
      </div>

    </div>
  );
};

export default IntegrationOption;
