"use strict";
// import 
Object.defineProperty(exports, "__esModule", { value: true });
var Message = /** @class */ (function () {
    function Message(length, sourceMac, destinationMac, payload) {
        this.length = length;
        this.sourceMac = sourceMac;
        this.destinationMac = destinationMac;
        this.payload = payload;
    }
    return Message;
}());
exports.default = Message;
