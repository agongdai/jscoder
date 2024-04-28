import { Theme } from '@mui/material/styles/createTheme';

import darkTheme from './jsc-dark';
import lightTheme from './jsc-light';

export * from './palette';

export enum JoyTheme {
  // eslint-disable-next-line no-unused-vars
  Light = 'light',
  // eslint-disable-next-line no-unused-vars
  Dark = 'dark',
}

export const DEFAULT_THEME = JoyTheme.Light;

export const themes: Record<JoyTheme, Theme> = {
  [JoyTheme.Light]: lightTheme,
  [JoyTheme.Dark]: darkTheme,
};
