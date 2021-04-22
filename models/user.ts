import { DataTypes } from 'sequelize';
import db from '../db/connection';
import { UserStatic } from '../interfaces/user';

const Usuario = <UserStatic>db.define('users', {
    name: {
        type: DataTypes.STRING,
    },
    last_name: {
        type: DataTypes.STRING, 
    }, 
    date_birth: {
        type: DataTypes.STRING 
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    },
    direction: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.BOOLEAN
    },
});

export default Usuario;