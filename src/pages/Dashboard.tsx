import React, { useEffect } from 'react';
import { Layout } from '../components/Layout/Layout';
import { MetricCard } from '../components/Dashboard/MetricCard';
import { RevenueChart } from '../components/Dashboard/RevenueChart';
import { UserGrowthChart } from '../components/Dashboard/UserGrowthChart';
import { DataTable } from '../components/Dashboard/DataTable';
import { ChannelBreakdown } from '../components/Dashboard/ChannelBreakdown';
import { ActivityFeed } from '../components/Dashboard/ActivityFeed';
import { MetricCardSkeleton, ChartSkeleton, TableSkeleton } from '../components/UI/Skeleton';
import { InlineError } from '../components/UI/ErrorBoundary';
import { ErrorBoundary } from '../components/UI/ErrorBoundary';
import { useAppDispatch, useAppSelector } from '../hooks/useAppStore';
import { fetchDashboardData, clearError } from '../store/slices/dashboardSlice';

export const DashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { metrics, loading, error } = useAppSelector((s) => s.dashboard);
  const { currentUser } = useAppSelector((s) => s.auth);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchDashboardData());
    }, 30000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(clearError());
    dispatch(fetchDashboardData());
  };

  return (
    <Layout
      title={`Welcome back, ${currentUser?.name.split(' ')[0]} 👋`}
      subtitle="Here's what's happening with your product today"
    >
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Error banner */}
        {error && (
          <InlineError message={error} onRetry={handleRetry} />
        )}

        {/* Metrics grid */}
        <section aria-label="Key metrics">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {loading && metrics.length === 0
              ? Array.from({ length: 4 }).map((_, i) => <MetricCardSkeleton key={i} />)
              : metrics.map((metric, i) => (
                  <MetricCard key={metric.id} metric={metric} index={i} />
                ))
            }
          </div>
        </section>

        {/* Charts row */}
        <section aria-label="Charts" className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <ErrorBoundary>
            {loading && metrics.length === 0
              ? <ChartSkeleton />
              : <RevenueChart />
            }
          </ErrorBoundary>
          <ErrorBoundary>
            {loading && metrics.length === 0
              ? <ChartSkeleton />
              : <UserGrowthChart />
            }
          </ErrorBoundary>
        </section>

        {/* Bottom grid */}
        <section aria-label="Details" className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2">
            <ErrorBoundary>
              {loading && metrics.length === 0
                ? <ChartSkeleton height={200} />
                : <ChannelBreakdown />
              }
            </ErrorBoundary>
          </div>
          <ErrorBoundary>
            <ActivityFeed />
          </ErrorBoundary>
        </section>

        {/* Users table */}
        <section aria-label="Users table">
          <ErrorBoundary>
            {loading && metrics.length === 0
              ? <TableSkeleton />
              : <DataTable />
            }
          </ErrorBoundary>
        </section>
      </div>
    </Layout>
  );
};
