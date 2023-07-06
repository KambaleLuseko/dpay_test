"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTHelper = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const JWT_SECRET = 'some secret key';
class JWTHelper {
    static async generateToken(data) {
        let payload = {};
        if (data.email) {
            payload = {
                email: data.email,
                uuid: data.uuid
            };
        }
        else if (data.phone) {
            payload = {
                phone: data.phone,
                uuid: data.uuid
            };
        }
        return jwt.sign(payload, JWT_SECRET);
    }
    static async verifyToken(token) {
        return await jwt.verify(token, JWT_SECRET, (err, result) => {
            if (err) {
                return null;
            }
            ;
            return result;
        });
    }
    static async authMiddleware(req, res, next) {
        const token = req.headers.authorization.split(' ')[1];
        const payload = this.verifyToken(token);
        if (!payload) {
            throw new common_1.HttpException('The token is invalid or has expired', common_1.HttpStatus.FORBIDDEN);
            return;
        }
        next();
    }
}
exports.JWTHelper = JWTHelper;
//# sourceMappingURL=jwt.helper.js.map