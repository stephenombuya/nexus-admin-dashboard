import React, { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';
import { useAppSelector } from '../../hooks/useAppStore';
import { clsx } from 'clsx';

type View = 'revenue' | 'mrr' | 'arr';

const views: { key: View; label: string }[] = [
  { key: 'revenue', label: 'Revenue' },
  { key: 'mrr', label: 'MRR' },
  { key: 'arr', label: 'ARR' },
];

const CustomTooltip: React.FC<{ active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }> = ({
  active, payload, label
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border dark:border-slate-700 border-slate-200
      dark:bg-slate-900 bg-white p-3 shadow-xl text-sm">
      <p className="font-mono text-xs dark:text-slate-400 text-slate-500 mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="dark:text-slate-300 text-slate-600 capitalize">{p.name}:</span>
          <span className="font-mono font-medium dark:text-white text-slate-900">
            ${(p.value / 1000).toFixed(1)}k
          </span>
        </div>
      ))}
    </div>
  );
};

export const RevenueChart: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('revenue');
  const { revenueData } = useAppSelector((s) => s.dashboard);
  const { theme } = useAppSelector((s) => s.theme);

  const isDark = theme === 'dark';
  const gridColor = isDark ? '#1e293b' : '#f1f5f9';
  const axisColor = isDark ? '#475569' : '#94a3b8';

  return (
    <div className="rounded-xl border dark:border-slate-800 border-slate-200
      dark:bg-slate-900 bg-white p-5 sm:p-6 animate-slide-up">
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h2 className="font-display font-semibold dark:text-white text-slate-900">
            Revenue Overview
          </h2>
          <p className="text-xs dark:text-slate-500 text-slate-400 mt-0.5 font-mono">
            12-month performance trend
          </p>
        </div>
        <div className="flex gap-1 p-1 rounded-lg dark:bg-slate-800 bg-slate-100">
          {views.map((v) => (
            <button
              key={v.key}
              onClick={() => setActiveView(v.key)}
              className={clsx(
                'px-3 py-1.5 rounded-md text-xs font-medium font-mono transition-all',
                activeView === v.key
                  ? 'dark:bg-slate-700 bg-white dark:text-white text-slate-900 shadow-sm'
                  : 'dark:text-slate-400 text-slate-500 dark:hover:text-slate-300 hover:text-slate-700'
              )}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="gradCyan" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={gridColor} strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fill: axisColor, fontSize: 11, fontFamily: 'JetBrains Mono' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: axisColor, fontSize: 11, fontFamily: 'JetBrains Mono' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey={activeView}
            stroke="#22d3ee"
            strokeWidth={2}
            fill="url(#gradCyan)"
            dot={false}
            activeDot={{ r: 4, fill: '#22d3ee', stroke: isDark ? '#0f172a' : '#fff', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
