import { Request, Response } from "express";
import { generateJwt } from "../helpers/jwt";
import bcrypt from 'bcrypt';
import Usuario from '../models/user';

export const getUsuarios = async ( req: Request, res: Response) => {

    const usersData = await Usuario.findAll({
        attributes: {exclude: ['password']}
    });

    return res.json({
        ok: true,
        msg: 'getUsuario',
        usersData
    });

}

export const getUsuario = async ( req: Request, res: Response) => {

    const { id } = req.params;

    try {
        
    const userDB = await Usuario.findByPk( id );

    let copy = JSON.stringify(userDB);
    let userData = JSON.parse(copy);
    delete userData.password;

    if(!userData){
        res.status(400).json({
            ok: false,
            msg: 'User is no-existent'
        });
    }

    res.json({
        ok: true,
        msg: 'getUsuario',
        userData
    });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Talk to the admin'
        }); 
    }

}

export const login = async ( req: Request, res: Response) => {

    const { email, password } = req.body;

    // Check email
    const user = await Usuario.findOne({where: {email}});

    if( !user ){ 
       return res.status(404).json({
            ok: false,
            msg: 'Invalid email or password'
        });
    }

    // Check password
    const validpass = bcrypt.compareSync(password, user.password);

    if(!validpass){
        return res.status(404).json({
            ok: false,
            msg: 'Invalid email or password'
        });
    }

    // Generate JWT
    const token = await generateJwt( user.id, user.name, user.email );
    
     return res.json({
        ok: true,
        msg: 'getUsuario',
        userData: {
            id: user.id,
            name: user.name,
            email: user.email,   
        },
        token
    });

}

export const postUsuario = async ( req: Request, res: Response) => {

    const { body } = req;

    try {
        
        // const existeEmail = await Usuario.findOne({
        //     where: {
        //         email: body.email
        //     }
        // });

        // if(existeEmail){
        //     return res.status(404).json({
        //         ok: false,
        //         msg: `the email ${body.email} already exist`
        //     });
        // }

        // Bcrypt
        const salt = bcrypt.genSaltSync();
        body.password = bcrypt.hashSync(body.password, salt);

        // Create user
        const usuario = Usuario.build(body);
        
        const { id, name, email} = await usuario.save();

        // Create JWT
        const token = await generateJwt( id, name, email );

        const userData = { id, name, email }
        return res.json({
            ok: true,
            userData,
            token
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Talk to the admin',
            error
        });       
    }

}

export const putUsuario = async( req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    try {
        
        const user = await Usuario.findByPk(id);

        if( !user ){
            return res.status(400).json({
                ok: false,
                msg: 'User is no-existent'
            });
        }

        // Bcrypt
        if(body.password){
            const salt = bcrypt.genSaltSync();
            body.password = bcrypt.hashSync(body.password, salt);
        }

        // Create user
        const userDB = await user.update(body);
        const { name, email } = userDB;

        // Create JWT
        const token = await generateJwt( id, name, email );

        const userData = { id, name, email }
        return res.json({
            ok: true,
            userData,
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

export const deleteUsuario = async( req: Request, res: Response) => {

    const { id } = req.params;

    const user = await Usuario.findByPk( id );

        if(!user){
            return res.status(400).json({
                ok: false,
                msg: 'User is no-existent'
            });
        }

       user.status = false; 
       const userDB = await user.update(user);
       const userData = await userDB.save();

    res.json({
        ok: true,
        msg: 'deleteUsuario',
        userData
    });

}

export const renewToken = async(req: Request, res:Response) =>{

    const { body } = req;
    const { id, name, email } = body;
    

    const token = await generateJwt( id, name, email );
    
    return res.json({
        ok: true,
        id, 
        name, 
        email, 
        token
    });
} 

