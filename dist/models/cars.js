"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Cars = connection_1.default.define('cars', {
    seat: {
        type: sequelize_1.DataTypes.STRING
    },
    id_movie_show: {
        type: sequelize_1.DataTypes.STRING
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN
    }
});
exports.default = Cars;
//# sourceMappingURL=cars.js.map