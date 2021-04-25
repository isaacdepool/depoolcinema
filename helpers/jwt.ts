import jwt from 'jsonwebtoken';

export const generateJwt = ( id:string, name:string, email:string ) => {

    const payload = { id, name, email };

    return new Promise( (resolve, reject) => {

        jwt.sign( payload, (process.env.SECRET_JWT_SEED || ''), {
            expiresIn: process.env.Caducidad_token
        }, (err, token) =>{
            if(err){
                console.log(err);
                reject(err);
            }else{
                resolve( token )
            }
        }
        );
    });
}

export const generateJwtAdmin = ( id:string, username:string, type:string ) => {

    const payload = { id, username, type };

    return new Promise( (resolve, reject) => {

        jwt.sign( payload, (process.env.SECRET_JWTADMIN_SEED || ''), {
            expiresIn: process.env.Caducidad_token
        }, (err, token) =>{
            if(err){
                console.log(err);
                reject(err);
            }else{
                resolve( token )
            }
        }
        );
    });
}
