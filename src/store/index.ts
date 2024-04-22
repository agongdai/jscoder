import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import domReducer from './dom/slice';
import { loadState } from './localStorage';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    dom: domReducer,
  },
  preloadedState: loadState(),
});

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useJscDispatch: () => AppDispatch = useDispatch;
export const useJscSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
