"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionProvider = void 0;
const transactions_model_1 = require("./transactions.model");
exports.transactionProvider = {
    provide: 'TRANSACTIONS_REPOSITORY',
    useValue: transactions_model_1.Transactions
};
//# sourceMappingURL=transactions.provider.js.map