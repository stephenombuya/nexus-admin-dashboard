# NexusAdmin — Enterprise SaaS Dashboard

A production-grade SaaS admin dashboard built with React, TypeScript, and Redux. Designed with a "Refined Data Terminal" aesthetic — inspired by Linear and Vercel console.

## Features

### Core
- **Sidebar navigation** with collapsible menu, active indicators, and mobile drawer
- **4 Key metric cards** — MRR, Active Users, Churn Rate, MoM Growth with animated transitions
- **Revenue Chart** — Area chart with Revenue / MRR / ARR toggle (Recharts)
- **User Growth Chart** — Bar chart showing new vs churned users
- **Acquisition Channels** — Progress bars with conversion rates
- **Users Data Table** — 80 mock users with sorting, filtering (status/plan), search, and pagination
- **Dark / Light mode** toggle with `localStorage` persistence
- **Fully responsive** — mobile-first with collapsible sidebar drawer

### Advanced
- **Redux Toolkit** state management with typed hooks
- **Simulated async API** with realistic 1.2s delay and occasional error simulation
- **Skeleton UI** — loading states for all data-heavy sections
- **Error Boundary** — catches render errors with retry mechanism
- **Inline error** for API failures with retry button
- **Role-based access control** — Admin vs User roles hide/show pages and data columns
- **Live Activity Feed** — simulated real-time events every 4 seconds
- **Auto-refresh** — dashboard re-fetches every 30 seconds
- **Smooth animations** — staggered fade-in, slide-up on all cards and charts

### Pages
| Route | Description | Access |
|---|---|---|
| `/` | Dashboard | All |
| `/analytics` | Deep-dive charts | All |
| `/users` | User management + table | Admin only |
| `/revenue` | Revenue metrics | Admin only |
| `/activity` | Live event feed | All |
| `/settings` | Theme, RBAC, notifications | All |

## Tech Stack

- **React 18** + **TypeScript**
- **Redux Toolkit** — state management
- **React Router v6** — client-side routing
- **Recharts** — data visualizations
- **Tailwind CSS** — utility-first styling
- **Lucide React** — icon library
- **date-fns** — date formatting
- **Vite** — build tool
- **Vitest** + **Testing Library** — unit tests

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn or pnpm

### Installation

```bash
# 1. Navigate to project directory
cd saas-dashboard

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Other Commands

```bash
# Run unit tests
npm test

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Dashboard/
│   │   ├── MetricCard.tsx        # KPI cards
│   │   ├── RevenueChart.tsx      # Area chart with view switcher
│   │   ├── UserGrowthChart.tsx   # Bar chart
│   │   ├── DataTable.tsx         # Sortable, filterable table
│   │   ├── ChannelBreakdown.tsx  # Acquisition channels
│   │   └── ActivityFeed.tsx      # Real-time event stream
│   ├── Layout/
│   │   ├── Sidebar.tsx           # Collapsible nav with RBAC
│   │   ├── Header.tsx            # Theme toggle, refresh, user info
│   │   └── Layout.tsx            # Page wrapper
│   └── UI/
│       ├── Skeleton.tsx          # Loading placeholder components
│       ├── ErrorBoundary.tsx     # React error boundary + inline error
│       └── Badge.tsx             # Status/plan badges
├── pages/
│   ├── Dashboard.tsx             # Main dashboard
│   ├── Analytics.tsx             # Analytics deep-dive
│   ├── Users.tsx                 # User management (admin)
│   ├── Revenue.tsx               # Revenue page (admin)
│   ├── Activity.tsx              # Activity feed
│   └── Settings.tsx              # Settings & preferences
├── store/
│   ├── index.ts                  # Redux store
│   └── slices/
│       ├── dashboardSlice.ts     # Async data fetching
│       ├── authSlice.ts          # User & role state
│       └── themeSlice.ts         # Theme persistence
├── data/
│   └── mockData.ts               # 80 mock users + chart data
├── hooks/
│   └── useAppStore.ts            # Typed useSelector/useDispatch
├── types/
│   └── index.ts                  # TypeScript interfaces
└── test/
    ├── setup.ts                  # Vitest setup
    └── MetricCard.test.tsx       # Unit tests
```

## Demo: Role Switching

To see RBAC in action:
1. Click the **role indicator** in the bottom of the sidebar
2. Switch between **admin** and **user** roles
3. Notice: Users and Revenue pages become accessible/restricted
4. Revenue column in the data table appears/disappears

## Design Decisions

- **Monochrome Data Terminal** aesthetic — dark-first, cyan accent, monospace for data
- **Syne** for display headings (geometric, distinctive)
- **DM Sans** for body text (readable, clean)
- **JetBrains Mono** for all data values, IDs, and code
- Micro-interactions on hover for cards and table rows
- Staggered `animation-delay` on card grids for polished load feel
