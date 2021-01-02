"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resumer = exports.Resume = void 0;
var Resume = (function () {
    function Resume() {
        this.controller = new AbortController();
        this.stop = this.stop.bind(this);
        this.restart = this.restart.bind(this);
    }
    Resume.prototype.stop = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var stopper = setTimeout(resolve, Infinity);
            _this.controller.signal.addEventListener("abort", function () {
                clearTimeout(stopper);
                resolve(undefined);
            });
        });
    };
    Resume.prototype.restart = function () {
        this.controller.abort();
    };
    return Resume;
}());
exports.Resume = Resume;
var Resumer = (function () {
    function Resumer(resumeMap, newKeys) {
        var _this = this;
        this.resumeMap = resumeMap || new Map();
        if (newKeys == null)
            return;
        newKeys.forEach(function (key) { return _this.resumeMap.set(key, new Resume()); });
    }
    Resumer.prototype.createStopPoint = function () {
        var newKeys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            newKeys[_i] = arguments[_i];
        }
        return new Resumer(this.resumeMap, newKeys);
    };
    Resumer.prototype.getPoint = function (key) {
        var value = this.resumeMap.get(key);
        if (value == null)
            throw new Error("Unknown Error");
        return value;
    };
    return Resumer;
}());
exports.Resumer = Resumer;
