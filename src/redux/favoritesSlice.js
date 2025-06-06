import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    addFavorite(state, action) {
      state.push(action.payload);
    },
    removeFavoriteByID(state, action) {
      const index = state.findIndex(camper => camper.id === action.payload);
      state.splice(index, 1);
    },
  },
});

export const { addFavorite, removeFavoriteByID } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
export const selectFavorites = state => state;
