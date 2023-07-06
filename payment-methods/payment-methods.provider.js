"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentMethodProvider = void 0;
const payment_methods_model_1 = require("./payment-methods.model");
exports.paymentMethodProvider = {
    useValue: payment_methods_model_1.PaymentMethod,
    provide: 'PAYMENT_METHOD_REPOSITORY'
};
//# sourceMappingURL=payment-methods.provider.js.map