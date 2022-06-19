import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import applicationService from "../services/application.service";
import { setMessage } from "./messageSlice";

export const createApplication = createAsyncThunk(
  "applications/create",
  async (
    { appDate, companyName, location, link, interviewReceived, offerReceived },
    thunkAPI
  ) => {
    try {
      await applicationService.post({
        appDate,
        companyName,
        location,
        link,
        interviewReceived,
        offerReceived,
      });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getApplications = createAsyncThunk(
  "applications/getAll",
  async (thunkAPI) => {
    try {
      const response = await applicationService.getAll();
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const deleteApplication = createAsyncThunk(
  "applications/deleteApp",
  async (thunkAPI) => {
    try {
      const response = await applicationService.deleteApp();
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateApplication = createAsyncThunk(
  "applications/update",
  async ({ interview_received, offer_received }, thunkAPI) => {
    try {
      await applicationService.update({ interview_received, offer_received });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  applications: [],
  isSuccess: false,
  isError: false,
};

const applicationsSlice = createSlice({
  name: "applications",
  initialState,
  reducer: {
    reset: (state) => {
      state.isSuccess = false;
      state.isError = false;
    },
  },
  extraReducers: {
    [createApplication.fulfilled]: (state, action) => {
      state.isSuccess = true;
    },
    [getApplications.fulfilled]: (state, action) => {
      state.applications = [...action.payload];
      state.isSucces = true;
    },
    [updateApplication.fulfilled]: (state, action) => {
      state.isSuccess = true;
    },
    [deleteApplication.fulfilled]: (state, action) => {
      state.isSuccess = true;
    },
  },
});
export const { reset } = applicationsSlice.actions;
export default applicationsSlice.reducer;
