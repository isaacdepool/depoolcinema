import { BuildOptions, Model } from "sequelize";

export interface Movie{
    id: string,
    name: string,
    synopsis: string,
    premiere: string,
    vertical_poster: string,
    horizontal_poster: string,
    actors: string,
    directors: string,
    genre: string,
    rating: string,
    duration: number,
    role: string,
    status: boolean
}

export interface MovieModel extends Model<Movie>, Movie {};

export class Movie extends Model<MovieModel, Movie> {};

export type MovieStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): MovieModel;
 };

 