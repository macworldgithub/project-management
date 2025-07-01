import Header2 from '@/components/Header2';
import React from 'react'
import Information from './Information';
import ConnectedAccount from './ConnectedAccount'
import Tabs from '@/components/Tabs';
const AccountManagement = () => {
  return (
    <div>
        <Header2/>
        <Tabs>
          <Information/>
          <ConnectedAccount/>
        </Tabs>
    </div>
  )
}

export default AccountManagement;