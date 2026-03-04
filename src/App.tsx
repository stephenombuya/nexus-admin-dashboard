import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DashboardPage } from './pages/Dashboard';
import { AnalyticsPage } from './pages/Analytics';
import { UsersPage } from './pages/Users';
import { ActivityPage } from './pages/Activity';
import { RevenuePage } from './pages/Revenue';
import { SettingsPage } from './pages/Settings';
import { ErrorBoundary } from './components/UI/ErrorBoundary';
import { useAppSelector } from './hooks/useAppStore';

const ThemeApplier: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useAppSelector((s) => s.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <ThemeApplier>
      <BrowserRouter>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/revenue" element={<RevenuePage />} />
            <Route path="/activity" element={<ActivityPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<DashboardPage />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </ThemeApplier>
  );
};
