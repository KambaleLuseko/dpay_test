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
exports.VerificationCodeService = void 0;
const common_1 = require("@nestjs/common");
const uuidGenerator_helper_1 = require("../helpers/uuidGenerator.helper");
const user_service_1 = require("../users/user.service");
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
let VerificationCodeService = class VerificationCodeService {
    constructor(verificationModel, userService) {
        this.verificationModel = verificationModel;
        this.userService = userService;
    }
    async create(data) {
        if (!data.user_uuid) {
            throw new common_1.HttpException('Unable to identify the user for verification code', common_1.HttpStatus.FORBIDDEN);
        }
        let userData = await this.userService.findAll(data.user_uuid);
        if (userData.length != 1) {
            throw new common_1.HttpException('Unable to find the target user', common_1.HttpStatus.FORBIDDEN);
        }
        let checkDuplication = await this.verificationModel.findAll({ where: { user_uuid: data.user_uuid, used: 0, }, raw: true, type: sequelize_1.QueryTypes.SELECT, });
        if (checkDuplication.length > 0) {
            let validCodes = checkDuplication.filter(item => {
                var difference = new Date().getTime() - new Date(item.createdAt).getTime();
                var resultInMinutes = Math.round(difference / 60000);
                return resultInMinutes < 5 ? item : null;
            });
            if (validCodes.length > 0) {
                return validCodes[0];
            }
        }
        data.invalid_at = '10';
        data.used = 0;
        data.uuid = uuidGenerator_helper_1.UuidGenerator.uuidGenerator();
        data.verification_code = this.authCode();
        return await this.verificationModel.create(data);
    }
    findAll() {
        return this.authCode();
    }
    async findOne(uuid) {
        let checkCode = await this.verificationModel.findOne({ where: { [sequelize_2.Op.or]: { uuid: uuid, verification_code: uuid } } });
        if (!checkCode) {
            throw new common_1.HttpException('The submitted code is not found', common_1.HttpStatus.UNAUTHORIZED);
        }
        var difference = new Date().getTime() - new Date(checkCode.createdAt).getTime();
        var resultInMinutes = Math.round(difference / 60000);
        if (resultInMinutes < 5) {
            return checkCode;
        }
        throw new common_1.HttpException('The submitted code is expired', common_1.HttpStatus.UNAUTHORIZED);
    }
    async update(uuid, owner_uuid) {
        let verificationData = await this.verificationModel.findOne({ where: { verification_code: uuid } });
        if (verificationData.user_uuid != owner_uuid) {
            throw new common_1.HttpException("You-re not permitted to complete this action because you're not the initiator", common_1.HttpStatus.UNAUTHORIZED);
        }
        return await this.verificationModel.update({ used: 1, }, { where: { verification_code: uuid } });
    }
    remove(id) {
        return `This action removes a #${id} verificationCode`;
    }
    authCode(length = 8) {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
};
VerificationCodeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('VERIFICATION_REPOSITORY')),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [Object, user_service_1.UserService])
], VerificationCodeService);
exports.VerificationCodeService = VerificationCodeService;
//# sourceMappingURL=verification_code.service.js.map