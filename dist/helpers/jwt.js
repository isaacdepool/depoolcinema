"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJwt = (id, name, email_type) => {
    const payload = { id, name, email_type };
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign(payload, (process.env.SECRET_JWT_SEED || ''), {
            expiresIn: process.env.Caducidad_token
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.generateJwt = generateJwt;
//# sourceMappingURL=jwt.js.map