import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import contactService from "../services/contact.service";
import { setMessage } from "./messageSlice";

export const createContact = createAsyncThunk(
  "contacts/create",
  async ({ first, last, position, company, email, phone }, thunkAPI) => {
    try {
      await contactService.post({
        first,
        last,
        position,
        company,
        email,
        phone,
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
export const getContact = createAsyncThunk(
  "contacts/get",
  async ({ interviewID }) => {
    const response = await contactService.get({ interviewID });
    return response.data;
  }
);
export const getContacts = createAsyncThunk(
  "contacts/getAll",
  async (thunkAPI) => {
    try {
      const response = await contactService.getAll();
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

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (thunkAPI) => {
    try {
      const response = await contactService.deleteContact();
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
  contacts: [],
  isSuccess: false,
  isError: false,
  isAdded: false,
  isDeleted: false,
  isLoading: false,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.isAdded = false;
      state.isDeleted = false;
      state.isLoading = false;
    },
  },
  extraReducers: {
    [createContact.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isAdded = true;
    },
    [getContact.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [deleteContact.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isDeleted = true;
    },
    [getContacts.fulfilled]: (state, action) => {
      state.contacts = [...action.payload];
      state.isSuccess = true;
    },
  },
});
export const { reset } = contactsSlice.actions;
export default contactsSlice.reducer;
