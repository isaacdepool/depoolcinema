"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rooms_1 = require("../controllers/rooms");
const router = express_1.Router();
router.get('/', rooms_1.getRooms);
router.get('/:id', rooms_1.getRoom);
router.post('/', rooms_1.postRoom);
router.put('/:id', rooms_1.putRoom);
router.delete('/:id', rooms_1.deleteRoom);
exports.default = router;
//# sourceMappingURL=rooms.js.map