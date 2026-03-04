import React from 'react';
import { clsx } from 'clsx';

type BadgeVariant = 'success' | 'danger' | 'warning' | 'info' | 'neutral' | 'purple';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  dot?: boolean;
}

const variants: Record<BadgeVariant, string> = {
  success: 'dark:bg-emerald-950/60 bg-emerald-100 dark:text-emerald-400 text-emerald-700 dark:border-emerald-900/60 border-emerald-200',
  danger: 'dark:bg-red-950/60 bg-red-100 dark:text-red-400 text-red-700 dark:border-red-900/60 border-red-200',
  warning: 'dark:bg-amber-950/60 bg-amber-100 dark:text-amber-400 text-amber-700 dark:border-amber-900/60 border-amber-200',
  info: 'dark:bg-cyan-950/60 bg-cyan-100 dark:text-cyan-400 text-cyan-700 dark:border-cyan-900/60 border-cyan-200',
  neutral: 'dark:bg-slate-800 bg-slate-100 dark:text-slate-400 text-slate-600 dark:border-slate-700 border-slate-200',
  purple: 'dark:bg-purple-950/60 bg-purple-100 dark:text-purple-400 text-purple-700 dark:border-purple-900/60 border-purple-200',
};

const dotColors: Record<BadgeVariant, string> = {
  success: 'bg-emerald-400',
  danger: 'bg-red-400',
  warning: 'bg-amber-400',
  info: 'bg-cyan-400',
  neutral: 'bg-slate-400',
  purple: 'bg-purple-400',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  className,
  dot = false,
}) => {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full',
        'text-xs font-medium font-mono border',
        variants[variant],
        className
      )}
    >
      {dot && (
        <span className={clsx('w-1.5 h-1.5 rounded-full flex-shrink-0', dotColors[variant])} />
      )}
      {children}
    </span>
  );
};
