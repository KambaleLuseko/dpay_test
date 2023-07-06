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
exports.AuthKeyMiddleware = void 0;
const common_1 = require("@nestjs/common");
const account_details_service_1 = require("../account-details/account-details.service");
const account_service_1 = require("../account/account.service");
const user_service_1 = require("../users/user.service");
let AuthKeyMiddleware = class AuthKeyMiddleware {
    constructor(accountService, accountDetailsService, userService) {
        this.accountService = accountService;
        this.accountDetailsService = accountDetailsService;
        this.userService = userService;
    }
    async use(req, res, next) {
        if (!req.headers.api_key) {
            throw new common_1.HttpException('You must provide an API KEY to use this service', common_1.HttpStatus.UNAUTHORIZED);
        }
        const accountDetails = await this.accountDetailsService.findAll(req.headers.api_key);
        if (accountDetails.length != 1) {
            throw new common_1.HttpException('Unable to authenticate the provided key', common_1.HttpStatus.UNAUTHORIZED);
        }
        const account = await this.accountService.findAll(accountDetails[0].account_uuid);
        if (!account) {
            throw new common_1.HttpException('Unable to find a developer account with the provided key', common_1.HttpStatus.UNAUTHORIZED);
        }
        const userData = await this.userService.findAll(account[0].client_uuid, 'false');
        if (!userData) {
            throw new common_1.HttpException('Unable to find a developer account with the provided key', common_1.HttpStatus.UNAUTHORIZED);
        }
        next();
    }
};
AuthKeyMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [account_service_1.AccountService,
        account_details_service_1.AccountDetailsService,
        user_service_1.UserService])
], AuthKeyMiddleware);
exports.AuthKeyMiddleware = AuthKeyMiddleware;
//# sourceMappingURL=key_auth.middeware.js.map