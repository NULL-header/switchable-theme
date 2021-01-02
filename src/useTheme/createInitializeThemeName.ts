import { UseThemeArgs } from "./useTheme";

export const createInitializeThemeName = <ThemeNames>(
  args: UseThemeArgs<ThemeNames>
) => async ({ signal }: AbortController) => {
  const { cacheKey, defaultThemeName, db, setState } = args;
  if (signal.aborted) return;
  setState({ isLoading: true });
  const lastThemeName = await db.get(cacheKey);
  if (signal.aborted) return;
  setState({
    themeName: lastThemeName || defaultThemeName,
    isLoading: false,
  });
};
