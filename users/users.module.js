"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const account_module_1 = require("../account/account.module");
const config_module_1 = require("../DbConfig/config.module");
const mail_module_1 = require("../mailing/mail/mail.module");
const payment_methods_module_1 = require("../payment-methods/payment-methods.module");
const wallet_module_1 = require("../wallets/wallet.module");
const user_controller_1 = require("./user.controller");
const user_provider_1 = require("./user.provider");
const user_service_1 = require("./user.service");
const verification_code_module_1 = require("../verification_code/verification_code.module");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [config_module_1.DbConfigModule, wallet_module_1.WalletModule, (0, common_1.forwardRef)(() => mail_module_1.MailModule), account_module_1.AccountModule, payment_methods_module_1.PaymentMethodsModule, (0, common_1.forwardRef)(() => verification_code_module_1.VerificationCodeModule)],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, ...user_provider_1.userProviders,],
        exports: [user_service_1.UserService]
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map