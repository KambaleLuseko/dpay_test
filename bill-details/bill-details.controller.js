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
exports.BillDetailsController = void 0;
const common_1 = require("@nestjs/common");
const bill_details_service_1 = require("./bill-details.service");
let BillDetailsController = class BillDetailsController {
    constructor(billDetailsService) {
        this.billDetailsService = billDetailsService;
    }
    async get(params) {
        return this.billDetailsService.findAll(params.value);
    }
    async create(data) {
        return this.billDetailsService.create(data);
    }
    async update(data, params) {
        return this.billDetailsService.update(data, params.uuid);
    }
    async delete(params) {
        return this.billDetailsService.delete(params.uuid);
    }
};
__decorate([
    (0, common_1.Get)('/:value?'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BillDetailsController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BillDetailsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('/:uuid'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BillDetailsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/:uuid'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BillDetailsController.prototype, "delete", null);
BillDetailsController = __decorate([
    (0, common_1.Controller)('bill-details'),
    __metadata("design:paramtypes", [bill_details_service_1.BillDetailsService])
], BillDetailsController);
exports.BillDetailsController = BillDetailsController;
//# sourceMappingURL=bill-details.controller.js.map