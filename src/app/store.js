import { configureStore } from "@reduxjs/toolkit";
import formsReducer from "../features/formsSlice";
import applicationsReducer from "../features/applicationsSlice";
import authReducer from "../features/authSlice2";
import messageReducer from "../features/messageSlice";
import interviewReducer from "../features/interviewsSlice";
import analyticsReducer from "../features/analyticsSlice";
import contactsReducer from "../features/contactsSlice";

export const store = configureStore({
  reducer: {
    forms: formsReducer,
    applications: applicationsReducer,
    interviews: interviewReducer,
    contacts: contactsReducer,
    message: messageReducer,
    auth: authReducer,
    analytics: analyticsReducer,
  },
});
