import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addTour } from "../../api";

export const createTour = createAsyncThunk(
  "tours/create-tour",
  async ({ updateTourData, navigate, toast }, { rejectWithValue }) => {
    try {
      const res = await addTour(updateTourData);
      toast.success("Tour Added Successfully");
      navigate("/");

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const tourSlice = createSlice({
  name: "tour",
  initialState: {
    tour: {},
    tours: [],
    userTours: [],
    error: "",
    loading: false,
  },
  reducers: {
    resetError: (state, action) => {
      state.error = "";
    },
  },
  extraReducers: {
    [createTour.pending]: (state, action) => {
      state.loading = true;
    },
    [createTour.fulfilled]: (state, action) => {
      state.loading = false;
      state.tour = action.payload;
    },
    [createTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const tourReducer = tourSlice.reducer;
export const tourActions = tourSlice.actions;
