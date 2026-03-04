import React from 'react';
import { Layout } from '../components/Layout/Layout';
import { useAppDispatch, useAppSelector } from '../hooks/useAppStore';
import { toggleTheme } from '../store/slices/themeSlice';
import { switchRole } from '../store/slices/authSlice';
import { Moon, Sun, Shield, Bell, Key, Globe, Palette } from 'lucide-react';
import { UserRole } from '../types';
import { clsx } from 'clsx';

export const SettingsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((s) => s.theme);
  const { currentUser } = useAppSelector((s) => s.auth);

  const Section: React.FC<{ title: string; icon: React.ElementType; children: React.ReactNode }> = ({
    title, icon: Icon, children
  }) => (
    <div className="rounded-xl border dark:border-slate-800 border-slate-200
      dark:bg-slate-900 bg-white p-5 sm:p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-5 pb-4 border-b dark:border-slate-800 border-slate-100">
        <Icon className="w-4 h-4 dark:text-slate-400 text-slate-500" />
        <h2 className="font-display font-semibold dark:text-white text-slate-900">{title}</h2>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );

  const Toggle: React.FC<{ label: string; description?: string; checked: boolean; onChange: () => void }> = ({
    label, description, checked, onChange
  }) => (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium dark:text-slate-200 text-slate-700">{label}</p>
        {description && (
          <p className="text-xs dark:text-slate-500 text-slate-400 font-mono mt-0.5">{description}</p>
        )}
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className={clsx(
          'relative w-11 h-6 rounded-full transition-colors flex-shrink-0',
          checked ? 'bg-cyan-500' : 'dark:bg-slate-700 bg-slate-300'
        )}
      >
        <span className={clsx(
          'absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform',
          checked && 'translate-x-5'
        )} />
      </button>
    </div>
  );

  return (
    <Layout title="Settings" subtitle="Configure your dashboard preferences">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Appearance */}
        <Section title="Appearance" icon={Palette}>
          <Toggle
            label="Dark Mode"
            description="Use dark theme across the dashboard"
            checked={theme === 'dark'}
            onChange={() => dispatch(toggleTheme())}
          />
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium dark:text-slate-200 text-slate-700">Color scheme</p>
              <p className="text-xs dark:text-slate-500 text-slate-400 font-mono mt-0.5">Currently using Cyan accent</p>
            </div>
            <div className="flex gap-2">
              {['bg-cyan-400', 'bg-purple-400', 'bg-emerald-400', 'bg-amber-400'].map((c) => (
                <button
                  key={c}
                  className={clsx(
                    'w-5 h-5 rounded-full transition-transform hover:scale-110',
                    c,
                    c === 'bg-cyan-400' && 'ring-2 ring-offset-2 dark:ring-offset-slate-900 ring-cyan-400'
                  )}
                />
              ))}
            </div>
          </div>
        </Section>

        {/* Demo RBAC */}
        <Section title="Role & Access" icon={Shield}>
          <div>
            <p className="text-sm font-medium dark:text-slate-200 text-slate-700 mb-1">Current Role</p>
            <p className="text-xs dark:text-slate-500 text-slate-400 font-mono mb-3">
              Switch roles to see different UI elements (demo feature)
            </p>
            <div className="flex gap-2">
              {(['admin', 'user'] as UserRole[]).map((role) => (
                <button
                  key={role}
                  onClick={() => dispatch(switchRole(role))}
                  className={clsx(
                    'px-4 py-2 rounded-lg text-sm font-mono font-medium capitalize transition-all',
                    currentUser?.role === role
                      ? 'dark:bg-cyan-950 bg-cyan-100 dark:text-cyan-400 text-cyan-700 dark:border-cyan-900 border-cyan-300 border'
                      : 'dark:bg-slate-800 bg-slate-100 dark:text-slate-400 text-slate-600 dark:border-slate-700 border-slate-200 border dark:hover:bg-slate-700 hover:bg-slate-200'
                  )}
                >
                  {role}
                </button>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-lg dark:bg-slate-800/60 bg-slate-50 border dark:border-slate-700 border-slate-200">
              <p className="text-xs font-mono dark:text-slate-400 text-slate-500">
                <strong>Admin:</strong> Full access — users table with revenue data, revenue page, role management<br />
                <strong>User:</strong> Limited access — dashboard & analytics only
              </p>
            </div>
          </div>
        </Section>

        {/* Notifications */}
        <Section title="Notifications" icon={Bell}>
          <Toggle label="Churn alerts" description="Get notified when churn rate spikes" checked={true} onChange={() => {}} />
          <Toggle label="Revenue milestones" description="MRR milestone notifications" checked={true} onChange={() => {}} />
          <Toggle label="New enterprise signups" description="Instant alerts for enterprise deals" checked={false} onChange={() => {}} />
        </Section>

        {/* Account */}
        <Section title="Account" icon={Key}>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium dark:text-slate-400 text-slate-500 uppercase tracking-wider mb-1.5">
                Name
              </label>
              <input
                defaultValue={currentUser?.name}
                className="w-full px-3 py-2 text-sm rounded-lg border
                  dark:border-slate-700 border-slate-200
                  dark:bg-slate-800 bg-slate-50
                  dark:text-slate-200 text-slate-700
                  focus:outline-none focus:ring-1 dark:focus:ring-cyan-800 focus:ring-cyan-300"
              />
            </div>
            <div>
              <label className="block text-xs font-medium dark:text-slate-400 text-slate-500 uppercase tracking-wider mb-1.5">
                Email
              </label>
              <input
                defaultValue={currentUser?.email}
                className="w-full px-3 py-2 text-sm rounded-lg border
                  dark:border-slate-700 border-slate-200
                  dark:bg-slate-800 bg-slate-50
                  dark:text-slate-200 text-slate-700
                  focus:outline-none focus:ring-1 dark:focus:ring-cyan-800 focus:ring-cyan-300
                  font-mono"
              />
            </div>
            <button className="px-4 py-2 rounded-lg text-sm font-medium
              bg-cyan-500 hover:bg-cyan-400 text-white transition-colors">
              Save Changes
            </button>
          </div>
        </Section>
      </div>
    </Layout>
  );
};
