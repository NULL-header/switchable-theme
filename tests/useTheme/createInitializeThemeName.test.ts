import { createInitializeThemeName } from "src/useTheme/createInitializeThemeName";
import { Resume, Resumer } from "src/utilForTest";

type TestThemeNames = "test1" | "test2";
const cacheKeyMocked = "testKey";
const defaultNameMocked = "test1" as TestThemeNames;
const lastThemeName = "lastThemeName";
const dbMocked = { set: jest.fn(), get: jest.fn() };
const setStateMocked = jest.fn();
const initializeThemeName = createInitializeThemeName<TestThemeNames>({
  cacheKey: cacheKeyMocked,
  defaultThemeName: defaultNameMocked,
  db: dbMocked as any,
  setState: setStateMocked,
});

describe("normal system", () => {
  let signal: AbortController;
  let resumer: Resume;

  beforeEach(() => {
    jest.clearAllMocks();
    signal = new AbortController();
    resumer = new Resumer().createStopPoint("first").getPoint("first");
  });

  it("order called", async () => {
    dbMocked.get.mockImplementation(resumer.stop);
    const process = initializeThemeName(signal);
    expect(setStateMocked).toHaveBeenLastCalledWith({ isLoading: true });
    resumer.restart();
    await process;
    expect(dbMocked.get).toBeCalledWith(cacheKeyMocked);
    expect(setStateMocked).toHaveBeenLastCalledWith({
      isLoading: false,
      themeName: defaultNameMocked,
    });
  });

  it("if there is last themeName", async () => {
    dbMocked.get.mockImplementation(() => lastThemeName);
    await initializeThemeName(signal);
    expect(setStateMocked).toHaveBeenLastCalledWith({
      isLoading: false,
      themeName: lastThemeName,
    });
  });

  it("if it is aborted before logic is called", async () => {
    signal.abort();
    await initializeThemeName(signal);
    expect(setStateMocked).not.toBeCalled();
    expect(dbMocked.get).not.toBeCalled();
  });

  it("if it is aborted before finishing to load", async () => {
    dbMocked.get.mockImplementation(resumer.stop);
    const process = initializeThemeName(signal);
    signal.abort();
    await process;
    expect(setStateMocked).toBeCalledWith({ isLoading: true });
    expect(setStateMocked).toBeCalledTimes(1);
  });
});
