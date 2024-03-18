"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateIdentifer = void 0;
const uuid_1 = require("uuid");
const generateIdentifer = () => {
    const uuid = (0, uuid_1.v4)();
    return uuid.replace(/-/g, '').substring(0, 5);
};
exports.generateIdentifer = generateIdentifer;
