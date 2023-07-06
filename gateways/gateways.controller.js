"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewaysDetailsController = exports.GatewaysController = void 0;
const common_1 = require("@nestjs/common");
const gateways_service_1 = require("./gateways.service");
let GatewaysController = class GatewaysController {
    constructor(gatewayService) {
        this.gatewayService = gatewayService;
    }
    async create(body) {
        return this.gatewayService.create(body);
    }
    async find(params) {
        return this.gatewayService.find(params.value);
    }
    async findSpecs(params) {
        return this.gatewayService.findForSale(params.value);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GatewaysController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':value?'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GatewaysController.prototype, "find", null);
__decorate([
    (0, common_1.Get)(':value/specs'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GatewaysController.prototype, "findSpecs", null);
GatewaysController = __decorate([
    (0, common_1.Controller)('gateways'),
    __metadata("design:paramtypes", [gateways_service_1.GatewaysService])
], GatewaysController);
exports.GatewaysController = GatewaysController;
let GatewaysDetailsController = class GatewaysDetailsController {
};
GatewaysDetailsController = __decorate([
    (0, common_1.Controller)('gateways-details')
], GatewaysDetailsController);
exports.GatewaysDetailsController = GatewaysDetailsController;
//# sourceMappingURL=gateways.controller.js.map