import { Router } from 'express';
import { getCar, getCars, postCar, putCar, deleteCar } from '../controllers/cars';


const router = Router();

router.get('/', getCars);
router.get('/:id', getCar);
router.post('/', postCar);
router.put('/:id', putCar); 
router.delete('/:id', deleteCar);

export default router; 