import { User, MetricCard, RevenueDataPoint, UserGrowthDataPoint, ChannelDataPoint } from '../types';

export const mockMetrics: MetricCard[] = [
  {
    id: 'mrr',
    label: 'Monthly Recurring Revenue',
    value: 284750,
    change: 12.4,
    changeType: 'positive',
    prefix: '$',
    description: 'vs last month',
  },
  {
    id: 'active_users',
    label: 'Active Users',
    value: 18492,
    change: 8.1,
    changeType: 'positive',
    description: 'vs last month',
  },
  {
    id: 'churn_rate',
    label: 'Churn Rate',
    value: 2.4,
    change: -0.3,
    changeType: 'positive',
    suffix: '%',
    description: 'vs last month',
  },
  {
    id: 'growth',
    label: 'MoM Growth',
    value: 18.7,
    change: 3.2,
    changeType: 'positive',
    suffix: '%',
    description: 'vs last month',
  },
];

export const mockRevenueData: RevenueDataPoint[] = [
  { month: 'Jan', revenue: 180000, mrr: 165000, arr: 1980000 },
  { month: 'Feb', revenue: 195000, mrr: 178000, arr: 2136000 },
  { month: 'Mar', revenue: 212000, mrr: 194000, arr: 2328000 },
  { month: 'Apr', revenue: 228000, mrr: 208000, arr: 2496000 },
  { month: 'May', revenue: 241000, mrr: 222000, arr: 2664000 },
  { month: 'Jun', revenue: 258000, mrr: 236000, arr: 2832000 },
  { month: 'Jul', revenue: 247000, mrr: 228000, arr: 2736000 },
  { month: 'Aug', revenue: 271000, mrr: 249000, arr: 2988000 },
  { month: 'Sep', revenue: 263000, mrr: 241000, arr: 2892000 },
  { month: 'Oct', revenue: 289000, mrr: 265000, arr: 3180000 },
  { month: 'Nov', revenue: 301000, mrr: 276000, arr: 3312000 },
  { month: 'Dec', revenue: 284750, mrr: 261000, arr: 3132000 },
];

export const mockUserGrowthData: UserGrowthDataPoint[] = [
  { month: 'Jan', active: 12400, new: 1840, churned: 312 },
  { month: 'Feb', active: 13200, new: 1920, churned: 298 },
  { month: 'Mar', active: 14100, new: 2100, churned: 341 },
  { month: 'Apr', active: 14900, new: 2240, churned: 287 },
  { month: 'May', active: 15600, new: 1980, churned: 324 },
  { month: 'Jun', active: 16400, new: 2350, churned: 312 },
  { month: 'Jul', active: 16100, new: 1870, churned: 401 },
  { month: 'Aug', active: 17200, new: 2580, churned: 298 },
  { month: 'Sep', active: 17800, new: 2140, churned: 356 },
  { month: 'Oct', active: 18100, new: 2490, churned: 312 },
  { month: 'Nov', active: 18600, new: 2720, churned: 287 },
  { month: 'Dec', active: 18492, new: 2380, churned: 341 },
];

export const mockChannelData: ChannelDataPoint[] = [
  { channel: 'Organic', users: 6840, revenue: 98200, conversion: 4.2 },
  { channel: 'Paid Search', users: 4210, revenue: 72400, conversion: 3.8 },
  { channel: 'Social', users: 3190, revenue: 48600, conversion: 2.9 },
  { channel: 'Referral', users: 2840, revenue: 44800, conversion: 5.1 },
  { channel: 'Email', users: 1412, revenue: 20750, conversion: 6.3 },
];

const firstNames = ['Aria', 'Marcus', 'Priya', 'Leon', 'Sofia', 'Jin', 'Amara', 'Ethan', 'Lena', 'Omar',
  'Zara', 'Felix', 'Nadia', 'Kai', 'Ingrid', 'Rafael', 'Mei', 'Tobias', 'Aisha', 'Luca'];
const lastNames = ['Chen', 'Rodriguez', 'Patel', 'Kim', 'Müller', 'Hassan', 'Novak', 'Singh', 'Okonkwo', 'Laurent',
  'Tanaka', 'Andersen', 'Kowalski', 'Diallo', 'Fernandez', 'Weber', 'Nakamura', 'Osei', 'Petrov', 'Williams'];
const plans: User['plan'][] = ['free', 'pro', 'enterprise'];
const statuses: User['status'][] = ['active', 'active', 'active', 'inactive', 'suspended'];
const roles: User['role'][] = ['user', 'user', 'user', 'user', 'admin'];

function randomDate(start: Date, end: Date): string {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}

export const mockUsers: User[] = Array.from({ length: 80 }, (_, i) => {
  const firstName = firstNames[i % firstNames.length];
  const lastName = lastNames[Math.floor(i / firstNames.length) % lastNames.length];
  const plan = plans[Math.floor(Math.random() * plans.length)];
  return {
    id: `usr_${String(i + 1).padStart(4, '0')}`,
    name: `${firstName} ${lastName}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${['acme', 'globex', 'initech', 'hooli', 'piedpiper'][i % 5]}.io`,
    role: roles[Math.floor(Math.random() * roles.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    plan,
    revenue: plan === 'enterprise' ? Math.floor(Math.random() * 5000) + 2000
      : plan === 'pro' ? Math.floor(Math.random() * 500) + 100
      : 0,
    joinedAt: randomDate(new Date('2023-01-01'), new Date('2024-10-01')),
    lastActive: randomDate(new Date('2024-10-01'), new Date('2024-12-31')),
  };
});
