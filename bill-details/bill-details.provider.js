"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.billDetailsProvider = void 0;
const bill_details_model_1 = require("./bill-details.model");
exports.billDetailsProvider = {
    provide: 'BILL_DETAILS_REPOSITORY',
    useValue: bill_details_model_1.BillDetails
};
//# sourceMappingURL=bill-details.provider.js.map