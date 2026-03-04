import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';
import { useAppSelector } from '../../hooks/useAppStore';

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
            {p.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

export const UserGrowthChart: React.FC = () => {
  const { userGrowthData } = useAppSelector((s) => s.dashboard);
  const { theme } = useAppSelector((s) => s.theme);

  const isDark = theme === 'dark';
  const gridColor = isDark ? '#1e293b' : '#f1f5f9';
  const axisColor = isDark ? '#475569' : '#94a3b8';

  return (
    <div className="rounded-xl border dark:border-slate-800 border-slate-200
      dark:bg-slate-900 bg-white p-5 sm:p-6 animate-slide-up">
      <div className="mb-6">
        <h2 className="font-display font-semibold dark:text-white text-slate-900">
          User Growth
        </h2>
        <p className="text-xs dark:text-slate-500 text-slate-400 mt-0.5 font-mono">
          New vs churned users per month
        </p>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={userGrowthData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }} barGap={2}>
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
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: 11, fontFamily: 'JetBrains Mono', paddingTop: 12 }}
            formatter={(value) => (
              <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>{value}</span>
            )}
          />
          <Bar dataKey="new" fill="#22d3ee" radius={[3, 3, 0, 0]} maxBarSize={20} />
          <Bar dataKey="churned" fill={isDark ? '#ef4444' : '#f87171'} radius={[3, 3, 0, 0]} maxBarSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
