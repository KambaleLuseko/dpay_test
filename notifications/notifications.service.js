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
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const uuidGenerator_helper_1 = require("../helpers/uuidGenerator.helper");
const websockets_gateway_1 = require("../websockets/websockets.gateway");
let NotificationsService = class NotificationsService {
    constructor(notificationModel, socketGateway) {
        this.notificationModel = notificationModel;
        this.socketGateway = socketGateway;
    }
    async create(data) {
        var _a;
        if (!data.from || !data.content) {
            throw new common_1.HttpException('Invalid data submitted', common_1.HttpStatus.FORBIDDEN);
        }
        data.uuid = (_a = data.uuid) !== null && _a !== void 0 ? _a : uuidGenerator_helper_1.UuidGenerator.uuidGenerator();
        try {
            let savedData = await this.notificationModel.create(data);
            this.socketGateway.io.emit('notification', data);
            return { status: 200, data: savedData, message: "success" };
        }
        catch (error) {
            throw new common_1.HttpException('Error occured while saving data', common_1.HttpStatus.FORBIDDEN);
        }
    }
    async findAll(value) {
        let condition = {};
        if (value) {
            condition = { from: value, destination: value };
        }
        console.log(condition);
        let result = await this.notificationModel.findAll({});
        return { data: result };
    }
};
NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('NOTIFICATIONS_REPOSITORY')),
    __metadata("design:paramtypes", [Object, websockets_gateway_1.WebsocketsGateway])
], NotificationsService);
exports.NotificationsService = NotificationsService;
//# sourceMappingURL=notifications.service.js.map