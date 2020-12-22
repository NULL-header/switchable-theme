"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLogics = void 0;
var react_1 = require("react");
var react_hooks_async_1 = require("react-hooks-async");
var initializeThemeName_1 = require("./initializeThemeName");
var setThemeNameWithDB_1 = require("./setThemeNameWithDB");
var useLogic = function (factory, arg) {
    var logic = react_1.useMemo(function () { return factory(arg); }, [factory, arg]);
    return react_hooks_async_1.useAsyncTask(logic);
};
exports.useLogics = function (args) {
    var initializeThemeName = useLogic(initializeThemeName_1.createInitializeThemeName, args);
    var setThemeNameWithDB = useLogic(setThemeNameWithDB_1.createSetThemeNameWithDB, args);
    return react_1.useMemo(function () {
        var logics = {
            initializeThemeName: initializeThemeName,
            setThemeNameWithDB: setThemeNameWithDB,
        };
        return logics;
    }, [initializeThemeName, setThemeNameWithDB]);
};
