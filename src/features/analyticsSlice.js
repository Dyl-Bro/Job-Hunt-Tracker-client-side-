import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import analyticsService from "../services/analytics.service";
import { setMessage } from "./messageSlice";

export const BehavioralSkillAnalysis = createAsyncThunk(
    "analytics/getBehaviorScore",
    async(thunkAPI) => {
        try {
            const response = await analyticsService.getBehaviorScore();
            return response;
        } catch(error){
            const message = (error.response &&  error.response.data && error.response.data.message)
            || error.message || error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const CodingSkillAnalysis = createAsyncThunk(
    "analytics/getCodingScore",
    async(thunkAPI) => {
        try {
            const response = await analyticsService.getCodingScore();
            return response;
        } catch(error){
            const message = (error.response &&  error.response.data && error.response.data.message)
            || error.message || error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const SystemDesignSkillAnalysis = createAsyncThunk(
    "analytics/getSystemDesignScore",
    async(thunkAPI) => {
        try {
            const response = await analyticsService.getSystemDesignScore();
            return response;
        } catch(error){
            const message = (error.response &&  error.response.data && error.response.data.message)
            || error.message || error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const App_to_InterviewSuccessRate = createAsyncThunk(
    "analytics/getInterviewSuccessRate",
    async(thunkAPI) => {
        try {
            const response = await analyticsService.getInterviewSuccessRate();
            return response;
        } catch(error){
            const message = (error.response &&  error.response.data && error.response.data.message)
            || error.message || error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const Interview_to_OfferSuccessRate = createAsyncThunk(
    "analytics/getOfferSuccessRate",
    async(thunkAPI) => {
        try {
            const response = await analyticsService.getOfferSuccessRate();
            return response;
        } catch(error){
            const message = (error.response &&  error.response.data && error.response.data.message)
            || error.message || error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const initialState = {
    analytics: [],
    isSuccess: false,
    isError: false,
}; 

const applicationsSlice = createSlice({
    name: "analytics",
    initialState,
    reducer: {
        reset: (state) => {
            state.isSuccess=false
            state.isError=false
        }
    },
    extraReducers: {
        [BehavioralSkillAnalysis.fulfilled]: (state, action) => {
            state.analytics= [...action.payload]
            state.isSucces = true
        },
        [CodingSkillAnalysis.fulfilled]: (state, action) => {
            state.analytics= [...action.payload]
            state.isSucces = true
        },
        [SystemDesignSkillAnalysis.fulfilled]: (state, action) => {
            state.analytics= [...action.payload]
            state.isSucces = true
        },
        [App_to_InterviewSuccessRate.fulfilled]: (state, action) => {
            state.analytics= [...action.payload]
            state.isSucces = true
        },
        [Interview_to_OfferSuccessRate.fulfilled]: (state, action) => {
            state.analytics= [...action.payload]
            state.isSucces = true
        },
    },
});
export const { reset} = applicationsSlice.actions;
export default applicationsSlice.reducer;
