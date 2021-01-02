import { createSetThemeNameToDB } from "src/useTheme/createSetThemeNameToDB";
import { Resumer, Resume } from "src/utilForTest";

type TestThemeNames = "test1" | "test2";
const cacheKeyMocked = "testKey";
const defaultNameMocked = "test1" as TestThemeNames;
const themeNameMocked = "test2";
const dbMocked = { set: jest.fn(), get: jest.fn() };
const setStateMocked = jest.fn();
const setThemeNameToDB = createSetThemeNameToDB({
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
    const process = setThemeNameToDB(themeNameMocked)(signal);
    expect(setStateMocked).toHaveBeenLastCalledWith({ isSetting: true });
    resumer.restart();
    await process;
    expect(dbMocked.set).toBeCalledWith(cacheKeyMocked, themeNameMocked);
    expect(setStateMocked).toHaveBeenLastCalledWith({
      isSetting: false,
    });
  });

  it("if it is aborted before logic is called", async () => {
    signal.abort();
    await setThemeNameToDB(themeNameMocked)(signal);
    expect(setStateMocked).not.toBeCalled();
    expect(dbMocked.get).not.toBeCalled();
  });

  it("if it is aborted before finishing to set", async () => {
    dbMocked.get.mockImplementation(resumer.stop);
    const process = setThemeNameToDB(themeNameMocked)(signal);
    signal.abort();
    await process;
    expect(setStateMocked).toBeCalledWith({ isSetting: true });
    expect(setStateMocked).toBeCalledTimes(1);
  });
});
