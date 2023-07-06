"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountProvider = void 0;
const account_model_1 = require("./account.model");
exports.accountProvider = {
    provide: "ACCOUNTS_REPOSITORY",
    useValue: account_model_1.Account
};
//# sourceMappingURL=account.provider.js.map