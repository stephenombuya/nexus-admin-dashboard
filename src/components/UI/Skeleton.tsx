import React from 'react';
import { clsx } from 'clsx';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rect' | 'circle';
}

export const Skeleton: React.FC<SkeletonProps> = ({ className, variant = 'rect' }) => {
  return (
    <div
      className={clsx(
        'animate-pulse bg-gradient-to-r',
        'dark:from-slate-800 dark:via-slate-700 dark:to-slate-800',
        'from-slate-200 via-slate-100 to-slate-200',
        'bg-[length:1000px_100%]',
        variant === 'circle' && 'rounded-full',
        variant === 'text' && 'rounded h-4',
        variant === 'rect' && 'rounded-lg',
        className
      )}
    />
  );
};

export const MetricCardSkeleton: React.FC = () => (
  <div className="rounded-xl border dark:border-slate-800 border-slate-200 p-6 space-y-4
    dark:bg-slate-900 bg-white">
    <div className="flex justify-between items-start">
      <Skeleton className="h-3 w-32" variant="text" />
      <Skeleton className="h-8 w-8" variant="circle" />
    </div>
    <Skeleton className="h-8 w-40" variant="text" />
    <Skeleton className="h-3 w-24" variant="text" />
  </div>
);

export const ChartSkeleton: React.FC<{ height?: number }> = ({ height = 300 }) => (
  <div className="rounded-xl border dark:border-slate-800 border-slate-200 p-6
    dark:bg-slate-900 bg-white">
    <div className="space-y-3 mb-6">
      <Skeleton className="h-5 w-40" variant="text" />
      <Skeleton className="h-3 w-60" variant="text" />
    </div>
    <Skeleton className={`w-full rounded-lg`} style={{ height }} />
  </div>
);

export const TableSkeleton: React.FC = () => (
  <div className="rounded-xl border dark:border-slate-800 border-slate-200
    dark:bg-slate-900 bg-white overflow-hidden">
    <div className="p-6 border-b dark:border-slate-800 border-slate-200">
      <Skeleton className="h-5 w-32" variant="text" />
    </div>
    <div className="divide-y dark:divide-slate-800 divide-slate-100">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="px-6 py-4 flex items-center gap-4">
          <Skeleton className="h-9 w-9 flex-shrink-0" variant="circle" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-36" variant="text" />
            <Skeleton className="h-3 w-52" variant="text" />
          </div>
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-3 w-24" variant="text" />
        </div>
      ))}
    </div>
  </div>
);
