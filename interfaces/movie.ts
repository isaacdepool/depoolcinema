import { BuildOptions, Model } from "sequelize";

export interface Movie{
    id: string,
    name: string,
    synopsis: string,
    premiere: string,
    img: string,
    actors: string,
    directors: string,
    duration: number,
    status: boolean
}

export interface MovieModel extends Model<Movie>, Movie {};

export class Movie extends Model<MovieModel, Movie> {};

export type MovieStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): MovieModel;
 };