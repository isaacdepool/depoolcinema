import { Request, Response } from "express"
import Purchases from "../models/purchases";


export const getPurchases = async(req:Request, res:Response) => {

    try {

        const purchases = await Purchases.findAll();

        return res.json({
            ok: true,
            msg: 'getPurchases',
            purchases
        });
        
    } catch (error) {
        console.log(error);
        return res.json({
            ok: false,
            msg: 'Talk to the admin'
        });
    }
}

export const getPurchase = async(req:Request, res:Response) => {
    
    const { id } = req.params;

    try {

        const purchase = await Purchases.findByPk(id);

        if(!purchase){
            return res.status(404).json({
                ok: false,
                msg: 'The Purchase does not exist'
            });
        }

        return res.json({
            ok: true,
            msg: 'getPurchase',
            purchase
        });
        
    } catch (error) {
        console.log(error);
        return res.json({
            ok: false,
            msg: 'Talk to the admin'
        });
    }
}

export const getPurchaseByUserId = async(req:Request, res:Response) => {
    
    const { id } = req.params;

    try {

        const purchases = await Purchases.findAll({
            where: { id_user: id}
        });

        if(!purchases){
            return res.status(404).json({
                ok: false,
                msg: 'The Purchases do not exist'
            });
        }

        return res.json({
            ok: true,
            msg: 'getPurchaseByUserId',
            purchases
        });
        
    } catch (error) {
        console.log(error);
        return res.json({
            ok: false,
            msg: 'Talk to the admin'
        });
    }
}

export const getPurchaseByShowId = async(req:Request, res:Response) => {
    
    const { id } = req.params;

    try {

        const purchases = await Purchases.findAll({
            where: { id_show: id}
        });

        if(!purchases){
            return res.status(404).json({
                ok: false,
                msg: 'The Purchases do not exist'
            });
        }

        return res.json({
            ok: true,
            msg: 'getPurchaseByShowId',
            purchases
        });
        
    } catch (error) {
        console.log(error);
        return res.json({
            ok: false,
            msg: 'Talk to the admin'
        });
    }
}

export const postPurchase = async(req:Request, res:Response) => {
    
    const { body } = req;

    try {

        const purchase = await Purchases.build(body);
        const purchaseDB = await purchase.save();

        return res.json({
            ok: true,
            msg: 'postPurchases',
            purchaseDB
        });
        
    } catch (error) {
        console.log(error);
        return res.json({
            ok: false,
            msg: 'Talk to the admin'
        });
    }
}
export const putPurchase = async(req:Request, res:Response) => {
    
    const { id } = req.params;
    const { body } = req;
    
    try {

        const purchase = await Purchases.findByPk(id);

        if(!purchase){
            return res.status(404).json({
                ok: false,
                msg:'The Purchases do not exist'
            });
        }

        const purchaseDB = await purchase.update(body);
        const purchaseUpdate = await purchaseDB.save();

        return res.json({
            ok: true,
            msg: 'putPurchases',
            purchaseUpdate
        });
        
    } catch (error) {
        console.log(error);
        return res.json({
            ok: false,
            msg: 'Talk to the admin'
        });
    }
}
export const deletePurchase = async(req:Request, res:Response) => {
    
    const { id } = req.params;

    try {

        const purchase = await Purchases.findByPk(id);

        if(!purchase){
            return res.status(404).json({
                ok: false,
                msg:'The Purchases do not exist'
            });
        }

        purchase.status = false;
        const purchaseDB = await purchase.update(purchase);
        const purchaseDelete = await purchaseDB.save();

        return res.json({
            ok: true,
            msg: 'putPurchases',
            purchaseDelete
        });
        
    } catch (error) {
        console.log(error);
        return res.json({
            ok: false,
            msg: 'Talk to the admin'
        });
    }
}