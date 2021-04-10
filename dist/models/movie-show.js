"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const MovieShow = connection_1.default.define('movie_shows', {
    start_time: {
        type: sequelize_1.DataTypes.TIME
    },
    end_time: {
        type: sequelize_1.DataTypes.TIME
    },
    day: {
        type: sequelize_1.DataTypes.DATE
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    id_room: {
        type: sequelize_1.DataTypes.NUMBER
    },
    id_movie: {
        type: sequelize_1.DataTypes.NUMBER
    },
});
exports.default = MovieShow;
//# sourceMappingURL=movie-show.js.map