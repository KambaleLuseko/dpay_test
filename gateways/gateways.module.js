"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewaysModule = void 0;
const common_1 = require("@nestjs/common");
const gateways_controller_1 = require("./gateways.controller");
const gateways_provider_1 = require("./gateways.provider");
const gateways_service_1 = require("./gateways.service");
let GatewaysModule = class GatewaysModule {
};
GatewaysModule = __decorate([
    (0, common_1.Module)({
        controllers: [gateways_controller_1.GatewaysController],
        providers: [gateways_service_1.GatewaysService, gateways_service_1.GatewaysDetailsService, gateways_provider_1.gatewayProvider, gateways_provider_1.gatewayDetailsProvider],
        exports: [gateways_service_1.GatewaysService]
    })
], GatewaysModule);
exports.GatewaysModule = GatewaysModule;
//# sourceMappingURL=gateways.module.js.map