import { createSlice } from '@reduxjs/toolkit';

const loadFavorites = () => {
  const savedFavorites = localStorage.getItem('favorites');
  return savedFavorites ? JSON.parse(savedFavorites) : [];
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: loadFavorites(),
  reducers: {
    addFavorite(state, action) {
      state.push(action.payload);
      localStorage.setItem('favorites', JSON.stringify(state));
    },
    removeFavoriteByID(state, action) {
      const index = state.findIndex(camper => camper.id === action.payload);
      if (index > -1) {
        state.splice(index, 1);
        localStorage.setItem('favorites', JSON.stringify(state));
      }
    },
  },
});

export const { addFavorite, removeFavoriteByID } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
export const selectFavorites = state => state.favorites;
