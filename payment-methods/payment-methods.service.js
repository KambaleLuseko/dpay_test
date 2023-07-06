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
exports.PaymentMethodsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
const gateways_service_1 = require("../gateways/gateways.service");
const uuidGenerator_helper_1 = require("../helpers/uuidGenerator.helper");
let PaymentMethodsService = class PaymentMethodsService {
    constructor(paymentMethodObject, gatewayService) {
        this.paymentMethodObject = paymentMethodObject;
        this.gatewayService = gatewayService;
    }
    async create(data, isSignup = false) {
        if (!data.gateway_uuid || !data.number || !data.user_uuid) {
            throw new common_1.HttpException('Invalid data submitted', common_1.HttpStatus.FORBIDDEN);
        }
        let paymentMethod = {
            uuid: data.uuid || uuidGenerator_helper_1.UuidGenerator.uuidGenerator(),
            user_uuid: data.user_uuid,
            gateway_uuid: data.gateway_uuid,
            number: data.number,
            expirationDate: data.expirationDate,
            cvv: data.cvv,
        };
        if (isSignup == false) {
            if (data.number.toString().toLowerCase() != 'cash') {
                let numberExists = await this.paymentMethodObject.sequelize.query(`SELECT * FROM PaymentMethods WHERE number='${data.number.toString().toLowerCase()}'`, { type: sequelize_1.QueryTypes.SELECT });
                if (numberExists.length > 0) {
                    throw new common_1.HttpException('The entered number is already created', common_1.HttpStatus.FORBIDDEN);
                }
            }
            let paymentMethodExists = await this.paymentMethodObject.findAll({ where: { number: paymentMethod.number, user_uuid: paymentMethod.user_uuid } });
            if (paymentMethodExists.length > 0) {
                throw new common_1.HttpException('The given payment method is already exists', common_1.HttpStatus.FORBIDDEN);
            }
        }
        let uuidExists = await this.paymentMethodObject.findAll({ where: { uuid: paymentMethod.uuid } });
        if (uuidExists.length > 0) {
            throw new common_1.HttpException('The entered identification is already used', common_1.HttpStatus.FORBIDDEN);
        }
        return this.paymentMethodObject.create(paymentMethod);
    }
    async update(data, uuid) {
        if (!data.gateway_uuid || !data.number) {
            throw new common_1.HttpException('Invalid data submitted', common_1.HttpStatus.FORBIDDEN);
        }
        let paymentMethod = {
            number: data.number,
            expirationDate: data.expirationDate,
            gateway_uuid: data.gateway_uuid,
            cvv: data.cvv,
            active: data.active,
        };
        let dataExists = await this.paymentMethodObject.findAll({ where: { number: paymentMethod.number, user_uuid: { [sequelize_1.Op.ne]: data.user_uuid } } });
        if (dataExists.length > 0) {
            throw new common_1.HttpException('The entered number is already used', common_1.HttpStatus.FORBIDDEN);
        }
        return this.paymentMethodObject.update(paymentMethod, { where: { uuid: uuid } });
    }
    async findAll(value) {
        let condition = {};
        if (value) {
            condition = { [sequelize_1.Op.or]: { uuid: value, gateway_uuid: value, user_uuid: value } };
        }
        let result = [];
        let data = await this.paymentMethodObject.findAll({ where: condition, raw: true });
        for (let index = 0; index < data.length; index++) {
            let gateways = await this.gatewayService.find(data[index].gateway_uuid);
            result.push(Object.assign(Object.assign({}, data[index]), { gateway: gateways.data[0] }));
        }
        return result;
    }
};
PaymentMethodsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PAYMENT_METHOD_REPOSITORY')),
    __metadata("design:paramtypes", [Object, gateways_service_1.GatewaysService])
], PaymentMethodsService);
exports.PaymentMethodsService = PaymentMethodsService;
//# sourceMappingURL=payment-methods.service.js.map