'use client';
import React from 'react';

import { faMoonStars, faSunBright } from '@fortawesome/pro-duotone-svg-icons';
import AwesomeIcon from '@joy/components/AwesomeIcon';
import JoyTooltip from '@joy/components/ui/JoyTooltip';
import useJoyTheme from '@joy/hooks/useJoyTheme';
import { JoyTheme } from '@joy/theme';
import IconButton from '@mui/material/IconButton';

export default function ThemeSwitch() {
  const { theme, setTheme } = useJoyTheme();

  if (!theme) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === JoyTheme.Dark ? JoyTheme.Light : JoyTheme.Dark);
  };

  return (
    <JoyTooltip title='Switch theme'>
      <IconButton onClick={toggleTheme}>
        <AwesomeIcon icon={theme === JoyTheme.Dark ? faSunBright : faMoonStars} size='sm' />
      </IconButton>
    </JoyTooltip>
  );
}
