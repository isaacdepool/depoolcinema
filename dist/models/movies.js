"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Movies = connection_1.default.define('movies', {
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    synopsis: {
        type: sequelize_1.DataTypes.STRING,
    },
    premiere: {
        type: sequelize_1.DataTypes.DATE,
    },
    vertical_poster: {
        type: sequelize_1.DataTypes.STRING,
    },
    horizontal_poster: {
        type: sequelize_1.DataTypes.STRING,
    },
    actors: {
        type: sequelize_1.DataTypes.STRING,
    },
    directors: {
        type: sequelize_1.DataTypes.STRING,
    },
    genre: {
        type: sequelize_1.DataTypes.STRING,
    },
    rating: {
        type: sequelize_1.DataTypes.STRING,
    },
    duration: {
        type: sequelize_1.DataTypes.STRING,
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
});
exports.default = Movies;
//# sourceMappingURL=movies.js.map