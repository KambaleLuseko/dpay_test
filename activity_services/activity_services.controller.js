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
exports.ActivityServicesController = void 0;
const common_1 = require("@nestjs/common");
const activity_services_service_1 = require("./activity_services.service");
const create_activity_service_dto_1 = require("./dto/create-activity_service.dto");
let ActivityServicesController = class ActivityServicesController {
    constructor(activityServicesService) {
        this.activityServicesService = activityServicesService;
    }
    create(createActivityServiceDto) {
        return this.activityServicesService.create(createActivityServiceDto);
    }
    async findAll(params) {
        return { data: await this.activityServicesService.findAll(params.value) };
    }
    async findOne(id) {
        var _a;
        return { data: (_a = await this.activityServicesService.findOne(id)) !== null && _a !== void 0 ? _a : {} };
    }
    update(uuid, data) {
        return this.activityServicesService.update(uuid, data);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_activity_service_dto_1.CreateActivityServiceDto]),
    __metadata("design:returntype", void 0)
], ActivityServicesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':value?'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ActivityServicesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/find-one/:uuid'),
    __param(0, (0, common_1.Param)('uuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ActivityServicesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':uuid'),
    __param(0, (0, common_1.Param)('uuid')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_activity_service_dto_1.CreateActivityServiceDto]),
    __metadata("design:returntype", void 0)
], ActivityServicesController.prototype, "update", null);
ActivityServicesController = __decorate([
    (0, common_1.Controller)('activity-services'),
    __metadata("design:paramtypes", [activity_services_service_1.ActivityServicesService])
], ActivityServicesController);
exports.ActivityServicesController = ActivityServicesController;
//# sourceMappingURL=activity_services.controller.js.map