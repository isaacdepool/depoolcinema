import { Request, Response } from "express";
import Movies from "../models/movies";


export const getMovies = async ( req:Request, resp:Response ) => {

    let offset = req.query.offset || 0;
    offset = Number(offset);
    let limit = req.query.limit || 10;
    limit = Number(limit);

    const movies = await Movies.findAll({
        offset,
        limit
    });

    resp.json({
        ok: true,
        mgs: 'getMovies', 
        movies
    });
}

export const getMovie = async ( req: Request, res:Response) => {

    const { id } = req.params;

    try {

        const moviesDB = await Movies.findByPk(id);

        if(!moviesDB){
            return res.status(400).json({
                ok: false,
                msg: 'The movie does not exist'
            });
        }

        return res.json({
            ok: true,
            moviesDB
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Talk to the admin'
        });   
    }
}

export const postMovie = async ( req: Request, res:Response) => {

    const { body } = req;

    try {

    const movie = await Movies.create(body);
    const movieDB = await movie.save();

    return res.json({
        ok: true,
        msg: 'postMovie',
        movieDB
    });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Talk to the admin'
        }); 
    }
}

export const putMovie = async(req: Request, res:Response) =>{

    const { id } = req.params;
    const { body } = req;

    try {

        const movieDB = await Movies.findByPk(id);

        if(!movieDB){
            return res.status(400).json({
                ok: false,
                msg: 'The movie does not exist'
            });
        }

        const movieUdate = await movieDB.update(body);

        return res.json({
            ok: true,
            msg: 'putMovie',
            movieUdate
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Talk to the admin'
        }); 
    }
}

export const deleteMovie = async(req:Request, res:Response) =>{

    const { id } = req.params;

    try {

        const movie = await Movies.findByPk(id);
        
        if(!movie){
            return res.status(400).json({
                ok: false,
                msg: 'The movie does not exist'
            });
        }

        movie.status = false;
        const movieDB = await movie.update(movie)
        const movieDelete = await movieDB.save();

        return res.json({
            ok: true,
            msg: 'deleteMovie',
            movieDelete
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Talk to the admin'
        });
    }
}