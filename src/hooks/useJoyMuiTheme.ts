'use client';

import useJoyTheme from '@joy/hooks/useJoyTheme';
import { JoyTheme } from '@joy/theme';
import DarkTheme from '@joy/theme/joy-dark';
import LightTheme from '@joy/theme/joy-light';
import { Theme } from '@mui/material/styles/createTheme';

export default function useJoyMuiTheme(): Theme | null {
  const { theme } = useJoyTheme();

  if (!theme) {
    return null;
  }

  let appTheme = theme === JoyTheme.Dark ? DarkTheme : LightTheme;

  return appTheme;
}
