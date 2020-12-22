import { createLogic } from "./createLogic";

export const createInitializeThemeName = createLogic(
  ({ cacheKey, db, defaultThemeName, setState }) => async ({ signal }) => {
    if (signal.aborted) return;
    setState({ isLoading: true });
    const lastThemeName = await db.get(cacheKey);
    if (signal.aborted) return;
    setState({
      themeName: lastThemeName || defaultThemeName,
      isLoading: false,
    });
  }
);
