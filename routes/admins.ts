import { Router } from 'express';
import { getAdmins, getAdmin, postAdmin, putAdmin, deleteAdmin, loginAdmin, renewToken } from '../controllers/admins';
import { checkTokenAdmin } from '../middlewares/checkToken';

const router = Router();

router.get('/', getAdmins);
router.get('/:id', getAdmin);
router.post('/auth/login', loginAdmin);
router.post('/', postAdmin);
router.put('/:id', putAdmin);
router.delete('/:id', deleteAdmin);

// Renew Token
router.get('/auth/renew',checkTokenAdmin, renewToken);
 

export default router;