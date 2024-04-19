'use client';
import React from 'react';
import { useServerInsertedHTML } from 'next/navigation';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import useJscTheme from '@jsc/hooks/useJscTheme';
import { JscTheme } from '@jsc/theme/index';
import DarkTheme from '@jsc/theme/jsc-dark';
import LightTheme from '@jsc/theme/jsc-light';

// This implementation is from emotion-js
// https://github.com/emotion-js/emotion/issues/2928#issuecomment-1319747902
// Tried to follow https://mui.com/material-ui/integrations/nextjs/, but the page styles are not applied initially, then later applied.
export default function ThemeRegistry({
  options = { key: 'mui' },
  children,
}: {
  options?: Parameters<typeof createCache>[0];
  children: React.ReactNode;
}) {
  const { theme } = useJscTheme();
  const appTheme = theme === JscTheme.Dark ? DarkTheme : LightTheme;

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

  console.log('theme', theme);

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
