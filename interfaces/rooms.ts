import { BuildOptions, Model } from "sequelize";


export interface Room {
    id: string,
    name: string,
    rows: number,
    seats: number,
    status: boolean
}

export interface RoomModel extends Model<Room>, Room {};

export class Room extends Model<RoomModel, Room> {};

export type RoomStatic = typeof Model & {
   new (values?: object, options?: BuildOptions): RoomModel;
};