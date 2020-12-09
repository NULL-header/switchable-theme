type React = typeof import("react");
type Reducer<T, U> = React.Reducer<T, U>;
type CSSProperties = React.CSSProperties;

// for createTheme.tsx
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

// for createMakeStyles.ts
export type MassJSS<Styles, Props> = {
  [Key in keyof Styles]: Key extends keyof CSSProperties
    ? CSSProperties[Key] | ((props: Props) => CSSProperties[Key])
    : CSSProperties | MassJSS<Styles[Key], Props>;
};

export type BranchArg<Styles, Props> = Props extends undefined
  ? () => Record<keyof UIEvent, string>
  : (arg: Props) => Record<keyof Styles, string>;

export type Theming<T> = import("react-jss").Theming<T>;
