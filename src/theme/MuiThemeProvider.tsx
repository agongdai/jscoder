'use client';
import React, { PropsWithChildren } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

import DarkTheme from './joy-dark';

// Tried to follow https://mui.com/material-ui/integrations/nextjs/, but the page styles are not applied initially, then later applied.
// @note Loading localStorage value to redux initially will show hydration mismatch error.
export default function MuiThemeProvider({ children }: PropsWithChildren) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={DarkTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
