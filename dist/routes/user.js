"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const checkToken_1 = require("../middlewares/checkToken");
const router = express_1.Router();
router.get('/', user_1.getUsuarios);
router.get('/:id', user_1.getUsuario);
router.get('/auth/login', user_1.login);
router.post('/', user_1.postUsuario);
router.put('/:id', user_1.putUsuario);
router.delete('/:id', user_1.deleteUsuario);
// Validate and Renew Token
router.get('/auth/renew', checkToken_1.checkToken, user_1.renewToken);
exports.default = router;
//# sourceMappingURL=user.js.map