"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gatewayDetailsProvider = exports.gatewayProvider = void 0;
const gateway_model_1 = require("./gateway.model");
exports.gatewayProvider = {
    provide: 'GATEWAYS_REPOSITORY',
    useValue: gateway_model_1.Gateways
};
exports.gatewayDetailsProvider = {
    provide: 'GATEWAYS_DETAILS_REPOSITORY',
    useValue: gateway_model_1.GatewaysDetails
};
//# sourceMappingURL=gateways.provider.js.map