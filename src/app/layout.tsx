// app/layout.tsx
import './globals.css';
import React from 'react';
import SideBar from '@/components/SideBar';

export const metadata = {
  title: 'My App',
  description: 'Dashboard layout',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen">
          <SideBar />
          <main className="flex-1 bg-gray-100 p-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
