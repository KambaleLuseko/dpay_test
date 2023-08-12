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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const bills_service_1 = require("../bills/bills.service");
const transactions_service_1 = require("../transactions/transactions.service");
let DashboardService = class DashboardService {
    constructor(transServcie, billService) {
        this.transServcie = transServcie;
        this.billService = billService;
    }
    async getAllStats(data) {
        let transactions = await this.transServcie.getStats(data);
        let bills = await this.billService.getStats(data);
        return { transaction: transactions, bill: bills !== null && bills !== void 0 ? bills : {}, weekStats: await this.transServcie.weekStats(data) };
    }
};
DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [transactions_service_1.TransactionsService, bills_service_1.BillsService])
], DashboardService);
exports.DashboardService = DashboardService;
//# sourceMappingURL=dashboard.service.js.map