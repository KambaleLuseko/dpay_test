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
exports.RateController = void 0;
const common_1 = require("@nestjs/common");
const rate_service_1 = require("./rate.service");
let RateController = class RateController {
    constructor(rateService) {
        this.rateService = rateService;
    }
    async find(params) {
        return await this.rateService.find(params.value);
    }
    async findAll(params) {
        return await this.rateService.findAll(params.value);
    }
    async create(data) {
        return await this.rateService.create(data);
    }
};
__decorate([
    (0, common_1.Get)(':value?'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RateController.prototype, "find", null);
__decorate([
    (0, common_1.Get)(':value?/all'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RateController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RateController.prototype, "create", null);
RateController = __decorate([
    (0, common_1.Controller)('rate'),
    __metadata("design:paramtypes", [rate_service_1.RateService])
], RateController);
exports.RateController = RateController;
//# sourceMappingURL=rate.controller.js.map