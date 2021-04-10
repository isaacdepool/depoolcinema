import { BuildOptions, Model } from "sequelize";

export interface Purchases{
    id: string,
    date: string,
    price: number,
    status: boolean,
    id_show: number,
    id_user: number
}

export interface PurchasesModel extends Model<Purchases>, Purchases {};

export class Purchases extends Model<PurchasesModel, Purchases> {};

export type PurchasesStatic = typeof Model & {
   new (values?: object, options?: BuildOptions): PurchasesModel;
};