"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUseTheme = void 0;
var react_1 = require("react");
var react_hooks_async_1 = require("react-hooks-async");
var createInitializeThemeName_1 = require("./createInitializeThemeName");
var createSetThemeNameToDB_1 = require("./createSetThemeNameToDB");
var ThemeProvider_1 = require("./ThemeProvider");
var useHooks = function (args) {
    var logics = react_1.useMemo(function () { return ({
        init: createInitializeThemeName_1.createInitializeThemeName(args),
        setThemeName: createSetThemeNameToDB_1.createSetThemeNameToDB(args),
    }); }, [args]);
    react_hooks_async_1.useAsyncRun(react_hooks_async_1.useAsyncTask(logics.init));
    return react_1.useMemo(function () { return ({
        useThemeNameEffect: function (themeName) {
            var effect = react_1.useMemo(function () { return logics.setThemeName(themeName); }, [
                themeName,
            ]);
            react_hooks_async_1.useAsyncRun(react_hooks_async_1.useAsyncTask(effect));
        },
    }); }, [logics]);
};
exports.createUseTheme = function (theming, themes) { return function (cacheKey, db, defaultThemeName, setState) {
    var argsMemo = react_1.useMemo(function () { return ({ cacheKey: cacheKey, db: db, defaultThemeName: defaultThemeName, setState: setState }); }, [cacheKey, db, defaultThemeName, setState]);
    var useThemeNameEffect = useHooks(argsMemo).useThemeNameEffect;
    return react_1.useMemo(function () { return ThemeProvider_1.createThemeProvider(theming, themes, useThemeNameEffect); }, [useThemeNameEffect]);
}; };
