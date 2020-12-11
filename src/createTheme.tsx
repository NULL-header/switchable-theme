import React, { createContext, useContext, Reducer, useCallback } from "react";
import { useReducerAsync, AsyncActionHandlers } from "use-reducer-async";
import { createTheming } from "react-jss";
import { KVSIndexedDB } from "@kvs/indexeddb";

import { createMakeStyles } from "./createMakeStyles";

type CreateThemeTypes<ThemeNames> = {
  Reduce: {
    State: { isLoading: boolean; themeName: ThemeNames; isSetting: boolean };
    Action:
      | { type: "FINISH_LOADING" }
      | { type: "CHANGE_THEMENAME"; themeName: ThemeNames }
      | { type: "START_SETTING_TO_DB" };
    AsyncAction:
      | {
          type: "SET_THEME_TO_DB";
          db: KVSIndexedDB<any>;
          cacheKey: string;
          themeName: ThemeNames;
        }
      | {
          type: "LOAD_THEME_FROM_DB";
          db: KVSIndexedDB<any>;
          cacheKey: string;
          defaultThemeName: ThemeNames;
        };
    Reducer: Reducer<
      CreateThemeTypes<ThemeNames>["Reduce"]["State"],
      CreateThemeTypes<ThemeNames>["Reduce"]["Action"]
    >;
    AsyncReducer: AsyncActionHandlers<
      CreateThemeTypes<ThemeNames>["Reduce"]["Reducer"],
      CreateThemeTypes<ThemeNames>["Reduce"]["AsyncAction"]
    >;
  };
  ThemeNameContent: [ThemeNames, (themeName: ThemeNames) => void];
};

const createReducer = function <
  Reduce extends CreateThemeTypes<any>["Reduce"]
>() {
  const reducer: Reduce["Reducer"] = (state, action) => {
    switch (action.type) {
      case "FINISH_LOADING": {
        return { ...state, isLoading: false };
      }
      case "CHANGE_THEMENAME": {
        return { ...state, themeName: action.themeName, isSetting: false };
      }
      case "START_SETTING_TO_DB": {
        return { ...state, isSetting: true };
      }
      default: {
        throw new Error("unknown case at the reducer");
      }
    }
  };
  const asyncReducer: Reduce["AsyncReducer"] = {
    SET_THEME_TO_DB: ({ dispatch, signal }) => async (action) => {
      dispatch({ type: "START_SETTING_TO_DB" });
      await action.db.set(action.cacheKey, action.themeName);
      if (!signal.aborted)
        dispatch({ type: "CHANGE_THEMENAME", themeName: action.themeName });
    },
    LOAD_THEME_FROM_DB: ({ dispatch, signal }) => async (action) => {
      const cache = await action.db.get(action.cacheKey);
      const themeName = cache == null ? action.defaultThemeName : cache;
      if (!signal.aborted) dispatch({ type: "CHANGE_THEMENAME", themeName });
    },
  };
  return { reducer, asyncReducer };
};

export const createTheme = function <Theme, ThemeNames extends string>(
  themes: Record<ThemeNames, Theme>
) {
  type Types = CreateThemeTypes<ThemeNames>;

  const ThemeContext = createContext({} as Theme);
  const Theming = createTheming(ThemeContext);

  const makeStyles = createMakeStyles(Theming);

  const ThemeNameContext = createContext({} as Types["ThemeNameContent"]);
  const useThemeName = () => useContext(ThemeNameContext);

  const { asyncReducer, reducer } = createReducer<Types["Reduce"]>();
  const firstThemeName = Object.keys(themes)[0] as ThemeNames;
  const defaultState: Types["Reduce"]["State"] = {
    isLoading: true,
    themeName: firstThemeName,
    isSetting: false,
  };
  const ThemeProvider: React.FC<{
    db: KVSIndexedDB<any>;
    cacheKey: string;
    LodingComponent: () => JSX.Element;
  }> = React.memo((props) => {
    const [state, dispatch] = useReducerAsync(
      reducer,
      defaultState,
      asyncReducer
    );
    const themeSetter = useCallback(
      (themeName: ThemeNames) =>
        dispatch({
          type: "SET_THEME_TO_DB",
          cacheKey: props.cacheKey,
          db: props.db,
          themeName,
        }),
      [dispatch, props.cacheKey, props.db]
    );
    if (state.isLoading) {
      return <props.LodingComponent />;
    } else {
      const themeNameValue: Types["ThemeNameContent"] = [
        state.themeName,
        themeSetter,
      ];
      const theme = themes[state.themeName];
      return (
        <Theming.ThemeProvider theme={theme as any}>
          <ThemeNameContext.Provider value={themeNameValue}>
            {props.children}
          </ThemeNameContext.Provider>
        </Theming.ThemeProvider>
      );
    }
  });
  return { useThemeName, ThemeProvider, makeStyles, Theming };
};
