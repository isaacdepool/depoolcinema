import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export const checkToken = (req:Request, res:Response, next:NextFunction) =>{

    const token = req.header('x-token') || '';    

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'Token is neccesary'
        });
    }

    try {
       jwt.verify( token, (process.env.SECRET_JWT_SEED || ''));
        
    } catch (error) {

        return res.status(401).json({
            ok: false,
            msg: 'Token is no valid'
        });
        
    }

    next();

}