"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTheme = void 0;
var react_1 = require("react");
var react_jss_1 = require("react-jss");
var createMakeStyles_1 = require("./createMakeStyles");
var useTheme_1 = require("./useTheme/useTheme");
exports.createTheme = function (themes) {
    var ThemeContext = react_1.createContext({});
    var Theming = react_jss_1.createTheming(ThemeContext);
    var makeStyles = createMakeStyles_1.createMakeStyles(Theming);
    var useTheme = useTheme_1.createUseTheme(Theming, themes);
    return { useTheme: useTheme, makeStyles: makeStyles, Theming: Theming };
};
