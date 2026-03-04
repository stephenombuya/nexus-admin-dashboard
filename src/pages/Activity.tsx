import React from 'react';
import { Layout } from '../components/Layout/Layout';
import { ActivityFeed } from '../components/Dashboard/ActivityFeed';

export const ActivityPage: React.FC = () => {
  return (
    <Layout title="Activity" subtitle="System events and real-time updates">
      <div className="max-w-2xl mx-auto">
        <ActivityFeed />
        <p className="text-xs font-mono dark:text-slate-600 text-slate-400 mt-4 text-center">
          Events are simulated every 4 seconds for demo purposes
        </p>
      </div>
    </Layout>
  );
};
