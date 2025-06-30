  import React from 'react'
  import Password from './Password';
  import ActiveSession from './ActiveSession';
  import Header2 from '@/components/Header2';
import Route from '@/components/Route';


  const AccountSetting = () => {
    return (
      <div>
        <Header2/>
        <Route/>
        <Password/>
        <ActiveSession/>
      </div>
    )
  }

  export default AccountSetting;