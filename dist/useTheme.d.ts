import { KVSIndexedDB } from "@kvs/indexeddb";
import { Theming } from "react-jss";
declare type State<ThemeNames> = {
    isLoading: boolean;
    isSetting: boolean;
    themeName: ThemeNames;
};
export declare type UseThemeArgs<ThemeNames extends string> = {
    cacheKey: string;
    db: KVSIndexedDB<any>;
    defaultThemeName: ThemeNames;
    setState: (arg: Partial<State<ThemeNames>>) => void;
};
export declare const createUseTheme: <ThemeNames extends string>() => <T extends Theming<any>, U>(theming: T, themes: U) => (cacheKey: string, db: KVSIndexedDB<any>, defaultThemeName: ThemeNames, setState: (arg: Partial<State<ThemeNames>>) => void) => {
    setThemeNameWithDB: (themeName: ThemeNames) => Promise<void>;
    ThemeProvider: import("react").FC<{
        themeName: keyof U;
    }>;
};
export {};
