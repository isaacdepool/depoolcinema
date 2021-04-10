"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const Rooms = connection_1.default.define('rooms', {
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    rows: {
        type: sequelize_1.DataTypes.NUMBER
    },
    seats: {
        type: sequelize_1.DataTypes.NUMBER
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN
    }
});
exports.default = Rooms;
//# sourceMappingURL=rooms.js.map