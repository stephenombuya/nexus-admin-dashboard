import React, { useEffect } from 'react';
import { Layout } from '../components/Layout/Layout';
import { RevenueChart } from '../components/Dashboard/RevenueChart';
import { UserGrowthChart } from '../components/Dashboard/UserGrowthChart';
import { ChannelBreakdown } from '../components/Dashboard/ChannelBreakdown';
import { ChartSkeleton } from '../components/UI/Skeleton';
import { ErrorBoundary } from '../components/UI/ErrorBoundary';
import { useAppDispatch, useAppSelector } from '../hooks/useAppStore';
import { fetchDashboardData } from '../store/slices/dashboardSlice';

export const AnalyticsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, metrics } = useAppSelector((s) => s.dashboard);
  const hasData = metrics.length > 0;

  useEffect(() => {
    if (!hasData) dispatch(fetchDashboardData());
  }, [dispatch, hasData]);

  const statCards = [
    { label: 'Avg Session Duration', value: '4m 32s', change: '+12%' },
    { label: 'Bounce Rate', value: '28.4%', change: '-3.2%' },
    { label: 'Pages / Session', value: '6.8', change: '+0.9' },
    { label: 'Conversion Rate', value: '4.2%', change: '+0.7%' },
  ];

  return (
    <Layout title="Analytics" subtitle="In-depth performance metrics and trends">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Quick stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((s, i) => (
            <div key={i} className="rounded-xl border dark:border-slate-800 border-slate-200
              dark:bg-slate-900 bg-white p-4 sm:p-5 animate-fade-in"
              style={{ animationDelay: `${i * 80}ms` }}>
              <p className="text-xs uppercase tracking-widest font-medium
                dark:text-slate-500 text-slate-400 mb-3">{s.label}</p>
              <p className="font-display font-bold text-2xl dark:text-white text-slate-900">{s.value}</p>
              <p className={`text-xs font-mono mt-1 ${
                s.change.startsWith('+')
                  ? 'text-emerald-500'
                  : 'text-red-500'
              }`}>{s.change} vs last month</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <ErrorBoundary>
            {loading && !hasData ? <ChartSkeleton /> : <RevenueChart />}
          </ErrorBoundary>
          <ErrorBoundary>
            {loading && !hasData ? <ChartSkeleton /> : <UserGrowthChart />}
          </ErrorBoundary>
        </div>

        <ErrorBoundary>
          {loading && !hasData ? <ChartSkeleton height={200} /> : <ChannelBreakdown />}
        </ErrorBoundary>
      </div>
    </Layout>
  );
};
