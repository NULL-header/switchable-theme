import { UseThemeArgs } from "../useTheme";
export declare type Logic<T, Args extends unknown[]> = <ThemeNames extends string>(useThemeArg: UseThemeArgs<ThemeNames>) => (signalArg: AbortController, ...args: Args) => T;
export declare const createLogic: <T, U extends unknown[]>(logic: Logic<T, U>) => Logic<T, U>;
