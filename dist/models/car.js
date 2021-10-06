"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Car = connection_1.default.define('car', {
    id_movieShow: {
        type: sequelize_1.DataTypes.STRING
    },
});
//# sourceMappingURL=car.js.map