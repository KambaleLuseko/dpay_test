"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletsProvider = void 0;
const wallet_model_1 = require("./wallet.model");
exports.walletsProvider = [
    {
        provide: 'WALLETS_REPOSITORY',
        useValue: wallet_model_1.Wallet
    }
];
//# sourceMappingURL=wallet.provider.js.map