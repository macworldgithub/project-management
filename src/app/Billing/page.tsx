import Header2 from '@/components/Header2';
import React from 'react'
import Payment from './Payment';
import Tabs from '@/components/Tabs';
const Billing = () => {
  return (
    <div>
        <Header2/>
        <Tabs>
          <Payment/>
        </Tabs>
    </div>
  )
}

export default Billing;