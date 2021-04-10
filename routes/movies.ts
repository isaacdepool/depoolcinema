import { Router } from 'express';
import { getMovies, getMovie, postMovie, putMovie, deleteMovie } from '../controllers/movies';

const router = Router();
 
router.get('/', getMovies);
router.get('/:id', getMovie);
router.post('/', postMovie);
router.put('/:id', putMovie);
router.delete('/:id', deleteMovie);

export default router; 