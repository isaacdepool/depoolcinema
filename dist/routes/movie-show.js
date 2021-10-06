"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movie_shows_1 = require("../controllers/movie-shows");
const router = express_1.Router();
router.get('/', movie_shows_1.getMovieShows);
router.get('/:id', movie_shows_1.getMovieShow);
router.post('/', movie_shows_1.postMovieShow);
router.put('/:id', movie_shows_1.putMovieShow);
router.delete('/:id', movie_shows_1.deleteMovieShow);
exports.default = router;
//# sourceMappingURL=movie-show.js.map