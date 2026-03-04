export type Theme = 'light' | 'dark';
export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive' | 'suspended';
  plan: 'free' | 'pro' | 'enterprise';
  revenue: number;
  joinedAt: string;
  lastActive: string;
  avatar?: string;
}

export interface MetricCard {
  id: string;
  label: string;
  value: string | number;
  change: number;
  changeType: 'positive' | 'negative' | 'neutral';
  prefix?: string;
  suffix?: string;
  description?: string;
}

export interface RevenueDataPoint {
  month: string;
  revenue: number;
  mrr: number;
  arr: number;
}

export interface UserGrowthDataPoint {
  month: string;
  active: number;
  new: number;
  churned: number;
}

export interface ChannelDataPoint {
  channel: string;
  users: number;
  revenue: number;
  conversion: number;
}

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: unknown, row: T) => React.ReactNode;
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export interface AuthState {
  currentUser: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  } | null;
  isAuthenticated: boolean;
}

export interface DashboardState {
  metrics: MetricCard[];
  revenueData: RevenueDataPoint[];
  userGrowthData: UserGrowthDataPoint[];
  channelData: ChannelDataPoint[];
  users: User[];
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

export interface ThemeState {
  theme: Theme;
}
