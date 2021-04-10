import db from '../db/connection';
import { RoomStatic } from '../interfaces/rooms';
import { DataTypes } from 'sequelize';


const Rooms = <RoomStatic>db.define('rooms',{
    name: {
        type: DataTypes.STRING
    },
    rows: {
        type: DataTypes.NUMBER
    },
    seats: {
        type: DataTypes.NUMBER
    },
    status: {
        type: DataTypes.BOOLEAN
    }
});

export default Rooms;