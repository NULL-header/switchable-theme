import { UseThemeArgs } from "./useTheme";

export const createSetThemeNameToDB = <ThemeNames>(
  args: UseThemeArgs<ThemeNames>
) => (themeName: ThemeNames) => async ({ signal }: AbortController) => {
  const { db, cacheKey, setState } = args;
  if (signal.aborted) return;
  setState({ isSetting: true });
  await db.set(cacheKey, themeName);
  if (signal.aborted) return;
  setState({ isSetting: false });
};
