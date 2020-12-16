import { useMemo } from "react";
import { KVSIndexedDB } from "@kvs/indexeddb";
import { useAsyncRun } from "react-hooks-async";
import { Theming } from "react-jss";

import { useLogics } from "./logics";
import { createThemeProvider } from "./ThemeProvider";

type State<ThemeNames> = {
  isLoading: boolean;
  isSetting: boolean;
  themeName: ThemeNames;
};

export type UseThemeArgs<ThemeNames> = {
  cacheKey: string;
  db: KVSIndexedDB<any>;
  defaultThemeName: ThemeNames;
  setState: (arg: Partial<State<ThemeNames>>) => void;
};

export const createUseTheme = <ThemeNames>() => <T extends Theming<any>, U>(
  theming: T,
  themes: U
) => (
  cacheKey: string,
  db: KVSIndexedDB<any>,
  defaultThemeName: ThemeNames,
  setState: (arg: Partial<State<ThemeNames>>) => void
) => {
  const args = useMemo(
    () => ({
      cacheKey,
      db,
      defaultThemeName,
      setState,
    }),
    [cacheKey, db, defaultThemeName, setState]
  );
  const logics = useLogics<ThemeNames>(args);
  useAsyncRun(logics.initializeThemeName);
  return useMemo(() => {
    const setThemeNameWithDB = (themeName: ThemeNames) =>
      logics.setThemeNameWithDB.start(themeName as any);
    const ThemeProvider = useMemo(
      () => createThemeProvider(theming, themes),
      []
    );
    return { setThemeNameWithDB, ThemeProvider };
  }, [logics.setThemeNameWithDB]);
};
