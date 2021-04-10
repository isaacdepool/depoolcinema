import { DataTypes } from "sequelize";
import db from "../db/connection";
import { PurchasesStatic } from '../interfaces/purchases';


const Purchases = <PurchasesStatic>db.define('purchases', {
    date: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.NUMBER
    },
    status: {
        type: DataTypes.BOOLEAN
    },
    id_show: {
        type: DataTypes.NUMBER
    },
    id_user: {
        type: DataTypes.NUMBER
    }
});

export default Purchases;