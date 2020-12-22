import { createLogic } from "./createLogic";

export const createSetThemeNameWithDB = createLogic(
  ({ db, cacheKey, setState }) => async ({ signal }, themeName: string) => {
    if (signal.aborted) return;
    setState({ isSetting: true });
    const status = db.set(cacheKey, themeName);
    await status;
    if (signal.aborted) return;
    setState({ themeName: themeName as any, isSetting: false });
  }
);
