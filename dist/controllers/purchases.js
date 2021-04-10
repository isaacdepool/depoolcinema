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
exports.deletePurchase = exports.putPurchase = exports.postPurchase = exports.getPurchaseByShowId = exports.getPurchaseByUserId = exports.getPurchase = exports.getPurchases = void 0;
const purchases_1 = __importDefault(require("../models/purchases"));
const getPurchases = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const purchases = yield purchases_1.default.findAll();
        return res.json({
            ok: true,
            msg: 'getPurchases',
            purchases
        });
    }
    catch (error) {
        console.log(error);
        return res.json({
            ok: false,
            msg: 'Talk to the admin'
        });
    }
});
exports.getPurchases = getPurchases;
const getPurchase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const purchase = yield purchases_1.default.findByPk(id);
        if (!purchase) {
            return res.status(404).json({
                ok: false,
                msg: 'The Purchase does not exist'
            });
        }
        return res.json({
            ok: true,
            msg: 'getPurchase',
            purchase
        });
    }
    catch (error) {
        console.log(error);
        return res.json({
            ok: false,
            msg: 'Talk to the admin'
        });
    }
});
exports.getPurchase = getPurchase;
const getPurchaseByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const purchases = yield purchases_1.default.findAll({
            where: { id_user: id }
        });
        if (!purchases) {
            return res.status(404).json({
                ok: false,
                msg: 'The Purchases do not exist'
            });
        }
        return res.json({
            ok: true,
            msg: 'getPurchaseByUserId',
            purchases
        });
    }
    catch (error) {
        console.log(error);
        return res.json({
            ok: false,
            msg: 'Talk to the admin'
        });
    }
});
exports.getPurchaseByUserId = getPurchaseByUserId;
const getPurchaseByShowId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const purchases = yield purchases_1.default.findAll({
            where: { id_show: id }
        });
        if (!purchases) {
            return res.status(404).json({
                ok: false,
                msg: 'The Purchases do not exist'
            });
        }
        return res.json({
            ok: true,
            msg: 'getPurchaseByShowId',
            purchases
        });
    }
    catch (error) {
        console.log(error);
        return res.json({
            ok: false,
            msg: 'Talk to the admin'
        });
    }
});
exports.getPurchaseByShowId = getPurchaseByShowId;
const postPurchase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const purchase = yield purchases_1.default.build(body);
        const purchaseDB = yield purchase.save();
        return res.json({
            ok: true,
            msg: 'postPurchases',
            purchaseDB
        });
    }
    catch (error) {
        console.log(error);
        return res.json({
            ok: false,
            msg: 'Talk to the admin'
        });
    }
});
exports.postPurchase = postPurchase;
const putPurchase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const purchase = yield purchases_1.default.findByPk(id);
        if (!purchase) {
            return res.status(404).json({
                ok: false,
                msg: 'The Purchases do not exist'
            });
        }
        const purchaseDB = yield purchase.update(body);
        const purchaseUpdate = yield purchaseDB.save();
        return res.json({
            ok: true,
            msg: 'putPurchases',
            purchaseUpdate
        });
    }
    catch (error) {
        console.log(error);
        return res.json({
            ok: false,
            msg: 'Talk to the admin'
        });
    }
});
exports.putPurchase = putPurchase;
const deletePurchase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const purchase = yield purchases_1.default.findByPk(id);
        if (!purchase) {
            return res.status(404).json({
                ok: false,
                msg: 'The Purchases do not exist'
            });
        }
        purchase.status = false;
        const purchaseDB = yield purchase.update(purchase);
        const purchaseDelete = yield purchaseDB.save();
        return res.json({
            ok: true,
            msg: 'putPurchases',
            purchaseDelete
        });
    }
    catch (error) {
        console.log(error);
        return res.json({
            ok: false,
            msg: 'Talk to the admin'
        });
    }
});
exports.deletePurchase = deletePurchase;
//# sourceMappingURL=purchases.js.map