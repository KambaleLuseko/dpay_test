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
exports.ActivityServicesService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const uuidGenerator_helper_1 = require("../helpers/uuidGenerator.helper");
let ActivityServicesService = class ActivityServicesService {
    constructor(activityServiceModel) {
        this.activityServiceModel = activityServiceModel;
    }
    async create(data) {
        var _a;
        if (!data.activity_uuid || !data.name) {
            throw new common_1.HttpException('Invalid data submitted', common_1.HttpStatus.FORBIDDEN);
        }
        let checkDuplication = await this.activityServiceModel.findAll({ where: { name: data.name, activity_uuid: data.activity_uuid }, raw: true, type: sequelize_1.QueryTypes.SELECT });
        if (checkDuplication.length > 0) {
            throw new common_1.HttpException('This service already exists on the specified activity', common_1.HttpStatus.FORBIDDEN);
        }
        data.uuid = (_a = data.uuid) !== null && _a !== void 0 ? _a : uuidGenerator_helper_1.UuidGenerator.uuidGenerator();
        return await this.activityServiceModel.create(data);
    }
    async findAll(value) {
        let condition = {};
        if (value) {
            condition = { activity_uuid: value, name: value, };
        }
        let result = await this.activityServiceModel.findAll({ where: { [sequelize_2.Op.or]: condition }, raw: true, type: sequelize_1.QueryTypes.SELECT });
        return result;
    }
    async findOne(uuid) {
        if (!uuid)
            return null;
        return await this.activityServiceModel.findOne({ where: { uuid: uuid } });
    }
    async update(uuid, data) {
        if (!uuid) {
            throw new common_1.HttpException('Unable to find requested data', common_1.HttpStatus.FORBIDDEN);
        }
        if (!data) {
            throw new common_1.HttpException('Invalid data submitted', common_1.HttpStatus.FORBIDDEN);
        }
        let checkDuplication = await this.activityServiceModel.findAll({ where: { name: data.name, activity_uuid: data.activity_uuid, uuid: { [sequelize_2.Op.ne]: uuid } }, raw: true, type: sequelize_1.QueryTypes.SELECT });
        if (checkDuplication.length > 0) {
            throw new common_1.HttpException('This service already exists on the specified activity', common_1.HttpStatus.FORBIDDEN);
        }
        return await this.activityServiceModel.update(data, { where: { uuid: uuid } });
    }
};
ActivityServicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ACTIVITY_SERVICE_REPOSITORY')),
    __metadata("design:paramtypes", [Object])
], ActivityServicesService);
exports.ActivityServicesService = ActivityServicesService;
//# sourceMappingURL=activity_services.service.js.map