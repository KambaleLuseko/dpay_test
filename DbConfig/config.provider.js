"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const account_details_model_1 = require("../account-details/account-details.model");
const account_model_1 = require("../account/account.model");
const bill_details_model_1 = require("../bill-details/bill-details.model");
const bills_model_1 = require("../bills/bills.model");
const currency_model_1 = require("../currencies/currency/currency.model");
const rate_model_1 = require("../currencies/rate/rate.model");
const gateway_model_1 = require("../gateways/gateway.model");
const payment_methods_model_1 = require("../payment-methods/payment-methods.model");
const transaction_details_model_1 = require("../transaction-details/transaction-details.model");
const transactions_model_1 = require("../transactions/transactions.model");
const wallet_model_1 = require("../wallets/wallet.model");
const user_model_1 = require("../users/user.model");
const notification_entity_1 = require("../notifications/entities/notification.entity");
const activity_entity_1 = require("../activities/entities/activity.entity");
const activity_service_entity_1 = require("../activity_services/entities/activity_service.entity");
const verification_code_entity_1 = require("../verification_code/entities/verification_code.entity");
exports.databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new sequelize_typescript_1.Sequelize({
                dialect: 'mysql',
                host: 'bnigmieh5t7b35yz12cu-mysql.services.clever-cloud.com',
                port: 3306,
                username: 'ukdncpc55b5nveep',
                password: 'ss42SqVd5lio0dslCI9R',
                database: 'bnigmieh5t7b35yz12cu',
            });
            sequelize.addModels([
                user_model_1.UserModel, wallet_model_1.Wallet, currency_model_1.Currencies, rate_model_1.Rates, gateway_model_1.Gateways,
                gateway_model_1.GatewaysDetails, account_model_1.Account, account_details_model_1.AccountDetails, payment_methods_model_1.PaymentMethod,
                transactions_model_1.Transactions, transaction_details_model_1.TransactionDetails, bills_model_1.Bills, bill_details_model_1.BillDetails, notification_entity_1.Notifications,
                activity_entity_1.Activity, activity_service_entity_1.ActivityService, verification_code_entity_1.VerificationCode
            ]);
            await sequelize.sync({ force: false });
            return sequelize;
        },
    },
];
//# sourceMappingURL=config.provider.js.map