import { domSlice, DomState } from '@jsc/store/dom/slice';

export type RootReducer = {
  dom: DomState,
}

const initialState: RootReducer = {
  dom: {
    ...domSlice.getInitialState(),
  },
};

const KEY = 'redux';

export function loadState() {
  try {
    const serializedState = localStorage.getItem(KEY);
    if (!serializedState) return initialState;
    return JSON.parse(serializedState) as RootReducer;
  } catch (e) {
    return undefined;
  }
}

export async function saveState(state: any) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(KEY, serializedState);
  } catch (e) {
    // Ignore
  }
}