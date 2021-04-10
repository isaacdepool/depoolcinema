import { BuildOptions, Model }  from 'sequelize';

export interface User{
    id: string,
    name: string,
    last_name: string,
    age: number,
    email: string,
    password: string,
    direction: string,
    phone: string,
    status: boolean
}

export interface UserModel extends Model<User>, User {};

export class User extends Model<UserModel, User> {};

export type UserStatic = typeof Model & {
   new (values?: object, options?: BuildOptions): UserModel;
};


