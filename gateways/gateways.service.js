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
exports.GatewaysService = exports.GatewaysDetailsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
const uuidGenerator_helper_1 = require("../helpers/uuidGenerator.helper");
let GatewaysDetailsService = class GatewaysDetailsService {
    constructor(gatewayDetailsModel) {
        this.gatewayDetailsModel = gatewayDetailsModel;
    }
    async find(value) {
        let condition = {};
        if (value) {
            condition = { gateway_uuid: value, active: 1 };
        }
        return await this.gatewayDetailsModel.findAll({ where: condition });
    }
    async viewAll() {
        return await this.gatewayDetailsModel.findAll({});
    }
    async create(data) {
        if (!data) {
            throw new common_1.HttpException('Missing some gateway data', common_1.HttpStatus.BAD_REQUEST);
        }
        let gatewayDetailsUUID = data.uuid || uuidGenerator_helper_1.UuidGenerator.uuidGenerator();
        let gatewayDetails = {
            uuid: gatewayDetailsUUID,
            gateway_uuid: data.gateway_uuid,
            url: data.url,
            private_api_key: data.private_api_key,
            public_api_key: data.public_api_key,
            url_test: data.url_test,
            test_private_api_key: data.test_private_api_key,
            test_public_api_key: data.test_public_api_key,
        };
        return await this.gatewayDetailsModel.create(gatewayDetails);
    }
};
GatewaysDetailsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('GATEWAYS_DETAILS_REPOSITORY')),
    __metadata("design:paramtypes", [Object])
], GatewaysDetailsService);
exports.GatewaysDetailsService = GatewaysDetailsService;
let GatewaysService = class GatewaysService {
    constructor(gateWayModel, gatewayDetailsService) {
        this.gateWayModel = gateWayModel;
        this.gatewayDetailsService = gatewayDetailsService;
        this.create({
            "gateway": {
                "uuid": "00000000000000",
                "name": "Cash",
                "description": "Cash payment method",
                "image_url": null,
                "active": "1"
            },
            "gatewayDetails": {
                "url": "https",
                "private_api_key": "Unknown",
                "public_api_key": "Unknown",
                "url_test": "https",
                "test_private_api_key": "Unknown",
                "test_public_api_key": "Unknown"
            }
        }, true);
    }
    async find(value) {
        let condition = {};
        if (value) {
            condition = { [sequelize_1.Op.or]: { uuid: value, name: { [sequelize_1.Op.like]: `%${value}%` }, description: { [sequelize_1.Op.like]: `%${value}%` } } };
        }
        let resultset = [];
        let gateways = await this.gateWayModel.findAll({ where: condition, raw: true });
        for (let index = 0; index < gateways.length; index++) {
            resultset.push(Object.assign(Object.assign({}, gateways[index]), { details: await this.gatewayDetailsService.find(gateways[index].uuid) }));
        }
        return { data: resultset };
    }
    async findForSale(value) {
        let condition = {};
        if (value) {
            condition = { [sequelize_1.Op.or]: { uuid: value } };
        }
        let resultset = [];
        let gateways = await this.gateWayModel.findAll({ where: condition, raw: true });
        for (let index = 0; index < gateways.length; index++) {
            resultset.push(Object.assign(Object.assign({}, gateways[index]), { details: await this.gatewayDetailsService.find(gateways[index].uuid) }));
        }
        return { data: resultset };
    }
    async create(data, isPrimaryGateway) {
        var _a, _b, _c, _d, _e, _f, _g;
        if (!data.gateway) {
            throw new common_1.HttpException('Missing some gateway data', common_1.HttpStatus.BAD_REQUEST);
        }
        if (!data.gatewayDetails) {
            throw new common_1.HttpException('Missing some gateway details data', common_1.HttpStatus.BAD_REQUEST);
        }
        let checkDuplication = await this.gateWayModel.sequelize.query(`SELECT * FROM Gateways WHERE name='${data.gateway.name.toString().toLowerCase()}' OR uuid='${(_a = data.gateway.uuid) !== null && _a !== void 0 ? _a : ""}'`, { raw: true, type: sequelize_1.QueryTypes.SELECT });
        if (checkDuplication.length >= 1) {
            if (isPrimaryGateway == true)
                return;
            else
                throw new common_1.HttpException('This gateway name or its unique identification already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        let gatewayUUID = data.gateway.uuid || uuidGenerator_helper_1.UuidGenerator.uuidGenerator();
        let gateway = {
            uuid: gatewayUUID,
            name: data.gateway.name,
            description: data.gateway.description,
            image_url: "https",
        };
        let gatewayDetailsUUID = data.gateway.uuid || uuidGenerator_helper_1.UuidGenerator.uuidGenerator();
        let gatewayDetails = {
            uuid: gatewayDetailsUUID,
            gateway_uuid: gatewayUUID,
            url: (_b = data.gatewayDetails.url) !== null && _b !== void 0 ? _b : "https",
            private_api_key: (_c = data.gatewayDetails.private_api_key) !== null && _c !== void 0 ? _c : `sk_prod_${Buffer.from(Date.now().toString()).toString('hex')}`,
            public_api_key: (_d = data.gatewayDetails.public_api_key) !== null && _d !== void 0 ? _d : `pk_prod_${Buffer.from((Math.random() + 1).toString(36).substring(2)).toString('hex')}`,
            url_test: (_e = data.gatewayDetails.url_test) !== null && _e !== void 0 ? _e : "https",
            test_private_api_key: (_f = data.gatewayDetails.test_private_api_key) !== null && _f !== void 0 ? _f : `sk_test_${Buffer.from(Date.now().toString()).toString('hex')}`,
            test_public_api_key: (_g = data.gatewayDetails.test_public_api_key) !== null && _g !== void 0 ? _g : `sk_test_${Buffer.from((Math.random() + 1).toString(36).substring(2)).toString('hex')}`,
        };
        try {
            let gatewayResponse = await this.gateWayModel.create(gateway);
            let gatewayDetailsResponse = await this.gatewayDetailsService.create(gatewayDetails);
            return { gateway: gatewayResponse, gatewayDetails: gatewayDetailsResponse };
        }
        catch (error) {
            console.log(error.message);
            throw new common_1.HttpException('Something went wrong while saving data', common_1.HttpStatus.NOT_ACCEPTABLE);
        }
    }
};
GatewaysService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('GATEWAYS_REPOSITORY')),
    __metadata("design:paramtypes", [Object, GatewaysDetailsService])
], GatewaysService);
exports.GatewaysService = GatewaysService;
//# sourceMappingURL=gateways.service.js.map