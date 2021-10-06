"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovieShow = exports.putMovieShow = exports.postMovieShow = exports.getMovieShow = exports.getMovieShows = void 0;
const movie_shows_1 = __importDefault(require("../models/movie-shows"));
const getMovieShows = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movieShows = yield movie_shows_1.default.findAll({
            where: { status: true }
        });
        return res.json({
            ok: true,
            msg: 'getMoviesShows',
            movieShows
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Talk to the admin'
        });
    }
});
exports.getMovieShows = getMovieShows;
const getMovieShow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const movieShow = yield movie_shows_1.default.findByPk(id);
        if (!movieShow) {
            return res.status(400).json({
                ok: false,
                msg: 'The show does not exist'
            });
        }
        return res.json({
            ok: true,
            msg: 'getMovieShow',
            movieShow
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Talk to the admin'
        });
    }
});
exports.getMovieShow = getMovieShow;
const postMovieShow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const movieShowDB = yield movie_shows_1.default.build(body);
        const movieShowSave = yield movieShowDB.save();
        return res.json({
            ok: true,
            msg: 'postMovieShow',
            movieShowSave
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Talk to the admin'
        });
    }
});
exports.postMovieShow = postMovieShow;
const putMovieShow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const movieShow = yield movie_shows_1.default.findByPk(id);
        if (!movieShow) {
            return res.status(400).json({
                ok: false,
                msg: 'The show does not exist'
            });
        }
        const movieShowDB = yield movieShow.update(body);
        const movieShowUpdate = yield movieShowDB.save();
        return res.json({
            ok: true,
            msg: 'postMovieShow',
            movieShowUpdate
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Talk to the admin'
        });
    }
});
exports.putMovieShow = putMovieShow;
const deleteMovieShow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const movieShow = yield movie_shows_1.default.findByPk(id);
        if (!movieShow) {
            return res.status(400).json({
                ok: false,
                msg: 'The show does not exist'
            });
        }
        movieShow.status = false;
        const movieShowDB = yield movieShow.update(movieShow);
        const movieShowDelete = yield movieShowDB.save();
        return res.json({
            ok: true,
            msg: 'postMovieShow',
            movieShowDelete
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Talk to the admin'
        });
    }
});
exports.deleteMovieShow = deleteMovieShow;
//# sourceMappingURL=movie-shows.js.map