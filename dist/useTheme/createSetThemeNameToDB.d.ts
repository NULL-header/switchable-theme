import { UseThemeArgs } from "./useTheme";
export declare const createSetThemeNameToDB: <ThemeNames>(args: UseThemeArgs<ThemeNames>) => (themeName: ThemeNames) => ({ signal }: AbortController) => Promise<void>;
