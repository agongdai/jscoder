import { Theme } from '@mui/material/styles/createTheme';

import darkTheme from './jsc-dark';
import lightTheme from './jsc-light';

export * from './palette';

export enum JscTheme {
  // eslint-disable-next-line no-unused-vars
  Light = 'light',
  // eslint-disable-next-line no-unused-vars
  Dark = 'dark',
}

export const DEFAULT_THEME = JscTheme.Light;

export const themes: Record<JscTheme, Theme> = {
  [JscTheme.Light]: lightTheme,
  [JscTheme.Dark]: darkTheme,
};
