import { RootState } from '@joy/store';

export const selectPrimaryColor = (state: RootState) => state.theming.primaryColor;
