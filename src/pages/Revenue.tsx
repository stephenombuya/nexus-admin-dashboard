import React, { useEffect } from 'react';
import { Layout } from '../components/Layout/Layout';
import { RevenueChart } from '../components/Dashboard/RevenueChart';
import { ChartSkeleton } from '../components/UI/Skeleton';
import { ErrorBoundary } from '../components/UI/ErrorBoundary';
import { useAppDispatch, useAppSelector } from '../hooks/useAppStore';
import { fetchDashboardData } from '../store/slices/dashboardSlice';
import { Shield } from 'lucide-react';

export const RevenuePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, metrics, revenueData } = useAppSelector((s) => s.dashboard);
  const { currentUser } = useAppSelector((s) => s.auth);
  const hasData = metrics.length > 0;

  useEffect(() => {
    if (!hasData) dispatch(fetchDashboardData());
  }, [dispatch, hasData]);

  if (currentUser?.role !== 'admin') {
    return (
      <Layout title="Revenue" subtitle="Financial performance">
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="p-4 rounded-full dark:bg-slate-800 bg-slate-100">
            <Shield className="w-8 h-8 dark:text-slate-500 text-slate-400" />
          </div>
          <div className="text-center">
            <h2 className="font-display font-semibold dark:text-slate-300 text-slate-600 mb-1">
              Admin Access Required
            </h2>
            <p className="text-sm dark:text-slate-500 text-slate-400 font-mono">
              Revenue data is restricted to administrators.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  const totalRevenue = revenueData.reduce((acc, d) => acc + d.revenue, 0);
  const avgMRR = revenueData.length
    ? revenueData.reduce((acc, d) => acc + d.mrr, 0) / revenueData.length
    : 0;
  const latestARR = revenueData[revenueData.length - 1]?.arr || 0;

  return (
    <Layout title="Revenue" subtitle="Financial performance overview">
      <div className="max-w-[1600px] mx-auto space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Total Revenue (YTD)', value: `$${(totalRevenue / 1000).toFixed(0)}k` },
            { label: 'Average MRR', value: `$${(avgMRR / 1000).toFixed(1)}k` },
            { label: 'Current ARR', value: `$${(latestARR / 1000000).toFixed(2)}M` },
          ].map((s, i) => (
            <div key={i} className="rounded-xl border dark:border-slate-800 border-slate-200
              dark:bg-slate-900 bg-white p-5 animate-fade-in"
              style={{ animationDelay: `${i * 80}ms` }}>
              <p className="text-xs uppercase tracking-widest font-medium
                dark:text-slate-500 text-slate-400 mb-3">{s.label}</p>
              <p className="font-display font-bold text-3xl dark:text-white text-slate-900">{s.value}</p>
            </div>
          ))}
        </div>

        <ErrorBoundary>
          {loading && !hasData ? <ChartSkeleton /> : <RevenueChart />}
        </ErrorBoundary>
      </div>
    </Layout>
  );
};
