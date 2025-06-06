import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCampers } from '../api/campers';

export const fetchCampersThunk = createAsyncThunk(
  'campers/fetchAll',
  async (_, thunkAPI) => {
    try {
      const data = await getCampers();
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
