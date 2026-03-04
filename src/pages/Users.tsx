import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import { DataTable } from '../components/Dashboard/DataTable';
import { TableSkeleton } from '../components/UI/Skeleton';
import { ErrorBoundary } from '../components/UI/ErrorBoundary';
import { useAppDispatch, useAppSelector } from '../hooks/useAppStore';
import { fetchDashboardData } from '../store/slices/dashboardSlice';
import { Shield } from 'lucide-react';

export const UsersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, metrics, users } = useAppSelector((s) => s.dashboard);
  const { currentUser } = useAppSelector((s) => s.auth);
  const hasData = metrics.length > 0;

  useEffect(() => {
    if (!hasData) dispatch(fetchDashboardData());
  }, [dispatch, hasData]);

  // Role-based access control
  if (currentUser?.role !== 'admin') {
    return (
      <Layout title="Users" subtitle="User management">
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="p-4 rounded-full dark:bg-slate-800 bg-slate-100">
            <Shield className="w-8 h-8 dark:text-slate-500 text-slate-400" />
          </div>
          <div className="text-center">
            <h2 className="font-display font-semibold dark:text-slate-300 text-slate-600 mb-1">
              Access Restricted
            </h2>
            <p className="text-sm dark:text-slate-500 text-slate-400 font-mono">
              You need admin privileges to view user data.
            </p>
            <p className="text-xs dark:text-slate-600 text-slate-400 font-mono mt-2">
              Use the role switcher in the sidebar to switch to Admin mode.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    enterprise: users.filter(u => u.plan === 'enterprise').length,
    revenue: users.reduce((acc, u) => acc + u.revenue, 0),
  };

  return (
    <Layout title="Users" subtitle={`Managing ${stats.total} users`}>
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Summary stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Users', value: stats.total.toLocaleString() },
            { label: 'Active', value: stats.active.toLocaleString() },
            { label: 'Enterprise', value: stats.enterprise.toLocaleString() },
            { label: 'Total Revenue', value: `$${(stats.revenue / 1000).toFixed(1)}k` },
          ].map((s, i) => (
            <div key={i} className="rounded-xl border dark:border-slate-800 border-slate-200
              dark:bg-slate-900 bg-white p-4 sm:p-5 animate-fade-in"
              style={{ animationDelay: `${i * 60}ms` }}>
              <p className="text-xs uppercase tracking-widest font-medium
                dark:text-slate-500 text-slate-400 mb-2">{s.label}</p>
              <p className="font-display font-bold text-2xl dark:text-white text-slate-900">{s.value}</p>
            </div>
          ))}
        </div>

        <ErrorBoundary>
          {loading && !hasData ? <TableSkeleton /> : <DataTable />}
        </ErrorBoundary>
      </div>
    </Layout>
  );
};
