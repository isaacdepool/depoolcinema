import { DataTypes } from 'sequelize';
import db from '../db/connection';
import { MovieStatic } from '../interfaces/movie';

const Movies = <MovieStatic>db.define('movies', {
    name: {
        type: DataTypes.STRING,
    },
    synopsis: {
        type: DataTypes.STRING,
    },
    premiere: {
        type: DataTypes.DATE,
    },
    img: {
        type: DataTypes.STRING,
    },
    actors: {
        type: DataTypes.STRING,
    },
    directors: {
        type: DataTypes.STRING,
    },
    duration: {
        type: DataTypes.STRING,
    },
    status: { 
        type: DataTypes.BOOLEAN,
    },
});

export default Movies;