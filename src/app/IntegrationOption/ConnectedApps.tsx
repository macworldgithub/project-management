'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Switch } from '@/components/Switch';

// 1. Define valid integration keys
type IntegrationKey = 'slack' | 'google' | 'teams' | 'github' | 'dropbox';

const integrations: {
  name: string;
  description: string;
  icon: string;
  id: IntegrationKey;
}[] = [
  {
    name: 'Slack',
    description: 'Receive notifications and updates in Slack',
    icon: '/slack.png',
    id: 'slack',
  },
  {
    name: 'Google Calendar',
    description: 'Sync tasks and deadlines with Google Calendar',
    icon: '/google.png',
    id: 'google',
  },
  {
    name: 'Microsoft Teams',
    description: 'Collaborate and receive notifications in Teams',
    icon: '/microsoft.png',
    id: 'teams',
  },
  {
    name: 'GitHub',
    description: 'Link tasks to GitHub issues and pull requests',
    icon: '/github.png',
    id: 'github',
  },
  {
    name: 'Dropbox',
    description: 'Attach files from Dropbox to tasks',
    icon: '/dropbox.png',
    id: 'dropbox',
  },
];

export default function ConnectedApps() {
  // 2. Strongly typed state with IntegrationKey
  const [enabledApps, setEnabledApps] = useState<Record<IntegrationKey, boolean>>({
    slack: true,
    google: true,
    teams: false,
    github: true,
    dropbox: false,
  });

  const toggleApp = (id: IntegrationKey) => {
    setEnabledApps((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-gray-200 px-4 md:px-12 py-4 -mb-12">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6 md:p-10">
        <div className="bg-white rounded-xl shadow p-6 md:p-8 w-full max-w-6xl mx-auto">
          <h3 className="text-lg md:text-xl font-semibold mb-6 text-black">Connected Apps</h3>
          <div className="space-y-5">
            {integrations.map((app) => (
              <div key={app.id} className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <Image
                    src={app.icon}
                    alt={app.name}
                    width={24}
                    height={24}
                    className="w-6 h-6 object-contain"
                  />
                  <div>
                    <p className="text-sm md:text-base font-medium text-gray-900">{app.name}</p>
                    <p className="text-xs md:text-sm text-gray-500">{app.description}</p>
                  </div>
                </div>
                <Switch
                  checked={enabledApps[app.id]}
                  onCheckedChange={() => toggleApp(app.id)}
                  className="data-[state=checked]:bg-blue-700"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
