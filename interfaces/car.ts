import { BuildOptions, Model } from "sequelize";

export interface Car{
    id: string,
    seat: string
    id_movie_show: string,
    id_user: string,
    status: boolean
}

export interface CarModel extends Model<Car>, Car {};

export class Car extends Model<CarModel, Car> {};

export type CarStatic = typeof Car & {
   new (values?: object, options?: BuildOptions): CarModel;
};