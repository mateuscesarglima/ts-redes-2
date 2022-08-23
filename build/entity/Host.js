"use strict";
// import 
Object.defineProperty(exports, "__esModule", { value: true });
var Host = /** @class */ (function () {
    function Host(macAddress, ip, switchClass) {
        this._macAddress = macAddress;
        this._ip = ip;
        this._switch = switchClass;
    }
    Host.prototype.sendMessage = function (message) {
        this._switch;
    };
    return Host;
}());
exports.default = Host;
