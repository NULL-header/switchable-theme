import React from "react";
import { Theming } from "react-jss";
export declare const createThemeProvider: <T, U extends Theming<T[keyof T]>>(UserTheming: U, themes: T) => React.FC<{
    themeName: keyof T;
}>;
