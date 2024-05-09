import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import domReducer from './dom/slice';
import flagsReducer from './flags/slice';
import themingReducer from './theming/slice';
import { loadState } from './localStorage';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    dom: domReducer,
    theming: themingReducer,
    flags: flagsReducer,
  },
  preloadedState: loadState(),
});

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useJoyDispatch: () => AppDispatch = useDispatch;
export const useJoySelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
