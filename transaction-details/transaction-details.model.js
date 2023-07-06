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
exports.TransactionDetails = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let TransactionDetails = class TransactionDetails extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: true
    }),
    __metadata("design:type", String)
], TransactionDetails.prototype, "uuid", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], TransactionDetails.prototype, "transaction_uuid", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(13, 4),
        allowNull: false,
    }),
    __metadata("design:type", Number)
], TransactionDetails.prototype, "amount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(13, 4),
        allowNull: true,
        defaultValue: 0
    }),
    __metadata("design:type", Number)
], TransactionDetails.prototype, "total_fees_percent", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(13, 4),
        allowNull: true,
        defaultValue: 0
    }),
    __metadata("design:type", Number)
], TransactionDetails.prototype, "dp_fees", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(13, 4),
        allowNull: true,
        defaultValue: 0
    }),
    __metadata("design:type", Number)
], TransactionDetails.prototype, "provider_fees", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
        defaultValue: 'Validation'
    }),
    __metadata("design:type", String)
], TransactionDetails.prototype, "type", void 0);
TransactionDetails = __decorate([
    sequelize_typescript_1.Table
], TransactionDetails);
exports.TransactionDetails = TransactionDetails;
//# sourceMappingURL=transaction-details.model.js.map