import { createSlice } from "@reduxjs/toolkit";

const formsSlice = createSlice({
  name: "forms",
  initialState: {
    addAppIsOpen: false,
    addInterviewIsOpen: false,
    addHiringContactIsOpen: false,
    updateAppIsOpen: false,
    updateInterviewIsOpen: false,
    updateHiringContactIsOpen: false,
  },
  reducers: {
    openAddApp: (state) => {
      state.addAppIsOpen = true;
    },
    closeAddApp: (state) => {
      state.addAppIsOpen = false;
    },
    openAddInterview: (state) => {
      state.addInterviewIsOpen = true;
    },
    closeAddInterview: (state) => {
      state.addInterviewIsOpen = false;
    },
    openAddHiringContact: (state) => {
      state.addHiringContactIsOpen = true;
    },
    closeAddHiringContact: (state) => {
      state.addHiringContactIsOpen = false;
    },
    openUpdateInterview: (state) => {
      state.updateInterviewIsOpen = true;
    },
    closeUpdateInterview: (state) => {
      state.updateInterviewIsOpen = false;
    },
    openUpdateHiringContact: (state) => {
      state.updateHiringContactIsOpen = true;
    },
    closeUpdateHiringContact: (state) => {
      state.updateHiringContactIsOpen = false;
    },
    openUpdateApp: (state) => {
      state.updateAppIsOpen = true;
    },
    closeUpdateApp: (state) => {
      state.updateAppIsOpen = false;
    },
  },
});

export const {
  openAddApp,
  closeAddApp,
  openUpdateApp,
  closeUpdateApp,
  openAddInterview,
  closeAddInterview,
  openUpdateInterview,
  closeUpdateInterview,
  openAddHiringContact,
  closeAddHiringContact,
  openUpdateHiringContact,
  closeUpdateHiringContact,
} = formsSlice.actions;
export const selectAddAppIsOpen = (state) => state.forms.addAppIsOpen;
export const selectUpdateAppIsOpen = (state) => state.forms.UpdateAppIsOpen;
export default formsSlice.reducer;
