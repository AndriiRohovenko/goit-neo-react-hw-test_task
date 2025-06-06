import { createSlice, createSelector } from '@reduxjs/toolkit';
import { fetchCampersThunk } from './campersOps';
import { selectNameFilter } from './filtersSlice';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const campersSlice = createSlice({
  name: 'campers',
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCampersThunk.pending, handlePending)
      .addCase(fetchCampersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchCampersThunk.rejected, handleRejected);
  },
});

export const campersReducer = campersSlice.reducer;

export const selectCampers = state => state.campers.data;
export const selectLoading = state => state.campers.isLoading;
export const selectError = state => state.campers.error;
export const selectFilteredCampers = createSelector(
  [selectCampers, selectNameFilter],
  (campers, filterData) => {
    return campers.items.filter(item =>
      item.name.toLowerCase().includes(filterData)
    );
  }
);
