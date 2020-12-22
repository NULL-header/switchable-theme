import { UseThemeArgs } from "../useTheme";

export type Logic<T, Args extends unknown[]> = <ThemeNames extends string>(
  useThemeArg: UseThemeArgs<ThemeNames>
) => (signalArg: AbortController, ...args: Args) => T;

export const createLogic = <T, U extends unknown[]>(logic: Logic<T, U>) =>
  logic;
