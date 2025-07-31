
import React from 'react';
import DashBoard from './DashBoard/page';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function DashBoardPage() {
  return (
    <ProtectedRoute>
      <DashBoard/>
    </ProtectedRoute>
  );
}
