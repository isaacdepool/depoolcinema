import { Router } from 'express';
import { getCar, getCars, postCar, putCar, deleteCar, getCarsUser } from '../controllers/cars';


const router = Router();

router.get('/', getCars);
router.get('/:id', getCar);
router.get('/user/:id', getCarsUser);
router.post('/', postCar);
router.put('/:id', putCar); 
router.delete('/:id', deleteCar);

export default router; 