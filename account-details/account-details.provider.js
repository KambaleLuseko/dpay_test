"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountDetailsProvider = void 0;
const account_details_model_1 = require("./account-details.model");
exports.accountDetailsProvider = {
    provide: 'ACCOUNT_DETAILS_REPOSITORY',
    useValue: account_details_model_1.AccountDetails
};
//# sourceMappingURL=account-details.provider.js.map