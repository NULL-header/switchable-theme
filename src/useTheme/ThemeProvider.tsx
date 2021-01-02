import React from "react";
import { Theming } from "react-jss";

export const createThemeProvider = function <T, U extends Theming<T[keyof T]>>(
  UserTheming: U,
  themes: T,
  useThemeNameEffect: (themeName: keyof T) => void
): React.FC<{ themeName: keyof T }> {
  return React.memo((props) => {
    const theme = themes[props.themeName];
    useThemeNameEffect(props.themeName);
    return (
      <UserTheming.ThemeProvider theme={theme as any}>
        {props.children}
      </UserTheming.ThemeProvider>
    );
  });
};
