import { Router } from 'express';
import { getRooms, getRoom, postRoom, putRoom, deleteRoom } from '../controllers/rooms';

const router = Router();

router.get('/', getRooms);
router.get('/:id', getRoom);
router.post('/', postRoom);
router.put('/:id', putRoom);
router.delete('/:id', deleteRoom);


export default router;