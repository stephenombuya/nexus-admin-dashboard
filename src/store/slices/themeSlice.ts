import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeState, Theme } from '../../types';

const savedTheme = localStorage.getItem('nexus_theme') as Theme | null;

const initialState: ThemeState = {
  theme: savedTheme || 'dark',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('nexus_theme', state.theme);
    },
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
      localStorage.setItem('nexus_theme', state.theme);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
