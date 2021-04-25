import { Request, Response } from "express";
import Admin from "../models/admins";
import bcrypt from 'bcrypt';
import { generateJwtAdmin } from '../helpers/jwt';

export const getAdmins = async(req:Request, res:Response) => {

    try {
        
        const adminsData = await Admin.findAll();

        return res.json({
            ok: true,
            msg: 'getAdmin',
            adminsData
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Talk to the admin'
        });
    }
}

export const loginAdmin = async(req:Request, res:Response) => {

    const { username, password } = req.body;

    try {

        // Check email
        const admin = await Admin.findOne({where: { username }});

        if(!admin){
            return res.status(404).json({
                ok: false,
                msg: 'Invalid username or password'
            });
        }

        // Check password
        const validPass = bcrypt.compareSync(password, admin.password);

        if(!validPass){
            return res.status(404).json({
                ok: false,
                msg: 'Invalid username or password'
            });
        }

        // Generate JWT
        const token = await generateJwtAdmin( admin.id, admin.username, admin.type );

        return res.json({
            ok: true,
            msg: 'loginAdmin',
            id: admin.id,
            username: admin.username,
            type: admin.type,
            token
        });

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Talk to the admin'
        });
    }
}

export const getAdmin = async(req:Request, res:Response) => {

    const { id } = req.params;

    try {

        const adminData = await Admin.findByPk(id, {
            attributes: {exclude: ['password']}
        });

        if(!adminData){
           return res.status(400).json({
                ok: false,
                msg:'Admin is no-existent'
            });
        }

        return res.json({
            ok: true,
            msg: 'getAdmin',
            adminData
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Talk to the admin'
        }); 
    }
}

export const postAdmin = async(req:Request, res:Response) =>{
    
    const { body } = req;

    try {

        // Check email
        const checkUsername = await Admin.findOne({
            where: {
                username: body.username
            }
        });

        if(checkUsername){
            return res.status(404).json({
                ok: false,
                msg: `The Username ${body.username} already exist.`
            });
        }

        // bcrypt
        const salt = bcrypt.genSaltSync();
        body.password = bcrypt.hashSync(body.password, salt);

         const adminBuild = await Admin.build(body);
         const adminDB = await adminBuild.save();

         // Generate JWT
        const token = await generateJwtAdmin( adminDB.id, adminDB.username, adminDB.type );

         return res.json({
             ok: true,
             msg: 'postAdmin',
             admin: {
                id: adminDB.id,
                username: adminDB.username,
                type: adminDB.type,
                token
            }
         }); 
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Talk to the admin',
        }); 
    }
}

export const putAdmin = async(req:Request, res:Response) => {

    const { body } = req;
    const { id } = req.params;

    try {

        const admin = await Admin.findByPk(id);

        if(!admin){
            return res.status(400).json({
                ok: false,
                msg:'Admin is no-existent'
            });
        }

        // bcrypt
        if(body.password){
            const salt = bcrypt.genSaltSync();
            body.password = bcrypt.hashSync(body.password, salt);
        }

        const adminBD = await admin.update(body);
        const adminUpdate = await adminBD.save(); 

        return res.json({
            ok: true,
            msg: 'putAdmin',
            admin: {
                id: adminUpdate.id,
                username: adminUpdate.username,
                type: adminUpdate.type
            }
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Talk to the admin',
        });
    }
}

export const deleteAdmin = async(req:Request, res:Response) =>{

    const { id } = req.params;

    try {

        const admin = await Admin.findByPk(id);

        if(!admin){
            return res.status(400).json({
                ok: false,
                msg:'Admin is no-existent'
            });
        }

        admin.status = false;
        const adminDB = await admin.update(admin);
        const adminSave = await adminDB.save();

        return res.json({
            ok: true,
            msg: 'deleteAdmin',
            id: adminSave.id
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Talk to the admin',
        });
    }
}

export const renewToken = async(req: Request, res:Response) =>{

    const { body } = req;
    const { id, username, type } = body;

    const token = await generateJwtAdmin( id, username, type );

    return res.json({
        ok: true,
        id,
        username,
        type,
        token
    });
} 