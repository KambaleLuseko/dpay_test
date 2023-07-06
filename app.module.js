"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const config_module_1 = require("./DbConfig/config.module");
const users_module_1 = require("./users/users.module");
const wallet_module_1 = require("./wallets/wallet.module");
const mail_module_1 = require("./mailing/mail/mail.module");
const currency_module_1 = require("./currencies/currency/currency.module");
const rate_module_1 = require("./currencies/rate/rate.module");
const gateways_module_1 = require("./gateways/gateways.module");
const account_module_1 = require("./account/account.module");
const account_details_module_1 = require("./account-details/account-details.module");
const transactions_module_1 = require("./transactions/transactions.module");
const payment_methods_module_1 = require("./payment-methods/payment-methods.module");
const transaction_details_module_1 = require("./transaction-details/transaction-details.module");
const bills_module_1 = require("./bills/bills.module");
const bill_details_module_1 = require("./bill-details/bill-details.module");
const notifications_module_1 = require("./notifications/notifications.module");
const websockets_module_1 = require("./websockets/websockets.module");
const activities_module_1 = require("./activities/activities.module");
const activity_services_module_1 = require("./activity_services/activity_services.module");
const verification_code_module_1 = require("./verification_code/verification_code.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_module_1.DbConfigModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            wallet_module_1.WalletModule, mail_module_1.MailModule, currency_module_1.CurrencyModule, rate_module_1.RateModule,
            gateways_module_1.GatewaysModule, account_module_1.AccountModule, account_details_module_1.AccountDetailsModule,
            transactions_module_1.TransactionsModule, payment_methods_module_1.PaymentMethodsModule, transaction_details_module_1.TransactionDetailsModule,
            bills_module_1.BillsModule, bill_details_module_1.BillDetailsModule, notifications_module_1.NotificationsModule, websockets_module_1.WebsocketsModule, activities_module_1.ActivitiesModule, activity_services_module_1.ActivityServicesModule, verification_code_module_1.VerificationCodeModule,
        ],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map