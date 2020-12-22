"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUseTheme = void 0;
var react_1 = require("react");
var react_hooks_async_1 = require("react-hooks-async");
var logics_1 = require("./logics");
var ThemeProvider_1 = require("./ThemeProvider");
exports.createUseTheme = function () { return function (theming, themes) { return function (cacheKey, db, defaultThemeName, setState) {
    var args = react_1.useMemo(function () { return ({
        cacheKey: cacheKey,
        db: db,
        defaultThemeName: defaultThemeName,
        setState: setState,
    }); }, [cacheKey, db, defaultThemeName, setState]);
    var logics = logics_1.useLogics(args);
    react_hooks_async_1.useAsyncRun(logics.initializeThemeName);
    return react_1.useMemo(function () {
        var setThemeNameWithDB = function (themeName) {
            return logics.setThemeNameWithDB.start(themeName);
        };
        var ThemeProvider = ThemeProvider_1.createThemeProvider(theming, themes);
        return { setThemeNameWithDB: setThemeNameWithDB, ThemeProvider: ThemeProvider };
    }, [logics.setThemeNameWithDB]);
}; }; };
