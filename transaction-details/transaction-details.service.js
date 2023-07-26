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
exports.TransactionDetailsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
const uuidGenerator_helper_1 = require("../helpers/uuidGenerator.helper");
let TransactionDetailsService = class TransactionDetailsService {
    constructor(transactionDetails) {
        this.transactionDetails = transactionDetails;
    }
    async findAll(value) {
        let condition;
        if (value) {
            condition = { [sequelize_1.Op.or]: { uuid: value, transaction_uuid: value } };
        }
        let data = await this.transactionDetails.findAll({ where: condition, raw: true });
        return data;
    }
    async create(data) {
        if (!data.amount || !data.transaction_uuid) {
            throw new common_1.HttpException('Invalid data submitted', common_1.HttpStatus.BAD_REQUEST);
        }
        if (data.amount == 0) {
            throw new common_1.HttpException('The amount cannot be equal to zero', common_1.HttpStatus.FORBIDDEN);
        }
        if (!data.uuid) {
            data.uuid = uuidGenerator_helper_1.UuidGenerator.uuidGenerator();
        }
        return await this.transactionDetails.create(data);
    }
};
TransactionDetailsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('TRANSACTION_DETAILS_REPOSITORY')),
    __metadata("design:paramtypes", [Object])
], TransactionDetailsService);
exports.TransactionDetailsService = TransactionDetailsService;
//# sourceMappingURL=transaction-details.service.js.map