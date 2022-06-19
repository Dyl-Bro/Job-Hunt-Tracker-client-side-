import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import interviewService from "../services/interview.service";
import { setMessage } from "./messageSlice";

export const createInterview = createAsyncThunk(
  "interviews/create",
  async (
    {
      positiveNotes,
      negativeNotes,
      behavioralInterviewScore,
      codingInterviewScore,
      systemDesignInterviewScore,
      companyName,
    },
    thunkAPI
  ) => {
    try {
      await interviewService.post({
        positiveNotes,
        negativeNotes,
        behavioralInterviewScore,
        codingInterviewScore,
        systemDesignInterviewScore,
        companyName,
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
export const getInterview = createAsyncThunk(
  "interviews/get",
  async ({ interviewID }) => {
    const response = await interviewService.get({ interviewID });
    return response.data;
  }
);
export const getInterviews = createAsyncThunk(
  "interviews/getAll",
  async (thunkAPI) => {
    try {
      const response = await interviewService.getAll();
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
export const deleteInterview = createAsyncThunk(
  "interviews/deleteInterview",
  async (thunkAPI) => {
    try {
      const response = await interviewService.deleteInterview();
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

const initialState = {
  interviews: [],
  isSuccess: false,
  isError: false,
};

const interviewsSlice = createSlice({
  name: "interviews",
  initialState,
  reducer: {
    reset: (state) => {
      state.isSuccess = false;
      state.isError = false;
    },
  },
  extraReducers: {
    [createInterview.fulfilled]: (state, action) => {
      state.isSuccess = true;
    },
    [getInterview.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [getInterviews.fulfilled]: (state, action) => {
      state.interviews = [...action.payload];
      state.isSucces = true;
    },
    [deleteInterview.fulfilled]: (state, action) => {
      state.isSucces = true;
    },
  },
});
export const { reset } = interviewsSlice.actions;
export default interviewsSlice.reducer;
