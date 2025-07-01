import React from 'react'
import Notification from './Notification'
import Header1 from '@/components/Header1';
import ProfileNavigation  from "@/components/ProfileNavigation";
const NotificationPre = () => {
  return (
    <div>
        <Header1/>
        <ProfileNavigation>
        <Notification/>
        </ProfileNavigation>
    </div>
  )
}

export default NotificationPre;