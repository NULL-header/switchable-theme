import React from "react";
import { Theming } from "react-jss";
export declare const createThemeProvider: <T, U extends Theming<T[keyof T]>>(UserTheming: U, themes: T, useThemeNameEffect: (themeName: keyof T) => void) => React.FC<{
    themeName: keyof T;
}>;
