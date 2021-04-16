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
    vertical_poster: {
        type: DataTypes.STRING,
    },
    horizontal_poster: {
        type: DataTypes.STRING,
    },
    actors: {
        type: DataTypes.STRING,
    },
    directors: {
        type: DataTypes.STRING,
    },
    genre: {
        type: DataTypes.STRING,
    },
    rating: {
        type: DataTypes.STRING,
    },
    duration: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.STRING,
    },
    status: { 
        type: DataTypes.BOOLEAN,
    },
});

export default Movies;