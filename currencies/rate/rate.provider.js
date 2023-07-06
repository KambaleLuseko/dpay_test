"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratesProvider = void 0;
const rate_model_1 = require("./rate.model");
exports.ratesProvider = [
    {
        provide: 'RATES_REPOSITORY',
        useValue: rate_model_1.Rates
    }
];
//# sourceMappingURL=rate.provider.js.map