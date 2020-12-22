import React from "react";
import { Theming } from "react-jss";

export const createThemeProvider = function <T, U extends Theming<T[keyof T]>>(
  UserTheming: U,
  themes: T
): React.FC<{ themeName: keyof T }> {
  return React.memo((props) => {
    const theme = themes[props.themeName];
    return (
      <UserTheming.ThemeProvider theme={theme as any}>
        {props.children}
      </UserTheming.ThemeProvider>
    );
  });
};
