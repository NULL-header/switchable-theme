import { KVSIndexedDB } from "@kvs/indexeddb";
import { Theming } from "react-jss";
declare type State<ThemeNames> = {
    isLoading: boolean;
    isSetting: boolean;
    themeName: ThemeNames;
};
export declare type UseThemeArgs<ThemeNames> = {
    cacheKey: string;
    db: KVSIndexedDB<any>;
    defaultThemeName: ThemeNames;
    setState: (arg: Partial<State<ThemeNames>>) => void;
};
export declare const createUseTheme: <T extends Theming<any>, U extends Record<string, any>>(theming: T, themes: U) => (cacheKey: string, db: KVSIndexedDB<any>, defaultThemeName: keyof U, setState: (arg: Partial<State<keyof U>>) => void) => import("react").FC<{
    themeName: keyof U;
}>;
export {};
