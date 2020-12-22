import React from "react";
import { createTheming } from "react-jss";
import { render, waitFor } from "@testing-library/react";
import { createThemeProvider } from "src/ThemeProvider";

const themesMocked = {
  theme1: { context: "theme1-context" },
  theme2: { context: "theme2-context" },
};
type TestThemes = typeof themesMocked;
type TestTheme = TestThemes[keyof TestThemes];
const ThemeContext = React.createContext<TestTheme>({} as any);
const Theming = createTheming(ThemeContext);
const themeSpy = jest.fn();

const ComponentMocked = () => {
  const theme = Theming.useTheme();
  themeSpy(theme);
  return <div>Mocked</div>;
};

const ThemeProvider = createThemeProvider(Theming, themesMocked);

describe("normal system", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("able to select theme", () => {
    render(
      <ThemeProvider themeName={"theme1"}>
        <ComponentMocked />
      </ThemeProvider>
    );
    expect(themeSpy).toBeCalledWith(themesMocked.theme1);
  });
  it("able to change theme", async () => {
    let setThemeName: (themeName: keyof TestThemes) => void;
    const ParentComponentMocked = () => {
      const [state, SetState] = React.useState<(keyof TestThemes)[]>([
        "theme1",
      ]);
      React.useEffect(() => {
        setThemeName = (themeName: keyof TestThemes) => SetState([themeName]);
      }, []);
      return (
        <ThemeProvider themeName={state[0]}>
          <ComponentMocked />
        </ThemeProvider>
      );
    };
    render(<ParentComponentMocked />);

    expect(themeSpy).toHaveBeenLastCalledWith(themesMocked.theme1);
    await waitFor(() => {
      setThemeName("theme2");
    });
    expect(themeSpy).toHaveBeenLastCalledWith(themesMocked.theme2);
  });
});
