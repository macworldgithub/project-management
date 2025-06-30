import React from 'react'
import Theme from './Theme'
import Header1 from '@/components/Header1'
import ProfileNavigation from "@/components/ProfileNavigation";

const DisplaySetting = () => {
  return (
    <div>
        <Header1/>
        <ProfileNavigation/>
        <Theme/>
    </div>
  )
}

export default DisplaySetting;