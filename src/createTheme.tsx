import React, { createContext, useContext, useReducer } from "react";
import { createTheming } from "react-jss";

// eslint-disable-next-line no-unused-vars
import { CreateThemeTypes } from "./types";

const createReducer = function <
  Reduce extends CreateThemeTypes<any>["Reduce"]
>() {
  const reducer: Reduce["Reducer"] = (state, action) => {
    switch (action.type) {
      case "finishLoading": {
        return { ...state, isLoading: false };
      }
      case "changeTheme": {
        return { ...state, themeName: action.themeName };
      }
    }
  };
  return reducer;
};

export const createSwithableTheme = function <Theme, ThemeNames extends string>(
  themes: Record<ThemeNames, Theme>
) {
  type Types = CreateThemeTypes<ThemeNames>;
  const ThemeContext = createContext({} as Theme);
  const Theming = createTheming(ThemeContext);
  const reducer = createReducer<Types["Reduce"]>();
  const ThemeNameContext = createContext({} as Types["ThemeNameContent"]);

  const useThemeName = () => useContext(ThemeNameContext);

  const firstThemeName = Object.keys(themes)[0] as ThemeNames;
  const defaultState: Types["Reduce"]["State"] = {
    isLoading: false,
    themeName: firstThemeName,
  };
  const ThemeProvider: React.FC = (props) => {
    const [state, dispatch] = useReducer(reducer, defaultState);
    const themeNameValue: Types["ThemeNameContent"] = [
      state.themeName,
      (themeName: ThemeNames) => dispatch({ type: "changeTheme", themeName }),
    ];
    const theme = themes[state.themeName];
    return (
      <Theming.ThemeProvider theme={theme as any}>
        <ThemeNameContext.Provider value={themeNameValue}>
          {props.children}
        </ThemeNameContext.Provider>
      </Theming.ThemeProvider>
    );
  };
  return { useThemeName, ThemeProvider };
};
