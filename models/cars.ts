import { DataTypes } from 'sequelize';
import { CarStatic } from '../interfaces/car';
import db from '../db/connection';

const Cars = <CarStatic>db.define('cars', {
    seat: {
        type: DataTypes.STRING
    },
    id_movie_show: {
        type: DataTypes.STRING
    },
    id_user: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.BOOLEAN
    }
});

export default Cars;