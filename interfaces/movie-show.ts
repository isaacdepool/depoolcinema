import { BuildOptions, Model } from "sequelize";


export interface MovieShow{ 
    id: string,
    price: number,
    start_time: string,
    end_time: string,
    day: string,
    status: boolean
    id_room: number,
    id_movie: number
}

export interface MovieShowModel extends Model<MovieShow>, MovieShow {};

export class MovieShow extends Model<MovieShowModel, MovieShow> {};

export type MovieShowStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): MovieShowModel;
 };