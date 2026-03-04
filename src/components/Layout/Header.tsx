import React from 'react';
import { Menu, Sun, Moon, Bell, Search, RefreshCw } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../hooks/useAppStore';
import { toggleTheme } from '../../store/slices/themeSlice';
import { refreshMetrics } from '../../store/slices/dashboardSlice';
import { clsx } from 'clsx';
import { format } from 'date-fns';

interface HeaderProps {
  onMenuClick: () => void;
  title: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick, title, subtitle }) => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((s) => s.theme);
  const { lastUpdated, loading } = useAppSelector((s) => s.dashboard);
  const { currentUser } = useAppSelector((s) => s.auth);

  return (
    <header className="h-16 flex items-center px-4 sm:px-6 gap-4
      border-b dark:border-slate-800/80 border-slate-200
      dark:bg-slate-950/80 bg-white/80 backdrop-blur-md
      sticky top-0 z-30">
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg dark:text-slate-400 text-slate-500
          dark:hover:bg-slate-800 hover:bg-slate-100 transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Title */}
      <div className="flex-1 min-w-0">
        <h1 className="font-display font-bold text-lg dark:text-white text-slate-900 leading-tight truncate">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs dark:text-slate-500 text-slate-400 font-mono">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* Last updated */}
        {lastUpdated && (
          <span className="hidden sm:block text-xs font-mono dark:text-slate-600 text-slate-400">
            Updated {format(new Date(lastUpdated), 'HH:mm:ss')}
          </span>
        )}

        {/* Refresh */}
        <button
          onClick={() => dispatch(refreshMetrics())}
          disabled={loading}
          className={clsx(
            'p-2 rounded-lg transition-colors',
            'dark:text-slate-400 text-slate-500',
            'dark:hover:bg-slate-800 hover:bg-slate-100',
            loading && 'opacity-50 cursor-not-allowed'
          )}
          aria-label="Refresh data"
        >
          <RefreshCw className={clsx('w-4 h-4', loading && 'animate-spin')} />
        </button>

        {/* Notifications */}
        <button
          className="relative p-2 rounded-lg transition-colors
            dark:text-slate-400 text-slate-500
            dark:hover:bg-slate-800 hover:bg-slate-100"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-cyan-400 rounded-full" />
        </button>

        {/* Theme toggle */}
        <button
          onClick={() => dispatch(toggleTheme())}
          className="p-2 rounded-lg transition-colors
            dark:text-slate-400 text-slate-500
            dark:hover:bg-slate-800 hover:bg-slate-100"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </button>

        {/* Role badge */}
        <div className="hidden sm:flex items-center gap-2 pl-2 border-l dark:border-slate-800 border-slate-200">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
            <span className="text-xs font-bold text-white">
              {currentUser?.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <span className={clsx(
            'text-xs font-mono px-1.5 py-0.5 rounded uppercase tracking-wider font-medium',
            currentUser?.role === 'admin'
              ? 'dark:bg-cyan-950 bg-cyan-100 dark:text-cyan-400 text-cyan-700'
              : 'dark:bg-slate-800 bg-slate-100 dark:text-slate-400 text-slate-600'
          )}>
            {currentUser?.role}
          </span>
        </div>
      </div>
    </header>
  );
};
