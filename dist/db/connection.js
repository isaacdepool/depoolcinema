"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// const db = new Sequelize('cine', 'root', '', {
//     host: 'http://localhost:8000/',
//     dialect: 'mysql',
//     // logging: false 
// }); //Dev
const db = new sequelize_1.Sequelize('cinemadepool', 'isaacdepool', '12018922Id*', {
    host: 'db4free.net',
    dialect: 'mysql',
}); //PRD
exports.default = db;
//# sourceMappingURL=connection.js.map