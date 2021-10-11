"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('sql3443712', 'sql3443712', 'UP1dgXLqs4', {
    host: 'sql3.freesqldatabase.com',
    dialect: 'mysql',
});
exports.default = db;
//# sourceMappingURL=connection.js.map