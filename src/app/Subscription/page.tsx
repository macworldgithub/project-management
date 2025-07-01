import React from 'react'
import SubscriptionPage from './SubscriptionPage';
import Header2 from '@/components/Header2';
import Tabs from '@/components/Tabs';
const Subscription = () => {
  return (
    <div>
        <Header2/>
        <Tabs>
        <SubscriptionPage/>
        </Tabs>
    </div>
  )
}

export default Subscription;