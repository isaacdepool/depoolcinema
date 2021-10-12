import { Router } from 'express';
import { getUsuarios, login, postUsuario, putUsuario, deleteUsuario, renewToken, getUsuario } from '../controllers/user';
import { checkToken } from '../middlewares/checkToken';

const router = Router();

router.get('/', getUsuarios);
router.get('/:id', getUsuario);
router.get('/auth/login', login);
router.post('/', postUsuario); 
router.put('/:id', putUsuario);
router.delete('/:id', deleteUsuario);

// Validate and Renew Token
router.get('/auth/renew', checkToken, renewToken)




export default router;