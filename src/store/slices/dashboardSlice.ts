import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DashboardState } from '../../types';
import { mockMetrics, mockRevenueData, mockUserGrowthData, mockChannelData, mockUsers } from '../../data/mockData';

// Simulate API call with realistic delay
export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      // Simulate occasional errors (5% chance)
      if (Math.random() < 0.05) {
        throw new Error('Network timeout: Failed to fetch dashboard data');
      }
      return {
        metrics: mockMetrics,
        revenueData: mockRevenueData,
        userGrowthData: mockUserGrowthData,
        channelData: mockChannelData,
        users: mockUsers,
        lastUpdated: new Date().toISOString(),
      };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const refreshMetrics = createAsyncThunk(
  'dashboard/refreshMetrics',
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    // Simulate slight variation in live data
    return mockMetrics.map((m) => ({
      ...m,
      value: typeof m.value === 'number'
        ? Math.round(m.value * (1 + (Math.random() - 0.5) * 0.02))
        : m.value,
    }));
  }
);

const initialState: DashboardState = {
  metrics: [],
  revenueData: [],
  userGrowthData: [],
  channelData: [],
  users: [],
  loading: false,
  error: null,
  lastUpdated: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.metrics = action.payload.metrics;
        state.revenueData = action.payload.revenueData;
        state.userGrowthData = action.payload.userGrowthData;
        state.channelData = action.payload.channelData;
        state.users = action.payload.users;
        state.lastUpdated = action.payload.lastUpdated;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(refreshMetrics.fulfilled, (state, action) => {
        state.metrics = action.payload;
        state.lastUpdated = new Date().toISOString();
      });
  },
});

export const { clearError } = dashboardSlice.actions;
export default dashboardSlice.reducer;
