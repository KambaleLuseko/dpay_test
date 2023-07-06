"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillsModule = void 0;
const common_1 = require("@nestjs/common");
const bill_details_module_1 = require("../bill-details/bill-details.module");
const bills_controller_1 = require("./bills.controller");
const bills_provider_1 = require("./bills.provider");
const bills_service_1 = require("./bills.service");
const users_module_1 = require("../users/users.module");
const transactions_module_1 = require("../transactions/transactions.module");
const notifications_module_1 = require("../notifications/notifications.module");
const websockets_module_1 = require("../websockets/websockets.module");
const key_auth_middeware_1 = require("../middlewares/key_auth.middeware");
const account_module_1 = require("../account/account.module");
const account_details_module_1 = require("../account-details/account-details.module");
const activity_services_module_1 = require("../activity_services/activity_services.module");
const mail_module_1 = require("../mailing/mail/mail.module");
let BillsModule = class BillsModule {
    configure(consumer) {
        consumer.apply(key_auth_middeware_1.AuthKeyMiddleware).forRoutes({ path: 'bills/merchant/new-bill', method: common_1.RequestMethod.POST });
    }
};
BillsModule = __decorate([
    (0, common_1.Module)({
        imports: [bill_details_module_1.BillDetailsModule, users_module_1.UsersModule, (0, common_1.forwardRef)(() => transactions_module_1.TransactionsModule), notifications_module_1.NotificationsModule, websockets_module_1.WebsocketsModule, account_module_1.AccountModule, account_details_module_1.AccountDetailsModule, activity_services_module_1.ActivityServicesModule, mail_module_1.MailModule],
        controllers: [bills_controller_1.BillsController],
        providers: [bills_service_1.BillsService, bills_provider_1.billsProvider],
        exports: [bills_service_1.BillsService]
    })
], BillsModule);
exports.BillsModule = BillsModule;
//# sourceMappingURL=bills.module.js.map