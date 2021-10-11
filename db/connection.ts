import { Sequelize } from 'sequelize';

const db = new Sequelize('sql3443712', 'sql3443712', 'UP1dgXLqs4', {
    host: 'sql3.freesqldatabase.com',
    dialect: 'mysql',
    // logging: false 
});

export default db;