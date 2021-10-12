import express, { Application } from 'express';
import cors from 'cors';
import db from './db/connection';
import path from 'path';

import userRoutes from './routes/user';
import movieRoutes from './routes/movies';
import adminRoutes from './routes/admins';
import roomRoutes from './routes/rooms';
import movieShowRoutes from './routes/movie-show';
import purchasesRoutes from './routes/purchases';
import carsRoutes from './routes/cars';

class Server { 

    private app: Application;
    private port: string;
    private apiPaths = {
        admins: '/api/admin',
        users: '/api/user',
        movies: '/api/movies',
        rooms: '/api/rooms',
        movieShow: '/api/movie-shows',
        purchases: '/api/purchases',
        cars: '/api/cars',
    }

    constructor(){

        this.app = express();
        this.port = process.env.PORT || '8000';
         
        
        // DB
        this.dbConnection();
        // Middlewares
        this.middlewares();
        // Rutas
        this.routes();
        
        
    }

    middlewares(){

        // CORS
        this.app.use( cors() );

        // lectura del body
        this.app.use( express.json() );

        // Directorio publico
        this.app.use( express.static('dist/public/depool'));

        // Carpeta publica
        this.app.get('*', (req, res) =>{

            res.sendFile( path.resolve( __dirname, 'public/depool/index.html'));
        })
    }

    routes(){
        this.app.use( this.apiPaths.admins, adminRoutes );
        this.app.use( this.apiPaths.users, userRoutes );
        this.app.use( this.apiPaths.movies, movieRoutes );
        this.app.use( this.apiPaths.rooms, roomRoutes );
        this.app.use( this.apiPaths.movieShow, movieShowRoutes );
        this.app.use( this.apiPaths.purchases, purchasesRoutes );
        this.app.use( this.apiPaths.cars, carsRoutes );
    }

    async dbConnection(){
        try{
            await db.authenticate();
            console.log(' DB ONLINE ');

        }catch(err:any){
            throw new Error(err);
        }
    }

    listen(){
        this.app.listen( this.port, () =>{
            console.log(`Servidor corriendo en el puerto ${this.port}`);  
        });
    }
}

export default Server;