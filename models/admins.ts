import { DataTypes } from 'sequelize';
import db from '../db/connection';
import { AdminStatic } from '../interfaces/admin';

const Admin = <AdminStatic>db.define('admins', {
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    type: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING
    },
});

export default Admin;