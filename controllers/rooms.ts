import { Request, Response } from "express";
import Rooms from "../models/rooms";


export const getRooms = async(req:Request, res:Response) => {

    try {

        const roomsData = await Rooms.findAll({
            where: { status: true }
        });

        return res.json({
            ok: true,
            msg: 'getRooms',
            roomsData
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Talk to the admin'
        });  
    }
}

export const getRoom = async(req:Request, res:Response) => {

    const { id } = req.params;

    try {

        const roomData = await Rooms.findByPk(id);

        if(!roomData){
            return res.status(400).json({
                ok: false,
                msg: 'Room is no-existent',
            });
        }

        return res.json({
            ok: true,
            msg: 'getRoom',
            roomData
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

        // validate name 
        const existName = await Rooms.findOne({
            where: {
                name: body.name
            }
        });

        if(existName){
            return res.status(404).json({
                ok: false,
                msg: `The name ${body.name} already exist`
            });
        }

        const room = await Rooms.build(body);
        const roomData = await room.save();

        return res.json({
            ok: true,
            msg: 'postRoom',
            roomData
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
        const roomData = await roomDB.save();

        return res.json({
            ok: true,
            msg: 'putRoom',
            roomData
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
        const roomData = await roomDB.save();

        return res.json({
            ok: true,
            msg: 'deleteRoom',
            roomData
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Talk to the admin'
        }); 
    }
}