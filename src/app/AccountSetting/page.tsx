  import React from 'react'
  import Password from './Password';
  import ActiveSession from './ActiveSession';
  import Header2 from '@/components/Header2';
  import Tab from '@/components/Tabs';

  const AccountSetting = () => {
    return (
      <div>
        <Header2/>
        <Tab>
          <Password/>
          <ActiveSession/>
        </Tab>
      </div>
    )
  }

  export default AccountSetting;