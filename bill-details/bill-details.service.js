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
exports.BillDetailsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
const uuidGenerator_helper_1 = require("../helpers/uuidGenerator.helper");
let BillDetailsService = class BillDetailsService {
    constructor(billDetailsModel) {
        this.billDetailsModel = billDetailsModel;
    }
    async create(data) {
        var _a;
        let hasInvalidData = false;
        if (data.constructor != Array) {
            throw new common_1.HttpException('Data to save must be an array', common_1.HttpStatus.FORBIDDEN);
        }
        for (let index = 0; index < data.length; index++) {
            if (!data[index].bill_uuid || !data[index].amount || data[index].amount.toString() == '0' || !data[index].description || !data[index].quantity || !data[index].type) {
                hasInvalidData = true;
            }
            else {
                data[index].uuid = (_a = data[index].uuid) !== null && _a !== void 0 ? _a : `${uuidGenerator_helper_1.UuidGenerator.uuidGenerator() + index.toString()}`;
            }
        }
        if (hasInvalidData == true) {
            throw new common_1.HttpException('Some submitted data is invalid', common_1.HttpStatus.FORBIDDEN);
        }
        try {
            await this.billDetailsModel.bulkCreate(data);
            return { message: 'Data saved successfuly', status: 200 };
        }
        catch (error) {
            console.log(error.message);
            return { message: 'Error occured', status: 500 };
        }
    }
    async findAll(value) {
        let condition;
        if (value) {
            condition = { [sequelize_1.Op.or]: { uuid: value, bill_uuid: value, product_uuid: value } };
        }
        return await this.billDetailsModel.findAll({ where: condition });
    }
    async update(data, uuid) {
        if (!data.bill_uuid || !data.amount || data.amount.toString() == '0' || !data.description || !data.quantity || !data.type) {
            throw new common_1.HttpException('Some submitted data is invalid', common_1.HttpStatus.FORBIDDEN);
        }
        if (!uuid) {
            throw new common_1.HttpException('We are unable to find the specified data', common_1.HttpStatus.FORBIDDEN);
        }
        try {
            await this.billDetailsModel.update(data, { where: { uuid: uuid } });
            return { message: 'Data updated successfuly', status: 200 };
        }
        catch (error) {
            return { message: 'Error occured', status: 500 };
        }
    }
    async delete(uuid) {
        if (!uuid) {
            throw new common_1.HttpException('We are unable to find the specified data', common_1.HttpStatus.FORBIDDEN);
        }
        try {
            await this.billDetailsModel.destroy({ where: { uuid: uuid } });
            return { message: 'Data deleted successfuly', status: 200 };
        }
        catch (error) {
            return { message: 'Error occured', status: 500 };
        }
    }
};
BillDetailsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('BILL_DETAILS_REPOSITORY')),
    __metadata("design:paramtypes", [Object])
], BillDetailsService);
exports.BillDetailsService = BillDetailsService;
//# sourceMappingURL=bill-details.service.js.map