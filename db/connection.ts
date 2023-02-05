import { Sequelize } from 'sequelize';

// const db = new Sequelize('cine', 'root', '', {
//     host: 'http://localhost:8000/',
//     dialect: 'mysql',
//     // logging: false 
// }); //Dev

const db = new Sequelize('cinemadepool', 'isaacdepool', '12018922Id*', {
    host: 'db4free.net',
    dialect: 'mysql',
    // logging: false 
}); //PRD

export default db;