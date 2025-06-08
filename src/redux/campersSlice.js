import { createSlice, createSelector } from '@reduxjs/toolkit';
import { fetchCampersThunk, fetchCamperByIdThunk } from './campersOps';
import { selectFilters } from './filtersSlice';

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
    singleCamperData: null,
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
      .addCase(fetchCampersThunk.rejected, handleRejected)

      .addCase(fetchCamperByIdThunk.pending, handlePending)
      .addCase(fetchCamperByIdThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.singleCamperData = action.payload;
      })
      .addCase(fetchCamperByIdThunk.rejected, handleRejected);
  },
});

export const campersReducer = campersSlice.reducer;

export const selectCampers = state => state.campers.data;
export const selectSingleCamper = (state, camperId) => {
  return state.campers.singleCamperData?.id === camperId
    ? state.campers.singleCamperData
    : null;
};
export const selectLoading = state => state.campers.isLoading;
export const selectError = state => state.campers.error;
export const selectFilteredCampers = createSelector(
  [selectCampers, selectFilters],
  (campers, filters) => {
    const { selectedEquipment, selectedVehicleType } = filters;

    const fieldMap = {
      automatic: camper => camper.transmission === 'automatic',
      AC: camper => camper.AC === true,
      TV: camper => camper.TV === true,
      kitchen: camper => camper.kitchen === true,
      bathroom: camper => camper.bathroom === true,
    };

    return campers.items.filter(camper => {
      const matchesEquipment = selectedEquipment.every(eq =>
        fieldMap[eq] ? fieldMap[eq](camper) : true
      );

      const matchesType =
        !selectedVehicleType || camper.form === selectedVehicleType;

      return matchesEquipment && matchesType;
    });
  }
);
