import { BuildOptions, Model } from "sequelize";

export interface Admin{
    id: string,
    username: string,
    password: string,
    type: string,
    status: boolean
}

export interface AdminModel extends Model<Admin>, Admin {};

export class Admin extends Model<AdminModel, Admin> {};

export type AdminStatic = typeof Model & {
   new (values?: object, options?: BuildOptions): AdminModel;
};