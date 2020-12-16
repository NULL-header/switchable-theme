import { useMemo } from "react";
import { useAsyncTask } from "react-hooks-async";

import { Logic } from "./createLogic";
import { UseThemeArgs } from "../useTheme";
import { createInitializeThemeName } from "./initializeThemeName";
import { createSetThemeNameWithDB } from "./setThemeNameWithDB";

const useLogic = <ThemeNames, T extends Promise<any>, U extends unknown[]>(
  factory: Logic<T, U>,
  arg: UseThemeArgs<ThemeNames>
) => {
  const logic = useMemo(() => factory(arg), [factory, arg]);
  return useAsyncTask(logic);
};

export const useLogics = <ThemeNames>(args: UseThemeArgs<ThemeNames>) => {
  const initializeThemeName = useLogic(createInitializeThemeName, args);
  const setThemeNameWithDB = useLogic(createSetThemeNameWithDB, args);
  return useMemo(() => {
    const logics = {
      initializeThemeName,
      setThemeNameWithDB,
    };
    return logics;
  }, [initializeThemeName, setThemeNameWithDB]);
};
