import Header2 from '@/components/Header2';
import React from 'react'
import Information from './Information';
import ConnectedAccount from './ConnectedAccount'
import Route from '@/components/Route';
const AccountManagement = () => {
  return (
    <div>
        <Header2/>
        <Route/>
        <Information/>
        <ConnectedAccount/>
    </div>
  )
}

export default AccountManagement;