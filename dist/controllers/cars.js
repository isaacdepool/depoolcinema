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
exports.deleteCar = exports.putCar = exports.postCar = exports.getCar = exports.getCarsUser = exports.getCars = void 0;
const cars_1 = __importDefault(require("../models/cars"));
const getCars = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carsData = yield cars_1.default.findAll({
            where: { status: true }
        });
        return res.json({
            ok: true,
            msg: 'getCars',
            carsData
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Talk to the admin'
        });
    }
});
exports.getCars = getCars;
const getCarsUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const carsData = yield cars_1.default.findAll({
            where: { id_user: id, status: true }
        });
        return res.json({
            ok: true,
            msg: 'getCarsUser',
            carsData
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Talk to the admin'
        });
    }
});
exports.getCarsUser = getCarsUser;
const getCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const carData = yield cars_1.default.findByPk(id);
        if (!carData) {
            return res.status(400).json({
                ok: false,
                msg: 'Car data is no-existent',
            });
        }
        return res.json({
            ok: true,
            msg: 'carData',
            carData
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Talk to the admin'
        });
    }
});
exports.getCar = getCar;
const postCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const car = yield cars_1.default.build(body);
        const carData = yield car.save();
        return res.json({
            ok: true,
            msg: 'Cardata',
            carData
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Talk to the admin'
        });
    }
});
exports.postCar = postCar;
const putCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const car = yield cars_1.default.findByPk(id);
        if (!car) {
            return res.status(400).json({
                ok: false,
                msg: 'Car data is no-existent',
            });
        }
        const carDB = yield (car === null || car === void 0 ? void 0 : car.update(body));
        const carData = yield carDB.save();
        return res.json({
            ok: true,
            msg: 'carData',
            carData
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Talk to the admin'
        });
    }
});
exports.putCar = putCar;
const deleteCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const car = yield cars_1.default.findByPk(id);
        if (!car) {
            return res.status(400).json({
                ok: false,
                msg: 'Car data is no-existent',
            });
        }
        car.status = false;
        const carDB = yield car.update(car);
        const carData = yield carDB.save();
        return res.json({
            ok: true,
            msg: 'carData',
            carData
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Talk to the admin'
        });
    }
});
exports.deleteCar = deleteCar;
//# sourceMappingURL=cars.js.map