import { useMemo } from "react";
import { KVSIndexedDB } from "@kvs/indexeddb";
import { useAsyncRun, useAsyncTask } from "react-hooks-async";
import { Theming } from "react-jss";

import { createInitializeThemeName } from "./createInitializeThemeName";
import { createSetThemeNameToDB } from "./createSetThemeNameToDB";
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

const useHooks = <ThemeNames>(args: UseThemeArgs<ThemeNames>) => {
  const logics = useMemo(
    () => ({
      init: createInitializeThemeName(args),
      setThemeName: createSetThemeNameToDB(args),
    }),
    [args]
  );
  useAsyncRun(useAsyncTask(logics.init));
  return useMemo(
    () => ({
      useThemeNameEffect: (themeName: ThemeNames) => {
        const effect = useMemo(() => logics.setThemeName(themeName), [
          themeName,
        ]);
        useAsyncRun(useAsyncTask(effect));
      },
    }),
    [logics]
  );
};

export const createUseTheme = <
  T extends Theming<any>,
  U extends Record<string, any>
>(
  theming: T,
  themes: U
) => (
  cacheKey: string,
  db: KVSIndexedDB<any>,
  defaultThemeName: keyof U,
  setState: (arg: Partial<State<keyof U>>) => void
) => {
  const argsMemo = useMemo(
    () => ({ cacheKey, db, defaultThemeName, setState }),
    [cacheKey, db, defaultThemeName, setState]
  );
  const { useThemeNameEffect } = useHooks(argsMemo);
  return useMemo(
    () => createThemeProvider(theming, themes, useThemeNameEffect),
    [useThemeNameEffect]
  );
};
