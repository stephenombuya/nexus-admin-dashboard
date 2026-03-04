import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, BarChart3, Settings, Shield,
  ChevronLeft, ChevronRight, Zap, Bell, LogOut,
  CreditCard, Activity, ChevronDown
} from 'lucide-react';
import { clsx } from 'clsx';
import { useAppSelector, useAppDispatch } from '../../hooks/useAppStore';
import { switchRole } from '../../store/slices/authSlice';
import { UserRole } from '../../types';

interface NavItem {
  label: string;
  icon: React.ElementType;
  to: string;
  badge?: string;
  adminOnly?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/' },
  { label: 'Analytics', icon: BarChart3, to: '/analytics' },
  { label: 'Users', icon: Users, to: '/users', adminOnly: true },
  { label: 'Revenue', icon: CreditCard, to: '/revenue', adminOnly: true },
  { label: 'Activity', icon: Activity, to: '/activity' },
  { label: 'Settings', icon: Settings, to: '/settings' },
];

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onMobileClose }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [roleDropOpen, setRoleDropOpen] = useState(false);
  const { currentUser } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const visibleNav = navItems.filter((item) =>
    !item.adminOnly || currentUser?.role === 'admin'
  );

  const handleRoleSwitch = (role: UserRole) => {
    dispatch(switchRole(role));
    setRoleDropOpen(false);
    navigate('/');
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={clsx(
          'fixed top-0 left-0 z-50 h-full flex flex-col transition-all duration-300',
          'dark:bg-slate-950 bg-white',
          'dark:border-r dark:border-slate-800/80 border-r border-slate-200',
          collapsed ? 'w-[70px]' : 'w-64',
          // Mobile
          'lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Logo */}
        <div className={clsx(
          'flex items-center h-16 border-b dark:border-slate-800/80 border-slate-200 flex-shrink-0',
          collapsed ? 'px-4 justify-center' : 'px-5 gap-3'
        )}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center flex-shrink-0">
            <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          {!collapsed && (
            <span className="font-display font-bold text-lg dark:text-white text-slate-900 tracking-tight">
              NexusAdmin
            </span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-0.5 overflow-y-auto">
          {visibleNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={() => onMobileClose()}
              className={({ isActive }) => clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group relative',
                collapsed ? 'justify-center' : '',
                isActive
                  ? 'dark:bg-cyan-950/60 bg-cyan-50 dark:text-cyan-400 text-cyan-600'
                  : 'dark:text-slate-400 text-slate-500 dark:hover:bg-slate-800/60 hover:bg-slate-100 dark:hover:text-slate-200 hover:text-slate-700'
              )}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-cyan-400 rounded-full" />
                  )}
                  <item.icon className="w-4.5 h-4.5 flex-shrink-0 w-5 h-5" />
                  {!collapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                  {!collapsed && item.badge && (
                    <span className="ml-auto text-xs font-mono px-1.5 py-0.5 rounded
                      dark:bg-cyan-950 bg-cyan-100 dark:text-cyan-400 text-cyan-700">
                      {item.badge}
                    </span>
                  )}
                  {collapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 rounded-md
                      dark:bg-slate-800 bg-white border dark:border-slate-700 border-slate-200
                      text-xs font-medium dark:text-slate-200 text-slate-700
                      opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap
                      transition-opacity shadow-lg z-50">
                      {item.label}
                    </div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="p-2 border-t dark:border-slate-800/80 border-slate-200 space-y-1">
          {/* Role switcher - admin only feature for demo */}
          <div className="relative">
            <button
              onClick={() => setRoleDropOpen(!roleDropOpen)}
              className={clsx(
                'w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors',
                'dark:text-slate-400 text-slate-500',
                'dark:hover:bg-slate-800/60 hover:bg-slate-100',
                collapsed ? 'justify-center' : ''
              )}
            >
              <Shield className="w-4 h-4 flex-shrink-0" />
              {!collapsed && (
                <>
                  <span className="text-xs font-medium flex-1 text-left">
                    Role: <span className="dark:text-cyan-400 text-cyan-600 font-mono capitalize">{currentUser?.role}</span>
                  </span>
                  <ChevronDown className="w-3 h-3" />
                </>
              )}
            </button>
            {roleDropOpen && !collapsed && (
              <div className="absolute bottom-full left-0 right-0 mb-1 rounded-lg overflow-hidden
                dark:bg-slate-800 bg-white border dark:border-slate-700 border-slate-200 shadow-xl">
                {(['admin', 'user'] as UserRole[]).map((role) => (
                  <button
                    key={role}
                    onClick={() => handleRoleSwitch(role)}
                    className={clsx(
                      'w-full text-left px-3 py-2 text-xs font-mono transition-colors',
                      currentUser?.role === role
                        ? 'dark:bg-cyan-950/60 bg-cyan-50 dark:text-cyan-400 text-cyan-600'
                        : 'dark:text-slate-300 text-slate-600 dark:hover:bg-slate-700 hover:bg-slate-100'
                    )}
                  >
                    {role}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User profile */}
          {!collapsed && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg
              dark:bg-slate-900/60 bg-slate-50 border dark:border-slate-800 border-slate-200">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-white">
                  {currentUser?.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium dark:text-slate-200 text-slate-700 truncate">
                  {currentUser?.name}
                </p>
                <p className="text-xs dark:text-slate-500 text-slate-400 truncate font-mono">
                  {currentUser?.email}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 rounded-full
            dark:bg-slate-800 bg-white border dark:border-slate-700 border-slate-300
            items-center justify-center
            dark:text-slate-400 text-slate-500
            dark:hover:bg-slate-700 hover:bg-slate-100
            transition-colors shadow-sm"
          aria-label="Toggle sidebar"
        >
          {collapsed ? (
            <ChevronRight className="w-3 h-3" />
          ) : (
            <ChevronLeft className="w-3 h-3" />
          )}
        </button>
      </aside>

      {/* Spacer for layout */}
      <div
        className={clsx(
          'hidden lg:block flex-shrink-0 transition-all duration-300',
          collapsed ? 'w-[70px]' : 'w-64'
        )}
      />
    </>
  );
};
