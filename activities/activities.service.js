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
exports.ActivitiesService = void 0;
const common_1 = require("@nestjs/common");
const uuidGenerator_helper_1 = require("../helpers/uuidGenerator.helper");
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const activity_services_service_1 = require("../activity_services/activity_services.service");
let ActivitiesService = class ActivitiesService {
    constructor(activityModel, serviceActivity) {
        this.activityModel = activityModel;
        this.serviceActivity = serviceActivity;
    }
    async create(data) {
        var _a;
        if (!data.owner_uuid || !data.name) {
            throw new common_1.HttpException('Invalid data submitted', common_1.HttpStatus.FORBIDDEN);
        }
        let checkDuplication = await this.activityModel.findAll({ where: { name: data.name, owner_uuid: data.owner_uuid }, raw: true, type: sequelize_1.QueryTypes.SELECT });
        if (checkDuplication.length > 0) {
            throw new common_1.HttpException('This activity already exists', common_1.HttpStatus.FORBIDDEN);
        }
        data.uuid = (_a = data.uuid) !== null && _a !== void 0 ? _a : uuidGenerator_helper_1.UuidGenerator.uuidGenerator();
        let services = data.services.length > 0 ? data.services : [];
        if (services.length > 0) {
            services[0].activity_uuid = data.uuid;
            this.serviceActivity.create(services[0]);
        }
        return await this.activityModel.create(data);
    }
    async findAll(value) {
        let condition = {};
        if (value) {
            condition = { [sequelize_2.Op.or]: { owner_uuid: value, name: value } };
        }
        let result = await this.activityModel.findAll({ where: condition, raw: true, type: sequelize_1.QueryTypes.SELECT });
        for (let index = 0; index < result.length; index++) {
            result[index]['services'] = await this.serviceActivity.findAll(result[index].uuid);
        }
        return result;
    }
    async findOne(value) {
        if (!value) {
            return null;
        }
        let result = await this.activityModel.findOne({ where: { [sequelize_2.Op.or]: { uuid: value } }, raw: true, type: sequelize_1.QueryTypes.SELECT });
        result['services'] = await this.serviceActivity.findAll(result.uuid);
        return result;
    }
    async update(uuid, data) {
        if (!uuid) {
            throw new common_1.HttpException('Unable to find requested data', common_1.HttpStatus.FORBIDDEN);
        }
        if (!data) {
            throw new common_1.HttpException('Invalid data submitted', common_1.HttpStatus.FORBIDDEN);
        }
        let checkDuplication = await this.activityModel.findAll({ where: { name: data.name, owner_uuid: data.owner_uuid, uuid: { [sequelize_2.Op.ne]: uuid } }, raw: true, type: sequelize_1.QueryTypes.SELECT });
        if (checkDuplication.length > 0) {
            throw new common_1.HttpException('This activity already exists', common_1.HttpStatus.FORBIDDEN);
        }
        return this.activityModel.update(data, { where: { uuid: uuid } });
    }
};
ActivitiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ACTIVITY_REPOSITORY')),
    __metadata("design:paramtypes", [Object, activity_services_service_1.ActivityServicesService])
], ActivitiesService);
exports.ActivitiesService = ActivitiesService;
//# sourceMappingURL=activities.service.js.map