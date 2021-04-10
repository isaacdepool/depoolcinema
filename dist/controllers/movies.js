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
exports.deleteMovie = exports.putMovie = exports.postMovie = exports.getMovie = exports.getMovies = void 0;
const movies_1 = __importDefault(require("../models/movies"));
const getMovies = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let offset = req.query.offset || 0;
    offset = Number(offset);
    let limit = req.query.limit || 10;
    limit = Number(limit);
    const movies = yield movies_1.default.findAll({
        offset,
        limit
    });
    resp.json({
        ok: true,
        mgs: 'getMovies',
        movies
    });
});
exports.getMovies = getMovies;
const getMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const moviesDB = yield movies_1.default.findByPk(id);
        if (!moviesDB) {
            return res.status(400).json({
                ok: false,
                msg: 'The movie does not exist'
            });
        }
        return res.json({
            ok: true,
            moviesDB
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
exports.getMovie = getMovie;
const postMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const movie = yield movies_1.default.create(body);
        const movieDB = yield movie.save();
        return res.json({
            ok: true,
            msg: 'postMovie',
            movieDB
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
exports.postMovie = postMovie;
const putMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const movieDB = yield movies_1.default.findByPk(id);
        if (!movieDB) {
            return res.status(400).json({
                ok: false,
                msg: 'The movie does not exist'
            });
        }
        const movieUdate = yield movieDB.update(body);
        return res.json({
            ok: true,
            msg: 'putMovie',
            movieUdate
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
exports.putMovie = putMovie;
const deleteMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const movie = yield movies_1.default.findByPk(id);
        if (!movie) {
            return res.status(400).json({
                ok: false,
                msg: 'The movie does not exist'
            });
        }
        movie.status = false;
        const movieDB = yield movie.update(movie);
        const movieDelete = yield movieDB.save();
        return res.json({
            ok: true,
            msg: 'deleteMovie',
            movieDelete
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
exports.deleteMovie = deleteMovie;
//# sourceMappingURL=movies.js.map