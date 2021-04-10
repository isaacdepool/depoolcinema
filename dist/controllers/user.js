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
exports.renewToken = exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.login = exports.getUsuario = exports.getUsuarios = void 0;
const jwt_1 = require("../helpers/jwt");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userDB = yield user_1.default.findAll();
    return res.json({
        ok: true,
        msg: 'getUsuario',
        userDB
    });
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const userDB = yield user_1.default.findByPk(id);
        let copy = JSON.stringify(userDB);
        let user = JSON.parse(copy);
        delete user.password;
        if (!user) {
            res.status(400).json({
                ok: false,
                msg: 'User is no-existent'
            });
        }
        res.json({
            ok: true,
            msg: 'getUsuario',
            user
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Talk to the admin'
        });
    }
});
exports.getUsuario = getUsuario;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Check email
    const user = yield user_1.default.findOne({ where: { email } });
    if (!user) {
        return res.status(404).json({
            ok: false,
            msg: 'Invalid email or password'
        });
    }
    // Check password
    const validpass = bcrypt_1.default.compareSync(password, user.password);
    if (!validpass) {
        return res.status(404).json({
            ok: false,
            msg: 'Invalid email or password'
        });
    }
    // Generate JWT
    const token = yield jwt_1.generateJwt(user.id, user.name, user.email);
    return res.json({
        ok: true,
        msg: 'getUsuario',
        id: user.id,
        name: user.name,
        email: user.email,
        token
    });
});
exports.login = login;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existeEmail = yield user_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (existeEmail) {
            return res.status(404).json({
                ok: false,
                msg: `the email ${body.email} already exist`
            });
        }
        // Bcrypt
        const salt = bcrypt_1.default.genSaltSync();
        body.password = bcrypt_1.default.hashSync(body.password, salt);
        // Create user
        const usuario = user_1.default.build(body);
        const { id, name, email } = yield usuario.save();
        // Create JWT
        const token = yield jwt_1.generateJwt(id, name, email);
        res.json({
            ok: true,
            msg: 'postUsuario',
            id,
            name,
            email,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Talk to the admin'
        });
    }
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'User is no-existent'
            });
        }
        // Bcrypt
        if (body.password) {
            const salt = bcrypt_1.default.genSaltSync();
            body.password = bcrypt_1.default.hashSync(body.password, salt);
        }
        // Create user
        const userDB = yield user.update(body);
        const { name, email } = userDB;
        // Create JWT
        const token = yield jwt_1.generateJwt(id, name, email);
        return res.json({
            ok: true,
            id,
            name,
            email,
            token
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
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_1.default.findByPk(id);
    if (!user) {
        return res.status(400).json({
            ok: false,
            msg: 'User is no-existent'
        });
    }
    user.status = false;
    const userDB = yield user.update(user);
    const userDelete = yield userDB.save();
    res.json({
        ok: true,
        msg: 'deleteUsuario',
        userDelete
    });
});
exports.deleteUsuario = deleteUsuario;
const renewToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id, name, email } = body;
    const token = yield jwt_1.generateJwt(id, name, email);
    return res.json({
        ok: true,
        id,
        name,
        email,
        token
    });
});
exports.renewToken = renewToken;
//# sourceMappingURL=user.js.map