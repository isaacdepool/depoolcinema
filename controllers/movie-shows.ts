import { Request, Response } from "express";
import MovieShow from "../models/movie-shows"


export const getMovieShows = async(req:Request, res:Response) => {

    try {

        const movieShows = await MovieShow.findAll({
            where: { status: true }
        });

        return res.json({
            ok: true,
            msg: 'getMoviesShows',
            movieShows
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Talk to the admin'
        });
    }
}

export const getMovieShow = async(req:Request, res:Response) => {

    const { id } = req.params;

    try {

        const movieShow = await MovieShow.findByPk(id);

        if(!movieShow){
            return res.status(400).json({
                ok: false,
                msg: 'The show does not exist'
            });
        }

        return res.json({
            ok: true,
            msg: 'getMovieShow',
            movieShow
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Talk to the admin'
        });
    }
}

export const postMovieShow = async(req:Request, res:Response) => {

    const { body } = req;

    try {

        const movieShowDB = await MovieShow.build(body);
        const movieShowSave = await movieShowDB.save();

        return res.json({
            ok: true,
            msg: 'postMovieShow',
            movieShowSave
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Talk to the admin'
        }); 
    }

}

export const putMovieShow = async(req:Request, res:Response) => {

    const { id } = req.params;
    const { body } = req;

    try {
        
        const movieShow = await MovieShow.findByPk(id);

        if(!movieShow){
            return res.status(400).json({
                ok: false,
                msg: 'The show does not exist'
            });
        }

        const movieShowDB = await movieShow.update(body);
        const movieShowUpdate = await movieShowDB.save();

        return res.json({
            ok: true,
            msg: 'postMovieShow',
            movieShowUpdate
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Talk to the admin'
        });
    }
}

export const deleteMovieShow = async(req:Request, res:Response) => {

    const { id } = req.params;

    try {
        
        const movieShow = await MovieShow.findByPk(id);

        if(!movieShow){
            return res.status(400).json({
                ok: false,
                msg: 'The show does not exist'
            });
        }

        movieShow.status = false;
        const movieShowDB = await movieShow.update(movieShow);
        const movieShowDelete = await movieShowDB.save();

        return res.json({
            ok: true,
            msg: 'postMovieShow',
            movieShowDelete
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Talk to the admin'
        });
    }
}

