import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    selectedLocation: '',
    selectedEquipment: [],
    selectedVehicleType: '',
  },
  reducers: {
    setVehicleLocation(state, action) {
      state.selectedLocation = action.payload;
    },
    toggleEquipment(state, action) {
      const equipment = action.payload;
      if (state.selectedEquipment.includes(equipment)) {
        state.selectedEquipment = state.selectedEquipment.filter(
          eq => eq !== equipment
        );
      } else {
        state.selectedEquipment.push(equipment);
      }
    },
    setVehicleType(state, action) {
      state.selectedVehicleType = action.payload;
    },

    resetFilters(state) {
      state.selectedEquipment = [];
      state.selectedVehicleType = '';
      state.selectedLocation = '';
    },
  },
});

export const {
  toggleEquipment,
  setVehicleType,
  setVehicleLocation,
  resetFilters,
} = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;

export const selectFilters = state => state.filters;
