import { Router } from 'express';
import { getMovieShows, getMovieShow, postMovieShow, putMovieShow, deleteMovieShow } from '../controllers/movie-show';

const router = Router();

router.get('/', getMovieShows);
router.get('/:id', getMovieShow);
router.post('/', postMovieShow);
router.put('/:id', putMovieShow);
router.delete('/:id', deleteMovieShow);


export default router;