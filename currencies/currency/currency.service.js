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
exports.CurrencyService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
const uuidGenerator_helper_1 = require("../../helpers/uuidGenerator.helper");
const rate_service_1 = require("../rate/rate.service");
let CurrencyService = class CurrencyService {
    constructor(currencyModel, rateService) {
        this.currencyModel = currencyModel;
        this.rateService = rateService;
    }
    async findAll(value) {
        let condition = {};
        if (value) {
            condition = { [sequelize_1.Op.or]: { uuid: value, name: value, description: { [sequelize_1.Op.like]: `%${value}%` } } };
        }
        let data = await this.currencyModel.findAll({ where: condition, raw: true });
        let results = [];
        for (let index = 0; index < data.length; index++) {
            results.push(Object.assign(Object.assign({}, data[index]), { rates: (await this.rateService.find(data[index].uuid)).data }));
        }
        return { data: results };
    }
    async findAllRates(value) {
        let condition = {};
        if (value) {
            condition = { [sequelize_1.Op.or]: { uuid: value, name: value, description: { [sequelize_1.Op.like]: `%${value}%` } } };
        }
        let data = await this.currencyModel.findAll({ where: condition, raw: true });
        let results = [];
        for (let index = 0; index < data.length; index++) {
            results.push(Object.assign(Object.assign({}, data[index]), { rates: (await this.rateService.findAll(data[index].uuid)).data }));
        }
        return { data: results };
    }
    async create(data) {
        try {
            let uuid = uuidGenerator_helper_1.UuidGenerator.uuidGenerator();
            if (!data.currency) {
                throw new common_1.HttpException('Invalid data submitted', common_1.HttpStatus.BAD_REQUEST);
                return;
            }
            let currency = {
                uuid: data.currency.uuid || uuid,
                name: data.currency.name,
                description: data.currency.description
            };
            if (!currency.name) {
                throw new common_1.HttpException('Invalid data submitted', common_1.HttpStatus.BAD_REQUEST);
                return;
            }
            let savedCurrency = await this.currencyModel.create(currency);
            let savedRate = {};
            if (data.rate && data.rate.constructor === Object) {
                let rate = {
                    uuid: data.rate.uuid || uuidGenerator_helper_1.UuidGenerator.uuidGenerator(),
                    currency_uuid: uuid,
                    from_usd_rate: data.rate.from_usd_rate,
                    to_usd_rate: data.rate.to_usd_rate,
                };
                savedRate = await this.rateService.create(rate);
            }
            return { data: { currency: savedCurrency, rate: savedRate } };
        }
        catch (error) {
            console.log(error.message);
            throw new common_1.HttpException('Error occured while saving data', common_1.HttpStatus.NOT_ACCEPTABLE);
        }
    }
};
CurrencyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('CURRENCY_REPOSITORY')),
    __metadata("design:paramtypes", [Object, rate_service_1.RateService])
], CurrencyService);
exports.CurrencyService = CurrencyService;
//# sourceMappingURL=currency.service.js.map