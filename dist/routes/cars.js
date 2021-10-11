"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cars_1 = require("../controllers/cars");
const router = express_1.Router();
router.get('/', cars_1.getCars);
router.get('/:id', cars_1.getCar);
router.get('/user/:id', cars_1.getCarsUser);
router.post('/', cars_1.postCar);
router.put('/:id', cars_1.putCar);
router.delete('/:id', cars_1.deleteCar);
exports.default = router;
//# sourceMappingURL=cars.js.map