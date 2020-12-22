"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMakeStyles = void 0;
var react_jss_1 = require("react-jss");
exports.createMakeStyles = function (theming) { return function (_props) { return function (styles) {
    return react_jss_1.createUseStyles(styles, { theming: theming });
}; }; };
