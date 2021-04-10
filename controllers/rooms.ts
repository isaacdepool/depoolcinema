import { Request, Response } from "express";
import Rooms from "../models/rooms";


export const getRooms = async(req:Request, res:Response) => {

    try {

        const rooms = await Rooms.findAll();

        return res.json({
            ok: true,
            msg: 'getRooms',
            rooms
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Talk to the admin'
        });  
    }
}

export const getRoom = async(req:Request, res:Response) => {

    const { id } = req.params;

    try {

        const room = await Rooms.findByPk(id);

        if(!room){
            return res.status(400).json({
                ok: false,
                msg: 'Room is no-existent',
            });
        }

        return res.json({
            ok: true,
            msg: 'getRoom',
            room
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Talk to the admin'
        }); 
    }
}

export const postRoom = async(req:Request, res:Response) => {

    const { body } = req;

    try {

        const room = await Rooms.build(body);
        const roomSave = await room.save();

        return res.json({
            ok: true,
            msg: 'postRoom',
            roomSave
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Talk to the admin'
        }); 
    }
}

export const putRoom = async(req:Request, res:Response) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const room = await Rooms.findByPk(id);

        if(!room){
            return res.status(400).json({
                ok: false,
                msg: 'The Room does not exist'
            });
        }

        const roomDB = await room.update(body);
        const roomUpdate = await roomDB.save();

        return res.json({
            ok: true,
            msg: 'putRoom',
            roomUpdate
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Talk to the admin'
        }); 
    }
}

export const deleteRoom = async(req:Request, res:Response) => {

    const { id } = req.params;

    try {

        const room = await Rooms.findByPk(id);

        if(!room){
            return res.status(400).json({
                ok: false,
                msg: 'The Room does not exist'
            });
        }

        room.status = false;
        const roomDB = await room.update(room);
        const roomDelete = await roomDB.save();

        return res.json({
            ok: true,
            msg: 'deleteRoom',
            roomDelete
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Talk to the admin'
        }); 
    }
}