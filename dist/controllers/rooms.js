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
exports.deleteRoom = exports.putRoom = exports.postRoom = exports.getRoom = exports.getRooms = void 0;
const rooms_1 = __importDefault(require("../models/rooms"));
const getRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rooms = yield rooms_1.default.findAll();
        return res.json({
            ok: true,
            msg: 'getRooms',
            rooms
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
exports.getRooms = getRooms;
const getRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const room = yield rooms_1.default.findByPk(id);
        if (!room) {
            return res.status(400).json({
                ok: false,
                msg: 'Room is no-existent',
            });
        }
        return res.json({
            ok: true,
            msg: 'getRoom',
            room
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
exports.getRoom = getRoom;
const postRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const room = yield rooms_1.default.build(body);
        const roomSave = yield room.save();
        return res.json({
            ok: true,
            msg: 'postRoom',
            roomSave
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
exports.postRoom = postRoom;
const putRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const room = yield rooms_1.default.findByPk(id);
        if (!room) {
            return res.status(400).json({
                ok: false,
                msg: 'The Room does not exist'
            });
        }
        const roomDB = yield room.update(body);
        const roomUpdate = yield roomDB.save();
        return res.json({
            ok: true,
            msg: 'putRoom',
            roomUpdate
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
exports.putRoom = putRoom;
const deleteRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const room = yield rooms_1.default.findByPk(id);
        if (!room) {
            return res.status(400).json({
                ok: false,
                msg: 'The Room does not exist'
            });
        }
        room.status = false;
        const roomDB = yield room.update(room);
        const roomDelete = yield roomDB.save();
        return res.json({
            ok: true,
            msg: 'deleteRoom',
            roomDelete
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
exports.deleteRoom = deleteRoom;
//# sourceMappingURL=rooms.js.map