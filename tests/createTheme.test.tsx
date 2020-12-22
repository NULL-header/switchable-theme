import React from "react";
import { render, waitFor, screen, act } from "@testing-library/react";
import { createTheme } from "src";

const themes = {
  theme1: { color: "green" },
  theme2: { color: "blue" },
};
type ThemeNames = keyof typeof themes;
const theme = createTheme(themes);
const useStyles = theme.makeStyles()((theme) => ({
  className1: {
    color: theme.color,
  },
}));
const dbMocked = { set: jest.fn(), get: jest.fn() };
const defaultThemeName = "theme1";
const cacheKey = "cacheKey";
const ComponentMocked = () => {
  const classes = useStyles();
  return <div className={classes.className1} data-testid="target" />;
};
const stateSpy = jest.fn();

describe("integration test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("able to switch theme", async () => {
    let setThemeName: (themeName: ThemeNames) => Promise<void>;
    type State = {
      isSetting: boolean;
      isLoading: boolean;
      themeName: ThemeNames;
    };
    const ContainerMocked = () => {
      const [state, setState] = React.useState<State[]>([
        { isLoading: false, isSetting: false, themeName: "theme1" },
      ]);
      const insertState = React.useCallback(
        (args: Partial<State>) =>
          setState((state) => {
            stateSpy(args);
            return [{ ...state[0], ...args }];
          }),
        []
      );
      const { ThemeProvider, setThemeNameWithDB } = theme.useTheme(
        cacheKey,
        dbMocked as any,
        defaultThemeName,
        insertState
      );
      React.useEffect(() => {
        setThemeName = setThemeNameWithDB;
      }, [setThemeNameWithDB]);
      return (
        <ThemeProvider themeName={state[0].themeName}>
          <ComponentMocked />
        </ThemeProvider>
      );
    };
    expect(stateSpy).not.toBeCalled();
    render(<ContainerMocked />);
    const target = screen.getByTestId("target");
    const style = window.getComputedStyle(target);
    expect(style).toHaveProperty("color", themes.theme1.color);
    expect(stateSpy).toHaveBeenLastCalledWith({ isLoading: true });
    await waitFor(() => {
      expect(stateSpy).toHaveBeenLastCalledWith({
        isLoading: false,
        themeName: defaultThemeName,
      });
    });
    act(() => {
      setThemeName("theme2");
    });
    expect(stateSpy).toHaveBeenLastCalledWith({ isSetting: true });
    await waitFor(() => {
      expect(stateSpy).toHaveBeenLastCalledWith({
        isSetting: false,
        themeName: "theme2",
      });
    });
    await waitFor(() => {
      const target = screen.getByTestId("target");
      const style = window.getComputedStyle(target);
      expect(style).toHaveProperty("color", themes.theme2.color);
    });
  });
});
