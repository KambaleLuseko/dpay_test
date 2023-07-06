"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethodsModule = void 0;
const common_1 = require("@nestjs/common");
const gateways_module_1 = require("../gateways/gateways.module");
const payment_methods_controller_1 = require("./payment-methods.controller");
const payment_methods_provider_1 = require("./payment-methods.provider");
const payment_methods_service_1 = require("./payment-methods.service");
let PaymentMethodsModule = class PaymentMethodsModule {
};
PaymentMethodsModule = __decorate([
    (0, common_1.Module)({
        imports: [gateways_module_1.GatewaysModule],
        controllers: [payment_methods_controller_1.PaymentMethodsController],
        providers: [payment_methods_service_1.PaymentMethodsService, payment_methods_provider_1.paymentMethodProvider],
        exports: [payment_methods_service_1.PaymentMethodsService]
    })
], PaymentMethodsModule);
exports.PaymentMethodsModule = PaymentMethodsModule;
//# sourceMappingURL=payment-methods.module.js.map