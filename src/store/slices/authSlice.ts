import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, UserRole } from '../../types';

const initialState: AuthState = {
  currentUser: {
    id: 'usr_admin',
    name: 'Alex Morgan',
    email: 'alex.morgan@company.io',
    role: 'admin',
  },
  isAuthenticated: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    switchRole(state, action: PayloadAction<UserRole>) {
      if (state.currentUser) {
        state.currentUser.role = action.payload;
      }
    },
    logout(state) {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
  },
});

export const { switchRole, logout } = authSlice.actions;
export default authSlice.reducer;
