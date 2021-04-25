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
exports.renewToken = exports.deleteAdmin = exports.putAdmin = exports.postAdmin = exports.getAdmin = exports.loginAdmin = exports.getAdmins = void 0;
const admins_1 = __importDefault(require("../models/admins"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../helpers/jwt");
const getAdmins = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminsData = yield admins_1.default.findAll();
        return res.json({
            ok: true,
            msg: 'getAdmin',
            adminsData
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
exports.getAdmins = getAdmins;
const loginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        // Check email
        const admin = yield admins_1.default.findOne({ where: { username } });
        if (!admin) {
            return res.status(404).json({
                ok: false,
                msg: 'Invalid username or password'
            });
        }
        // Check password
        const validPass = bcrypt_1.default.compareSync(password, admin.password);
        if (!validPass) {
            return res.status(404).json({
                ok: false,
                msg: 'Invalid username or password'
            });
        }
        // Generate JWT
        const token = yield jwt_1.generateJwtAdmin(admin.id, admin.username, admin.type);
        return res.json({
            ok: true,
            msg: 'loginAdmin',
            id: admin.id,
            username: admin.username,
            type: admin.type,
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
exports.loginAdmin = loginAdmin;
const getAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const adminData = yield admins_1.default.findByPk(id, {
            attributes: { exclude: ['password'] }
        });
        if (!adminData) {
            return res.status(400).json({
                ok: false,
                msg: 'Admin is no-existent'
            });
        }
        return res.json({
            ok: true,
            msg: 'getAdmin',
            adminData
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
exports.getAdmin = getAdmin;
const postAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        // Check email
        const checkUsername = yield admins_1.default.findOne({
            where: {
                username: body.username
            }
        });
        if (checkUsername) {
            return res.status(404).json({
                ok: false,
                msg: `The Username ${body.username} already exist.`
            });
        }
        // bcrypt
        const salt = bcrypt_1.default.genSaltSync();
        body.password = bcrypt_1.default.hashSync(body.password, salt);
        const adminBuild = yield admins_1.default.build(body);
        const adminDB = yield adminBuild.save();
        // Generate JWT
        const token = yield jwt_1.generateJwtAdmin(adminDB.id, adminDB.username, adminDB.type);
        return res.json({
            ok: true,
            msg: 'postAdmin',
            admin: {
                id: adminDB.id,
                username: adminDB.username,
                type: adminDB.type,
                token
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Talk to the admin',
        });
    }
});
exports.postAdmin = postAdmin;
const putAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const admin = yield admins_1.default.findByPk(id);
        if (!admin) {
            return res.status(400).json({
                ok: false,
                msg: 'Admin is no-existent'
            });
        }
        // bcrypt
        if (body.password) {
            const salt = bcrypt_1.default.genSaltSync();
            body.password = bcrypt_1.default.hashSync(body.password, salt);
        }
        const adminBD = yield admin.update(body);
        const adminUpdate = yield adminBD.save();
        return res.json({
            ok: true,
            msg: 'putAdmin',
            admin: {
                id: adminUpdate.id,
                username: adminUpdate.username,
                type: adminUpdate.type
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Talk to the admin',
        });
    }
});
exports.putAdmin = putAdmin;
const deleteAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const admin = yield admins_1.default.findByPk(id);
        if (!admin) {
            return res.status(400).json({
                ok: false,
                msg: 'Admin is no-existent'
            });
        }
        admin.status = false;
        const adminDB = yield admin.update(admin);
        const adminSave = yield adminDB.save();
        return res.json({
            ok: true,
            msg: 'deleteAdmin',
            id: adminSave.id
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Talk to the admin',
        });
    }
});
exports.deleteAdmin = deleteAdmin;
const renewToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id, username, type } = body;
    const token = yield jwt_1.generateJwtAdmin(id, username, type);
    return res.json({
        ok: true,
        id,
        username,
        type,
        token
    });
});
exports.renewToken = renewToken;
//# sourceMappingURL=admins.js.map