import { createSlice } from '@reduxjs/toolkit';

const initialThemeState = {
    mode: 'light',
};

const themeSlice = createSlice({
    name: 'theme',
    initialState: initialThemeState,
    reducers: {
        toggleTheme(state) {
            state.mode = state.mode ===  'light'? 'dark' : 'light';
        }
    },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
