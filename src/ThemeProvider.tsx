import React from "react";
import { Theming } from "react-jss";

export const createThemeProvider = function <T, U extends Theming<T[keyof T]>>(
  theming: U,
  themes: T
): React.FC<{ themeName: keyof T }> {
  return React.memo((props) => {
    const theme = themes[props.themeName];
    return (
      <theming.ThemeProvider theme={theme as any}>
        {props.children}
      </theming.ThemeProvider>
    );
  });
};
