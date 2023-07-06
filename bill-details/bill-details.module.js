"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillDetailsModule = void 0;
const common_1 = require("@nestjs/common");
const bill_details_controller_1 = require("./bill-details.controller");
const bill_details_provider_1 = require("./bill-details.provider");
const bill_details_service_1 = require("./bill-details.service");
let BillDetailsModule = class BillDetailsModule {
};
BillDetailsModule = __decorate([
    (0, common_1.Module)({
        controllers: [bill_details_controller_1.BillDetailsController],
        providers: [bill_details_service_1.BillDetailsService, bill_details_provider_1.billDetailsProvider],
        exports: [bill_details_service_1.BillDetailsService]
    })
], BillDetailsModule);
exports.BillDetailsModule = BillDetailsModule;
//# sourceMappingURL=bill-details.module.js.map