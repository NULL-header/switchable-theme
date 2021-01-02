"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createThemeProvider = void 0;
var react_1 = __importDefault(require("react"));
exports.createThemeProvider = function (UserTheming, themes, useThemeNameEffect) {
    return react_1.default.memo(function (props) {
        var theme = themes[props.themeName];
        useThemeNameEffect(props.themeName);
        return (react_1.default.createElement(UserTheming.ThemeProvider, { theme: theme }, props.children));
    });
};
