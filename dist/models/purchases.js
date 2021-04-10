"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Purchases = connection_1.default.define('purchases', {
    date: {
        type: sequelize_1.DataTypes.STRING
    },
    price: {
        type: sequelize_1.DataTypes.NUMBER
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    id_show: {
        type: sequelize_1.DataTypes.NUMBER
    },
    id_user: {
        type: sequelize_1.DataTypes.NUMBER
    }
});
exports.default = Purchases;
//# sourceMappingURL=purchases.js.map