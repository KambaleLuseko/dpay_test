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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let UserModel = class UserModel extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(),
        allowNull: false,
        unique: true
    }),
    __metadata("design:type", String)
], UserModel.prototype, "uuid", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(),
        allowNull: false,
    }),
    __metadata("design:type", String)
], UserModel.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(),
        allowNull: false,
    }),
    __metadata("design:type", String)
], UserModel.prototype, "countryCode", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(),
        allowNull: false,
    }),
    __metadata("design:type", String)
], UserModel.prototype, "phone", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(),
        allowNull: true,
    }),
    __metadata("design:type", String)
], UserModel.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(),
        allowNull: true,
    }),
    __metadata("design:type", String)
], UserModel.prototype, "type", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(),
        allowNull: true,
    }),
    __metadata("design:type", String)
], UserModel.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(),
        allowNull: true,
    }),
    __metadata("design:type", String)
], UserModel.prototype, "verificationMode", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER(),
        allowNull: true,
        defaultValue: 0
    }),
    __metadata("design:type", Number)
], UserModel.prototype, "active", void 0);
UserModel = __decorate([
    sequelize_typescript_1.Table
], UserModel);
exports.UserModel = UserModel;
//# sourceMappingURL=user.model.js.map