import { Router } from 'express';
import { getAdmins, getAdmin, postAdmin, putAdmin, deleteAdmin, loginAdmin, renewToken } from '../controllers/admins';

const router = Router();

router.get('/', getAdmins);
router.get('/:id', getAdmin);
router.get('/auth/login', loginAdmin);
router.post('/', postAdmin);
router.put('/:id', putAdmin);
router.delete('/:id', deleteAdmin);

// Renew Token
router.get('/auth/renew', renewToken);


export default router;