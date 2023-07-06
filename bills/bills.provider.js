"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.billsProvider = void 0;
const bills_model_1 = require("./bills.model");
exports.billsProvider = {
    provide: 'BILLS_REPOSITORY',
    useValue: bills_model_1.Bills
};
//# sourceMappingURL=bills.provider.js.map