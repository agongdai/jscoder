'use client';
import React from 'react';
import { useServerInsertedHTML } from 'next/navigation';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import useJoyTheme from '@joy/hooks/useJoyTheme';
import { useJoySelector } from '@joy/store';
import { selectPrimaryColor } from '@joy/store/theming/selectors';
import { JoyTheme } from '@joy/theme/index';
import DarkTheme, { darkThemeOptions } from '@joy/theme/joy-dark';
import LightTheme, { lightThemeOptions } from '@joy/theme/joy-light';
import CssBaseline from '@mui/material/CssBaseline';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

// This implementation is from emotion-js
// https://github.com/emotion-js/emotion/issues/2928#issuecomment-1319747902
export default function ThemeRegistry({
  options = { key: 'mui' },
  children,
}: {
  options?: Parameters<typeof createCache>[0];
  children: React.ReactNode;
}) {
  const { theme } = useJoyTheme();
  const primaryColor = useJoySelector(selectPrimaryColor);

  let appTheme = theme === JoyTheme.Dark ? DarkTheme : LightTheme;

  if (primaryColor.length > 2) {
    const customTheme = createTheme(theme === JoyTheme.Dark ? darkThemeOptions : lightThemeOptions);
    customTheme.palette.primary.main = primaryColor;
    appTheme = customTheme;
  }

  const [{ cache, flush }] = React.useState(() => {
    const cache = createCache(options);
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = '';
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  if (!theme) {
    return null;
  }

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
