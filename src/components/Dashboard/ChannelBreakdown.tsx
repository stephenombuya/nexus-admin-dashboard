import React from 'react';
import { useAppSelector } from '../../hooks/useAppStore';

export const ChannelBreakdown: React.FC = () => {
  const { channelData } = useAppSelector((s) => s.dashboard);
  const maxUsers = Math.max(...channelData.map(d => d.users));

  const colors = ['bg-cyan-400', 'bg-purple-400', 'bg-amber-400', 'bg-emerald-400', 'bg-rose-400'];

  return (
    <div className="rounded-xl border dark:border-slate-800 border-slate-200
      dark:bg-slate-900 bg-white p-5 sm:p-6 animate-slide-up">
      <div className="mb-6">
        <h2 className="font-display font-semibold dark:text-white text-slate-900">
          Acquisition Channels
        </h2>
        <p className="text-xs dark:text-slate-500 text-slate-400 mt-0.5 font-mono">
          Users & revenue by source
        </p>
      </div>
      <div className="space-y-4">
        {channelData.map((ch, i) => (
          <div key={ch.channel}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${colors[i]}`} />
                <span className="text-xs font-medium dark:text-slate-300 text-slate-600">
                  {ch.channel}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="dark:text-slate-500 text-slate-400">{ch.users.toLocaleString()} users</span>
                <span className="dark:text-slate-300 text-slate-600">${(ch.revenue / 1000).toFixed(1)}k</span>
                <span className={`px-1.5 py-0.5 rounded text-xs
                  dark:bg-slate-800 bg-slate-100 dark:text-slate-300 text-slate-600`}>
                  {ch.conversion}% CVR
                </span>
              </div>
            </div>
            <div className="h-1.5 rounded-full dark:bg-slate-800 bg-slate-100 overflow-hidden">
              <div
                className={`h-full rounded-full ${colors[i]} transition-all duration-700`}
                style={{ width: `${(ch.users / maxUsers) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
