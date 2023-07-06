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
exports.RateService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
const uuidGenerator_helper_1 = require("../../helpers/uuidGenerator.helper");
let RateService = class RateService {
    constructor(rateModel) {
        this.rateModel = rateModel;
    }
    async find(value) {
        let condition = {};
        if (value) {
            condition = { [sequelize_1.Op.and]: { active: 1, [sequelize_1.Op.or]: { currency_uuid: value, uuid: value, } } };
        }
        return { data: await this.rateModel.findAll({ where: condition }) };
    }
    async findAll(value) {
        let condition = {};
        if (value) {
            condition = { [sequelize_1.Op.or]: { currency_uuid: value, uuid: value, } };
        }
        return { data: await this.rateModel.findAll({ where: condition }) };
    }
    async create(data) {
        try {
            let rate = {
                uuid: data.uuid || uuidGenerator_helper_1.UuidGenerator.uuidGenerator(),
                currency_uuid: data.currency_uuid,
                from_usd_rate: data.from_usd_rate || 1,
                to_usd_rate: data.to_usd_rate || 1
            };
            if (!rate.currency_uuid) {
                throw new common_1.HttpException('Invalid data submitted', common_1.HttpStatus.BAD_REQUEST);
                return;
            }
            await this.rateModel.update({ active: 0 }, { where: { currency_uuid: rate.currency_uuid } });
            return await this.rateModel.create(rate);
        }
        catch (error) {
            console.log(error.message);
            throw new common_1.HttpException('Error occured while saving data', common_1.HttpStatus.NOT_ACCEPTABLE);
        }
    }
};
RateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('RATES_REPOSITORY')),
    __metadata("design:paramtypes", [Object])
], RateService);
exports.RateService = RateService;
//# sourceMappingURL=rate.service.js.map