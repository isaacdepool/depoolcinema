"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movies_1 = require("../controllers/movies");
const router = express_1.Router();
router.get('/', movies_1.getMovies);
router.get('/:id', movies_1.getMovie);
router.post('/', movies_1.postMovie);
router.put('/:id', movies_1.putMovie);
router.delete('/:id', movies_1.deleteMovie);
exports.default = router;
//# sourceMappingURL=movies.js.map