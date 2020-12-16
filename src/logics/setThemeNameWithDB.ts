import { createLogic } from "./createLogic";

export const createSetThemeNameWithDB = createLogic(
  ({ db, defaultThemeName, cacheKey, setState }) => async (
    { signal },
    themeName: typeof defaultThemeName
  ) => {
    if (!signal.aborted) setState({ isSetting: true });
    await db.set(cacheKey, themeName);
    if (!signal.aborted) {
      setState({ themeName, isSetting: false });
    }
  }
);
