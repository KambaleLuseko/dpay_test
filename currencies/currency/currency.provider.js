"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currencyProvider = void 0;
const currency_model_1 = require("./currency.model");
exports.currencyProvider = [{
        provide: 'CURRENCY_REPOSITORY',
        useValue: currency_model_1.Currencies
    }];
//# sourceMappingURL=currency.provider.js.map