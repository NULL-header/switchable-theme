import { createContext } from "react";
import { createTheming } from "react-jss";

import { createMakeStyles } from "./createMakeStyles";
import { createUseTheme } from "./useTheme/useTheme";

export const createTheme = function <Theme, ThemeNames extends string>(
  themes: Record<ThemeNames, Theme>
) {
  const ThemeContext = createContext({} as Theme);
  const Theming = createTheming(ThemeContext);
  const makeStyles = createMakeStyles(Theming);
  const useTheme = createUseTheme(Theming, themes);
  return { useTheme, makeStyles, Theming };
};
