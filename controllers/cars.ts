import { Request, Response } from 'express';
import Cars from '../models/cars';

export const getCars = async(req:Request, res:Response) =>{

    try {

        const carsData = await Cars.findAll({
            where: { status: true }
        });

        return res.json({
            ok: true,
            msg: 'getCars',
            carsData
        });
        
    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: 'Talk to the admin'
        });
    }
}

export const getCar = async(req:Request, res:Response) => {

    const { id } = req.params;

    try {

        const carData = await Cars.findByPk(id);

        if(!carData){
            return res.status(400).json({
                ok: false,
                msg: 'Car data is no-existent',
            });
        }

        return res.json({
            ok: true,
            msg: 'carData',
            carData
        });
        
    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: 'Talk to the admin'
        });
    }
}

export const postCar = async(req:Request, res:Response) => {

    const { body } = req;

    try {

        const car = await Cars.build(body);
        const carData = await car.save();

        return res.json({
            ok: true,
            msg: 'Cardata',
            carData
        });

        
    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: 'Talk to the admin'
        });
    }
}

export const putCar = async(req:Request, res:Response) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const car = await Cars.findByPk(id);

        if(!car){
            return res.status(400).json({
                ok: false,
                msg: 'Car data is no-existent',
            });
        }

        const carDB = await car?.update(body);
        const carData = await carDB.save();

        return res.json({
            ok: true,
            msg: 'carData',
            carData
        });
        
    } catch (error) {
        
        return res.status(500).json({
            ok: false,
            msg: 'Talk to the admin'
        });
    }
}

export const deleteCar = async(req:Request, res:Response) =>{

    const { id } = req.params;

    try {

        const car = await Cars.findByPk(id);

        if(!car){
            return res.status(400).json({
                ok: false,
                msg: 'Car data is no-existent',
            });
        }

        car.status = false;
        const carDB = await car.update(car);
        const carData = await carDB.save();

        return res.json({
            ok: true,
            msg: 'carData',
            carData
        });

        
    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: 'Talk to the admin'
        });
    }
}