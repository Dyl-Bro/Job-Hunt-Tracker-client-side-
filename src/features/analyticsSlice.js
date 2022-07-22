import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import analyticsService from "../services/analytics.service";
import { setMessage } from "./messageSlice";

export const BehavioralSkillAnalysis = createAsyncThunk(
  "analytics/getBehaviorScore",
  async (thunkAPI) => {
    try {
      const response = await analyticsService.getBehaviorScore();
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
export const CodingSkillAnalysis = createAsyncThunk(
  "analytics/getCodingScore",
  async (thunkAPI) => {
    try {
      const response = await analyticsService.getCodingScore();
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
export const SystemDesignSkillAnalysis = createAsyncThunk(
  "analytics/getSystemDesignScore",
  async (thunkAPI) => {
    try {
      const response = await analyticsService.getSystemDesignScore();
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
export const App_to_InterviewSuccessRate = createAsyncThunk(
  "analytics/getInterviewSuccessRate",
  async (thunkAPI) => {
    try {
      const response = await analyticsService.getInterviewSuccessRate();
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
export const Interview_to_OfferSuccessRate = createAsyncThunk(
  "analytics/getOfferSuccessRate",
  async (thunkAPI) => {
    try {
      const response = await analyticsService.getOfferSuccessRate();
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
  behaviorScore: 0,
  codingScore: 0,
  designScore: 0,
  interviewSuccess: [],
  offerSuccess: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
};

const applicationsSlice = createSlice({
  name: "analytics",
  initialState,
  reducer: {
    reset: (state) => {
      state.isSuccess = false;
      state.isError = false;
    },
  },
  extraReducers: {
    [BehavioralSkillAnalysis.pending]: (state, action) => {
      state.isLoading = true;
    },
    [BehavioralSkillAnalysis.fulfilled]: (state, action) => {
      state.behaviorScore = action.payload;
      state.isSuccess = true;
      state.isLoading = false;
    },
    [CodingSkillAnalysis.pending]: (state, action) => {
      state.isLoading = true;
    },
    [CodingSkillAnalysis.fulfilled]: (state, action) => {
      state.codingScore = action.payload;
      state.isSuccess = true;
      state.isLoading = false;
    },
    [SystemDesignSkillAnalysis.pending]: (state, action) => {
      state.isLoading = true;
    },
    [SystemDesignSkillAnalysis.fulfilled]: (state, action) => {
      state.designScore = action.payload;
      state.isSuccess = true;
      state.isLoading = false;
    },
    [App_to_InterviewSuccessRate.pending]: (state, action) => {
      state.isLoading = true;
    },
    [App_to_InterviewSuccessRate.fulfilled]: (state, action) => {
      state.interviewSuccess = action.payload;
      state.isSuccess = true;
      state.isLoading = false;
    },
    [Interview_to_OfferSuccessRate.pending]: (state, action) => {
      state.isLoading = true;
    },
    [Interview_to_OfferSuccessRate.fulfilled]: (state, action) => {
      state.offerSuccess = action.payload;
      state.isSuccess = true;
      state.isLoading = false;
    },
  },
});
export const { reset } = applicationsSlice.actions;
export default applicationsSlice.reducer;
