import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
export interface ThemingState {
  primaryColor: string;
}

// Define the initial state using that type
const initialState: ThemingState = {
  primaryColor: '',
};

export const themingSlice = createSlice({
  name: 'theming',
  initialState,
  reducers: {
    setPrimaryColor: (state, action: PayloadAction<string>) => {
      state.primaryColor = action.payload;
    },
  },
});

export default themingSlice.reducer;
