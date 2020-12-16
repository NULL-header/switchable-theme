import { createLogic } from "./createLogic";

export const createInitializeThemeName = createLogic(
  ({ cacheKey, db, defaultThemeName, setState }) => async ({ signal }) => {
    let themeName = defaultThemeName;
    if (!signal.aborted) setState({ isLoading: true });
    themeName = await db.get(cacheKey);
    if (!signal.aborted) {
      setState({ themeName, isLoading: false });
    }
  }
);
