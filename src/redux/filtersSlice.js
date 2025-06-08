import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    selectedEquipment: [],
    selectedVehicleType: '',
  },
  reducers: {
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
    },
  },
});

export const { toggleEquipment, setVehicleType, resetFilters } =
  filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;

export const selectFilters = state => state.filters;
