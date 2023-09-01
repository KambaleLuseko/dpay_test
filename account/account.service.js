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
exports.AccountService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
const account_details_service_1 = require("../account-details/account-details.service");
const jwt_helper_1 = require("../helpers/jwt.helper");
const uuidGenerator_helper_1 = require("../helpers/uuidGenerator.helper");
let AccountService = class AccountService {
    constructor(accountModel, accountDetailService) {
        this.accountModel = accountModel;
        this.accountDetailService = accountDetailService;
    }
    async findAll(value) {
        let condition = {};
        if (value) {
            condition = { [sequelize_1.Op.or]: { uuid: value, client_uuid: value, verificationStatus: value, active: value } };
        }
        let resultSet = [];
        let data = await this.accountModel.findAll({ where: condition, raw: true });
        for (let index = 0; index < data.length; index++) {
            resultSet.push(Object.assign(Object.assign({}, data[index]), { details: await this.accountDetailService.findAll(data[index].uuid) }));
        }
        return resultSet;
    }
    async create(data) {
        if (!data) {
            throw new common_1.HttpException('No Data submitted', common_1.HttpStatus.BAD_REQUEST);
        }
        if (!data.client_uuid || !data.fullname || !data.phone) {
            throw new common_1.HttpException('Invalid Data submitted', common_1.HttpStatus.BAD_REQUEST);
        }
        let uuid = data.uuid || uuidGenerator_helper_1.UuidGenerator.uuidGenerator();
        let account = {
            uuid: uuid,
            client_uuid: data.client_uuid,
            fullname: data.fullname,
            phone: data.phone,
            address: data.address || '',
            city: data.city,
            postalCode: data.postalCode,
        };
        var date = new Date();
        date.setDate(date.getDate() + 30);
        let accountDetails = [
            {
                account_uuid: uuid,
                uuid: uuidGenerator_helper_1.UuidGenerator.uuidGenerator(),
                mode: 'Test',
                key: `test_key_${Buffer.from(await jwt_helper_1.JWTHelper.generateToken({ phone: data.phone, type: 'TestKey', expiration: null })).toString('hex')}`,
                storeKey: `test_storeKey_${Buffer.from(await jwt_helper_1.JWTHelper.generateToken({ phone: data.phone, type: 'TestStoreKey', expiration: null })).toString('hex')}`,
                start_date: uuidGenerator_helper_1.UuidGenerator.getDate(),
                end_date: date.toString()
            },
            {
                account_uuid: uuid,
                uuid: uuidGenerator_helper_1.UuidGenerator.uuidGenerator(),
                mode: 'Live',
                key: `like_key_${Buffer.from(await jwt_helper_1.JWTHelper.generateToken({ phone: data.phone, type: 'LiveKey', expiration: null })).toString('hex')}`,
                storeKey: `live_storeKey_${Buffer.from(await jwt_helper_1.JWTHelper.generateToken({ phone: data.phone, type: 'LiveStoreKey', expiration: null })).toString('hex')}`,
                start_date: uuidGenerator_helper_1.UuidGenerator.getDate(),
                end_date: uuidGenerator_helper_1.UuidGenerator.getDate(),
            }
        ];
        let savedAccount = await this.accountModel.create(account);
        let savedDetails = await this.accountDetailService.createMultiple(accountDetails);
        return { account: savedAccount, accountDetails: savedDetails };
    }
};
AccountService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ACCOUNTS_REPOSITORY')),
    __metadata("design:paramtypes", [Object, account_details_service_1.AccountDetailsService])
], AccountService);
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map