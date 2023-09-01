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
exports.AccountDetailsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
const jwt_helper_1 = require("../helpers/jwt.helper");
const uuidGenerator_helper_1 = require("../helpers/uuidGenerator.helper");
let AccountDetailsService = class AccountDetailsService {
    constructor(accountDetailsModel) {
        this.accountDetailsModel = accountDetailsModel;
    }
    async findAll(value) {
        let condition = {};
        if (value) {
            condition = { [sequelize_1.Op.or]: { uuid: value, account_uuid: value, key: value } };
        }
        let data = await this.accountDetailsModel.findAll({ where: condition, raw: true });
        return data;
    }
    async create(data) {
        var _a;
        if (!data.account_uuid || !data.mode) {
            throw new common_1.HttpException('Invalid Data submitted', common_1.HttpStatus.BAD_REQUEST);
        }
        let accountDetails = {
            account_uuid: data.account_uuid,
            uuid: uuidGenerator_helper_1.UuidGenerator.uuidGenerator(),
            mode: data.mode,
            key: `${data.mode.toString().toLowerCase()}_key_${Buffer.from(await jwt_helper_1.JWTHelper.generateToken({ phone: data.phone, type: `${data.mode.toString().toLowerCase()}Key`, expiration: null })).toString('hex')}`,
            storeKey: `${data.mode.toString().toLowerCase()}_storeKey_${Buffer.from(await jwt_helper_1.JWTHelper.generateToken({ phone: data.phone, type: `${data.mode.toString().toLowerCase()}StoreKey`, expiration: null })).toString('hex')}`,
            start_date: (_a = data.start_date) !== null && _a !== void 0 ? _a : uuidGenerator_helper_1.UuidGenerator.getDate(),
            end_date: data.end_date,
        };
        return await this.accountDetailsModel.create(accountDetails);
    }
    async createMultiple(data) {
        let dataErrors = false;
        let dataToSave = [];
        for (let index = 0; index < data.length; index++) {
            if (!data[index].account_uuid || !data[index].mode) {
                dataErrors = true;
                continue;
            }
            dataToSave.push({
                account_uuid: data[index].account_uuid,
                uuid: `${uuidGenerator_helper_1.UuidGenerator.uuidGenerator()}#${index}`,
                mode: data[index].mode,
                key: `${data[index].mode.toString().toLowerCase()}_key_${Buffer.from(await jwt_helper_1.JWTHelper.generateToken({ phone: data[index].phone, type: `${data[index].mode.toString().toLowerCase()}Key`, expiration: null })).toString('hex')}`,
                storeKey: `${data[index].mode.toString().toLowerCase()}_storeKey_${Buffer.from(await jwt_helper_1.JWTHelper.generateToken({ phone: data[index].phone, type: `${data[index].mode.toString().toLowerCase()}StoreKey`, expiration: null })).toString('hex')}`,
                start_date: data[index].start_date,
                end_date: data[index].end_date,
            });
        }
        return await this.accountDetailsModel.bulkCreate(dataToSave);
    }
};
AccountDetailsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ACCOUNT_DETAILS_REPOSITORY')),
    __metadata("design:paramtypes", [Object])
], AccountDetailsService);
exports.AccountDetailsService = AccountDetailsService;
//# sourceMappingURL=account-details.service.js.map