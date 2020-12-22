import { UseThemeArgs } from "../useTheme";
export declare const useLogics: <ThemeNames extends string>(args: UseThemeArgs<ThemeNames>) => {
    initializeThemeName: import("react-hooks-async").AsyncTask<any, []>;
    setThemeNameWithDB: import("react-hooks-async").AsyncTask<any, [string]>;
};
