import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

import { DEFAULT_THEME, JscTheme, themes } from '../src/theme';

import '../src/app/[lang]/globals.css';

export const withMuiTheme = (Story: React.FC, context: Record<string, any>) => {
  const { theme: themeKey = DEFAULT_THEME } = context.globals;

  // only recompute the theme if the themeKey changes
  const theme = React.useMemo(
    () => themes[themeKey as JscTheme] || themes[JscTheme.Light],
    [themeKey],
  );

  React.useEffect(() => {
    const htmlTag = document.documentElement;

    // Set the "data-mode" attribute on the iFrame html tag
    htmlTag.setAttribute('data-mode', themeKey);
    if (themeKey === JscTheme.Dark) {
      htmlTag.classList.add('dark');
    } else {
      htmlTag.classList.remove('dark');
    }
  }, [themeKey]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box p={8}>
        <Story />
      </Box>
    </ThemeProvider>
  );
};
