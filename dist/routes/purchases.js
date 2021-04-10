"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const purchases_1 = require("../controllers/purchases");
const router = express_1.Router();
router.get('/', purchases_1.getPurchases);
router.get('/:id', purchases_1.getPurchase);
router.post('/', purchases_1.postPurchase);
router.put('/:id', purchases_1.putPurchase);
router.delete('/:id', purchases_1.deletePurchase);
// By ID
router.get('/by-id-user/:id', purchases_1.getPurchaseByUserId);
router.get('/by-id-show/:id', purchases_1.getPurchaseByShowId);
exports.default = router;
//# sourceMappingURL=purchases.js.map