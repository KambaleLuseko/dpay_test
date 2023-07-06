"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTAuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const account_details_service_1 = require("../account-details/account-details.service");
const jwt_helper_1 = require("../helpers/jwt.helper");
let JWTAuthMiddleware = class JWTAuthMiddleware {
    constructor(accountDetailService) {
        this.accountDetailService = accountDetailService;
    }
    async use(req, res, next) {
        if (req.headers.authorization) {
            if (!req.headers.authorization.split(' ')[1] || !req.headers.authorization.includes('Bearer')) {
                throw new common_1.HttpException('Invalid token format', common_1.HttpStatus.UNAUTHORIZED);
            }
            let verifiedToken = await jwt_helper_1.JWTHelper.verifyToken(req.headers.authorization.split(' ')[1]);
            if (!verifiedToken) {
                throw new common_1.HttpException('You are unauthorized to do this action', common_1.HttpStatus.UNAUTHORIZED);
            }
            next();
        }
        else if (req.headers.api_key) {
            let validKey = await this.accountDetailService.findAll(req.headers.api_key);
            console.log(validKey);
            if (validKey.length == 1) {
                next();
                return;
            }
            throw new common_1.HttpException('The submitted key is not authorized to do this action', common_1.HttpStatus.UNAUTHORIZED);
        }
        else {
            throw new common_1.HttpException('No token or API KEY found. You are unauthorized to do this action', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
JWTAuthMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [account_details_service_1.AccountDetailsService])
], JWTAuthMiddleware);
exports.JWTAuthMiddleware = JWTAuthMiddleware;
//# sourceMappingURL=jwt.middleware.js.map