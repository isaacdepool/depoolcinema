import jwt from 'jsonwebtoken';

export const generateJwt = ( id:string, name:string, email_type:string ) => {

    const payload = { id, name, email_type };

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
