import React, { useState, useMemo } from 'react';
import {
  ChevronUp, ChevronDown, Search, ChevronsLeft, ChevronsRight,
  ChevronLeft, ChevronRight, Filter, X
} from 'lucide-react';
import { clsx } from 'clsx';
import { User } from '../../types';
import { Badge } from '../UI/Badge';
import { format } from 'date-fns';
import { useAppSelector } from '../../hooks/useAppStore';

type SortKey = keyof User;
type Direction = 'asc' | 'desc';

const PAGE_SIZE_OPTIONS = [10, 20, 50];

export const DataTable: React.FC = () => {
  const { users } = useAppSelector((s) => s.dashboard);
  const { currentUser } = useAppSelector((s) => s.auth);

  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('joinedAt');
  const [sortDir, setSortDir] = useState<Direction>('desc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [planFilter, setPlanFilter] = useState<string>('all');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
    setPage(1);
  };

  const filtered = useMemo(() => {
    return users
      .filter((u) => {
        const q = search.toLowerCase();
        const matchSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.id.includes(q);
        const matchStatus = statusFilter === 'all' || u.status === statusFilter;
        const matchPlan = planFilter === 'all' || u.plan === planFilter;
        return matchSearch && matchStatus && matchPlan;
      })
      .sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        if (av === undefined || bv === undefined) return 0;
        const cmp = typeof av === 'number' && typeof bv === 'number'
          ? av - bv
          : String(av).localeCompare(String(bv));
        return sortDir === 'asc' ? cmp : -cmp;
      });
  }, [users, search, sortKey, sortDir, statusFilter, planFilter]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const SortIcon: React.FC<{ col: SortKey }> = ({ col }) => {
    if (sortKey !== col) return <ChevronUp className="w-3 h-3 opacity-20" />;
    return sortDir === 'asc'
      ? <ChevronUp className="w-3 h-3 text-cyan-400" />
      : <ChevronDown className="w-3 h-3 text-cyan-400" />;
  };

  const statusVariant = (s: User['status']) =>
    s === 'active' ? 'success' : s === 'inactive' ? 'neutral' : 'danger';

  const planVariant = (p: User['plan']) =>
    p === 'enterprise' ? 'purple' : p === 'pro' ? 'info' : 'neutral';

  return (
    <div className="rounded-xl border dark:border-slate-800 border-slate-200
      dark:bg-slate-900 bg-white overflow-hidden animate-slide-up">
      {/* Table header / filters */}
      <div className="p-4 sm:p-5 border-b dark:border-slate-800 border-slate-200">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h2 className="font-display font-semibold dark:text-white text-slate-900">
              Users
            </h2>
            <p className="text-xs dark:text-slate-500 text-slate-400 font-mono mt-0.5">
              {filtered.length} total
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5
                dark:text-slate-500 text-slate-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="pl-8 pr-3 py-2 text-xs rounded-lg border
                  dark:border-slate-700 border-slate-200
                  dark:bg-slate-800 bg-slate-50
                  dark:text-slate-200 text-slate-700
                  dark:placeholder-slate-600 placeholder-slate-400
                  focus:outline-none focus:ring-1 dark:focus:ring-cyan-800 focus:ring-cyan-300
                  w-48 font-mono"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 dark:text-slate-500 text-slate-400"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Status filter */}
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              className="text-xs rounded-lg border px-2.5 py-2
                dark:border-slate-700 border-slate-200
                dark:bg-slate-800 bg-slate-50
                dark:text-slate-300 text-slate-600
                focus:outline-none focus:ring-1 dark:focus:ring-cyan-800 focus:ring-cyan-300
                font-mono cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>

            {/* Plan filter */}
            <select
              value={planFilter}
              onChange={(e) => { setPlanFilter(e.target.value); setPage(1); }}
              className="text-xs rounded-lg border px-2.5 py-2
                dark:border-slate-700 border-slate-200
                dark:bg-slate-800 bg-slate-50
                dark:text-slate-300 text-slate-600
                focus:outline-none focus:ring-1 dark:focus:ring-cyan-800 focus:ring-cyan-300
                font-mono cursor-pointer"
            >
              <option value="all">All Plans</option>
              <option value="free">Free</option>
              <option value="pro">Pro</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm" role="table" aria-label="Users table">
          <thead>
            <tr className="border-b dark:border-slate-800 border-slate-100">
              {[
                { key: 'name' as SortKey, label: 'User' },
                { key: 'status' as SortKey, label: 'Status' },
                { key: 'plan' as SortKey, label: 'Plan' },
                ...(currentUser?.role === 'admin' ? [{ key: 'revenue' as SortKey, label: 'Revenue' }] : []),
                { key: 'joinedAt' as SortKey, label: 'Joined' },
                { key: 'lastActive' as SortKey, label: 'Last Active' },
              ].map(({ key, label }) => (
                <th
                  key={key}
                  className="px-4 py-3 text-left"
                >
                  <button
                    onClick={() => handleSort(key)}
                    className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider
                      dark:text-slate-500 text-slate-400 hover:dark:text-slate-300 hover:text-slate-600
                      transition-colors font-mono"
                  >
                    {label}
                    <SortIcon col={key} />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-slate-800/60 divide-slate-100">
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center dark:text-slate-600 text-slate-400 font-mono text-xs">
                  No users match your filters
                </td>
              </tr>
            ) : (
              paginated.map((user, i) => (
                <tr
                  key={user.id}
                  className="dark:hover:bg-slate-800/40 hover:bg-slate-50 transition-colors"
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  {/* User */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                        bg-gradient-to-br from-slate-600 to-slate-800
                        dark:from-slate-600 dark:to-slate-800
                        text-white text-xs font-bold">
                        {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-medium dark:text-slate-200 text-slate-700 text-xs">{user.name}</p>
                        <p className="text-xs dark:text-slate-500 text-slate-400 font-mono">{user.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <Badge variant={statusVariant(user.status)} dot>
                      {user.status}
                    </Badge>
                  </td>

                  {/* Plan */}
                  <td className="px-4 py-3">
                    <Badge variant={planVariant(user.plan)}>
                      {user.plan}
                    </Badge>
                  </td>

                  {/* Revenue (admin only) */}
                  {currentUser?.role === 'admin' && (
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs dark:text-slate-300 text-slate-600">
                        {user.revenue > 0 ? `$${user.revenue.toLocaleString()}` : '—'}
                      </span>
                    </td>
                  )}

                  {/* Joined */}
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs dark:text-slate-500 text-slate-400">
                      {format(new Date(user.joinedAt), 'MMM d, yyyy')}
                    </span>
                  </td>

                  {/* Last Active */}
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs dark:text-slate-500 text-slate-400">
                      {format(new Date(user.lastActive), 'MMM d, yyyy')}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-4 sm:px-5 py-4 border-t dark:border-slate-800 border-slate-100
        flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 text-xs dark:text-slate-500 text-slate-400 font-mono">
          <span>Rows:</span>
          <select
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
            className="px-2 py-1 rounded border dark:border-slate-700 border-slate-200
              dark:bg-slate-800 bg-slate-50 dark:text-slate-300 text-slate-600
              focus:outline-none cursor-pointer"
          >
            {PAGE_SIZE_OPTIONS.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <span className="hidden sm:block">
            {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filtered.length)} of {filtered.length}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {[
            { icon: ChevronsLeft, action: () => setPage(1), disabled: page === 1 },
            { icon: ChevronLeft, action: () => setPage(p => Math.max(1, p - 1)), disabled: page === 1 },
            { icon: ChevronRight, action: () => setPage(p => Math.min(totalPages, p + 1)), disabled: page === totalPages },
            { icon: ChevronsRight, action: () => setPage(totalPages), disabled: page === totalPages },
          ].map(({ icon: Icon, action, disabled }, idx) => (
            <button
              key={idx}
              onClick={action}
              disabled={disabled}
              className={clsx(
                'p-1.5 rounded-md transition-colors',
                disabled
                  ? 'opacity-30 cursor-not-allowed dark:text-slate-600 text-slate-300'
                  : 'dark:text-slate-400 text-slate-500 dark:hover:bg-slate-800 hover:bg-slate-100'
              )}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
          <span className="px-2 text-xs font-mono dark:text-slate-400 text-slate-500">
            {page} / {totalPages}
          </span>
        </div>
      </div>
    </div>
  );
};
