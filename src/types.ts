type Reducer<T, U> = import("react").Reducer<T, U>;

export type CreateThemeTypes<ThemeNames> = {
  Reduce: {
    State: { isLoading: boolean; themeName: ThemeNames };
    Action:
      | { type: "finishLoading" }
      | { type: "changeTheme"; themeName: ThemeNames };
    Reducer: Reducer<
      CreateThemeTypes<ThemeNames>["Reduce"]["State"],
      CreateThemeTypes<ThemeNames>["Reduce"]["Action"]
    >;
  };
  ThemeNameContent: [ThemeNames, (themeName: ThemeNames) => void];
};
