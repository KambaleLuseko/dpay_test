"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionDetailsProvider = void 0;
const transaction_details_model_1 = require("./transaction-details.model");
exports.transactionDetailsProvider = {
    provide: 'TRANSACTION_DETAILS_REPOSITORY',
    useValue: transaction_details_model_1.TransactionDetails
};
//# sourceMappingURL=transaction-details.provider.js.map