import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCampers, getCamperById } from '../api/campers';

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

export const fetchCamperByIdThunk = createAsyncThunk(
  'campers/fetchById',
  async (id, thunkAPI) => {
    try {
      const data = await getCamperById(id);

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
