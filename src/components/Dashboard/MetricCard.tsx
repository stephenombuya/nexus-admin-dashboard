import React from 'react';
import { TrendingUp, TrendingDown, Minus, DollarSign, Users, Activity, BarChart2 } from 'lucide-react';
import { clsx } from 'clsx';
import { MetricCard as MetricCardType } from '../../types';

const iconMap: Record<string, React.ElementType> = {
  mrr: DollarSign,
  active_users: Users,
  churn_rate: Activity,
  growth: BarChart2,
};

interface MetricCardProps {
  metric: MetricCardType;
  index: number;
}

export const MetricCard: React.FC<MetricCardProps> = ({ metric, index }) => {
  const Icon = iconMap[metric.id] || BarChart2;

  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      if (metric.prefix === '$') {
        return val >= 1000
          ? `${(val / 1000).toFixed(1)}k`
          : val.toFixed(2);
      }
      return val.toLocaleString();
    }
    return val;
  };

  const isPositiveChange = metric.changeType === 'positive';
  const isNegativeChange = metric.changeType === 'negative';

  return (
    <div
      className={clsx(
        'rounded-xl border p-5 sm:p-6 transition-all duration-200 animate-fade-in',
        'dark:bg-slate-900 bg-white',
        'dark:border-slate-800 border-slate-200',
        'hover:dark:border-slate-700 hover:border-slate-300',
        'group cursor-default',
        'hover:shadow-lg hover:dark:shadow-cyan-950/20'
      )}
      style={{ animationDelay: `${index * 80}ms` }}
      role="article"
      aria-label={metric.label}
    >
      <div className="flex items-start justify-between mb-4">
        <p className="text-xs font-medium dark:text-slate-400 text-slate-500 uppercase tracking-widest">
          {metric.label}
        </p>
        <div className={clsx(
          'p-2 rounded-lg transition-colors',
          'dark:bg-slate-800 bg-slate-100',
          'group-hover:dark:bg-cyan-950/40 group-hover:bg-cyan-50'
        )}>
          <Icon className={clsx(
            'w-4 h-4 transition-colors',
            'dark:text-slate-500 text-slate-400',
            'group-hover:dark:text-cyan-400 group-hover:text-cyan-600'
          )} />
        </div>
      </div>

      <div className="mb-3">
        <p className="font-display font-bold text-2xl sm:text-3xl dark:text-white text-slate-900 leading-tight">
          {metric.prefix && <span className="text-xl">{metric.prefix}</span>}
          {formatValue(metric.value)}
          {metric.suffix && <span className="text-xl ml-0.5">{metric.suffix}</span>}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span className={clsx(
          'inline-flex items-center gap-1 text-xs font-mono font-medium px-2 py-0.5 rounded-full',
          isPositiveChange
            ? 'dark:bg-emerald-950/60 bg-emerald-100 dark:text-emerald-400 text-emerald-700'
            : isNegativeChange
            ? 'dark:bg-red-950/60 bg-red-100 dark:text-red-400 text-red-700'
            : 'dark:bg-slate-800 bg-slate-100 dark:text-slate-400 text-slate-600'
        )}>
          {isPositiveChange ? (
            <TrendingUp className="w-3 h-3" />
          ) : isNegativeChange ? (
            <TrendingDown className="w-3 h-3" />
          ) : (
            <Minus className="w-3 h-3" />
          )}
          {metric.change > 0 ? '+' : ''}{metric.change}
          {metric.suffix === '%' ? 'pp' : '%'}
        </span>
        {metric.description && (
          <span className="text-xs dark:text-slate-600 text-slate-400">
            {metric.description}
          </span>
        )}
      </div>
    </div>
  );
};
