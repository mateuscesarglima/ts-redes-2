"use strict";
// import 
Object.defineProperty(exports, "__esModule", { value: true });
var Switch = /** @class */ (function () {
    // table: MacAddressTable[]
    function Switch(ports, macAddress) {
        this._macAddress = macAddress;
    }
    Object.defineProperty(Switch.prototype, "macAddress", {
        get: function () {
            return this._macAddress;
        },
        enumerable: false,
        configurable: true
    });
    Switch.prototype.forward = function (message) {
    };
    return Switch;
}());
exports.default = Switch;
