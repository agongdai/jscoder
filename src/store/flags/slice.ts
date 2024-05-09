import { ColorVariable } from '@prisma/client';
import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
export interface FlagsState {
  createCvModalOpen: boolean;
  cvBeingUpdated: ColorVariable | null;
}

// Define the initial state using that type
const initialState: FlagsState = {
  createCvModalOpen: false,
  cvBeingUpdated: null,
};

export const flagsSlice = createSlice({
  name: 'flags',
  initialState,
  reducers: {
    toggleCreateCvModal: (state) => {
      state.createCvModalOpen = !state.createCvModalOpen;
    },
    setCvBeingUpdated: (state, action) => {
      state.cvBeingUpdated = action.payload;
    },
  },
});

export default flagsSlice.reducer;
