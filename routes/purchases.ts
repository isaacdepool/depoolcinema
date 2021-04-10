import { Router } from 'express';
import { getPurchases, getPurchase, postPurchase, putPurchase, deletePurchase, getPurchaseByUserId, getPurchaseByShowId } from '../controllers/purchases';

const router = Router();

router.get('/', getPurchases);
router.get('/:id', getPurchase);
router.post('/', postPurchase);
router.put('/:id', putPurchase);
router.delete('/:id', deletePurchase);

// By ID
router.get('/by-id-user/:id', getPurchaseByUserId);
router.get('/by-id-show/:id', getPurchaseByShowId);


export default router;