"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admins_1 = require("../controllers/admins");
const router = express_1.Router();
router.get('/', admins_1.getAdmins);
router.get('/:id', admins_1.getAdmin);
router.get('/auth/login', admins_1.loginAdmin);
router.post('/', admins_1.postAdmin);
router.put('/:id', admins_1.putAdmin);
router.delete('/:id', admins_1.deleteAdmin);
// Renew Token
router.get('/auth/renew', admins_1.renewToken);
exports.default = router;
//# sourceMappingURL=admins.js.map