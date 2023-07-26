"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsModule = void 0;
const common_1 = require("@nestjs/common");
const transactions_service_1 = require("./transactions.service");
const transactions_controller_1 = require("./transactions.controller");
const transactions_provider_1 = require("./transactions.provider");
const payment_methods_module_1 = require("../payment-methods/payment-methods.module");
const transaction_details_module_1 = require("../transaction-details/transaction-details.module");
const users_module_1 = require("../users/users.module");
const bills_module_1 = require("../bills/bills.module");
const notifications_module_1 = require("../notifications/notifications.module");
const websockets_module_1 = require("../websockets/websockets.module");
const activities_module_1 = require("../activities/activities.module");
const mail_module_1 = require("../mailing/mail/mail.module");
const key_auth_middeware_1 = require("../middlewares/key_auth.middeware");
const account_module_1 = require("../account/account.module");
const account_details_module_1 = require("../account-details/account-details.module");
let TransactionsModule = class TransactionsModule {
    configure(consumer) {
        consumer.apply(key_auth_middeware_1.AuthKeyMiddleware).forRoutes({ path: 'transactions/merchant/initiate-payment', method: common_1.RequestMethod.POST });
    }
};
TransactionsModule = __decorate([
    (0, common_1.Module)({
        imports: [payment_methods_module_1.PaymentMethodsModule, transaction_details_module_1.TransactionDetailsModule, users_module_1.UsersModule, (0, common_1.forwardRef)(() => bills_module_1.BillsModule), notifications_module_1.NotificationsModule, websockets_module_1.WebsocketsModule, activities_module_1.ActivitiesModule, mail_module_1.MailModule, account_module_1.AccountModule, account_details_module_1.AccountDetailsModule],
        providers: [transactions_service_1.TransactionsService, transactions_provider_1.transactionProvider],
        controllers: [transactions_controller_1.TransactionsController],
        exports: [transactions_service_1.TransactionsService]
    })
], TransactionsModule);
exports.TransactionsModule = TransactionsModule;
//# sourceMappingURL=transactions.module.js.map