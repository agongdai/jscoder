import useJoyTheme from '@joy/hooks/useJoyTheme';
import { useJoySelector } from '@joy/store';
import { selectPrimaryColor } from '@joy/store/theming/selectors';
import { JoyTheme } from '@joy/theme';
import DarkTheme, { darkThemeOptions } from '@joy/theme/joy-dark';
import LightTheme, { lightThemeOptions } from '@joy/theme/joy-light';
import createTheme, { Theme } from '@mui/material/styles/createTheme';

export default function useJoyMuiTheme(): Theme | null {
  const { theme } = useJoyTheme();
  const primaryColor = useJoySelector(selectPrimaryColor);

  if (!theme) {
    return null;
  }

  let appTheme = theme === JoyTheme.Dark ? DarkTheme : LightTheme;

  if (primaryColor.length > 2) {
    const customTheme = createTheme(theme === JoyTheme.Dark ? darkThemeOptions : lightThemeOptions);
    customTheme.palette.primary.main = primaryColor;
    appTheme = customTheme;
  }

  return appTheme;
}
