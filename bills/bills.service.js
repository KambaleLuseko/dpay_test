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
exports.BillsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
const bill_details_service_1 = require("../bill-details/bill-details.service");
const uuidGenerator_helper_1 = require("../helpers/uuidGenerator.helper");
const user_service_1 = require("../users/user.service");
const transactions_service_1 = require("../transactions/transactions.service");
const notifications_service_1 = require("../notifications/notifications.service");
const websockets_gateway_1 = require("../websockets/websockets.gateway");
const activity_services_service_1 = require("../activity_services/activity_services.service");
const mail_service_1 = require("../mailing/mail/mail.service");
let BillsService = class BillsService {
    constructor(billsModel, billDetailsService, userService, transService, notifService, socketGateway, activityServicesService, mailService) {
        this.billsModel = billsModel;
        this.billDetailsService = billDetailsService;
        this.userService = userService;
        this.transService = transService;
        this.notifService = notifService;
        this.socketGateway = socketGateway;
        this.activityServicesService = activityServicesService;
        this.mailService = mailService;
    }
    async create(data) {
        var _a, _b, _c, _d, _e, _f, _g;
        if (!data.amount_due || !data.currency || !data.sender_uuid) {
            throw new common_1.HttpException('Invalid data submitted', common_1.HttpStatus.FORBIDDEN);
        }
        data.uuid = (_a = data.uuid) !== null && _a !== void 0 ? _a : uuidGenerator_helper_1.UuidGenerator.uuidGenerator();
        data.amount_paid = (_b = data.amount_paid) !== null && _b !== void 0 ? _b : 0;
        data.amount_remaining = data.amount_due - ((_c = data.amount_paid) !== null && _c !== void 0 ? _c : 0);
        data.status = (_d = data.status) !== null && _d !== void 0 ? _d : 'Pending';
        data.total_fees_percent = (_e = data.total_fees_percent) !== null && _e !== void 0 ? _e : 0;
        data.dp_fees = (_f = data.dp_fees) !== null && _f !== void 0 ? _f : 0;
        data.provider_fees = (_g = data.provider_fees) !== null && _g !== void 0 ? _g : 0;
        let transactionDetails = data.details;
        if (!transactionDetails || transactionDetails.constructor != Array) {
            throw new common_1.HttpException('Bill details must be an array', common_1.HttpStatus.FORBIDDEN);
        }
        for (let index = 0; index < transactionDetails.length; index++) {
            transactionDetails[index].bill_uuid = data.uuid;
        }
        try {
            this.notifService.create({
                from: data.sender_uuid,
                destination: data.receiver_uuid,
                content: `La facture de USD ${data.amount_due} a été créé avec succès. Ref : ${data.uuid}`,
                uuid: uuidGenerator_helper_1.UuidGenerator.uuidGenerator(),
                readed: 0
            });
            let detailsStatus = await this.billDetailsService.create(transactionDetails);
            if (detailsStatus.status == 200) {
                let sender = await this.mailService.getUserData(data.sender_uuid);
                let receiver = await this.mailService.getUserData(data.client_uuid);
                if (receiver.email && sender.email) {
                    console.log('sender and receiver found');
                    console.log(sender.email);
                    console.log(receiver.email);
                    this.mailService.sendInvocieMail(sender, receiver, data, uuidGenerator_helper_1.UuidGenerator.getDisplayDate());
                }
                return await this.billsModel.create(data);
            }
        }
        catch (error) {
            console.log(JSON.stringify(error.toString()));
            throw new common_1.HttpException("Error occured while saving data", common_1.HttpStatus.FORBIDDEN);
        }
    }
    async cancel(uuid) {
        if (!uuid) {
            throw new common_1.HttpException('Unable to find the requested data', common_1.HttpStatus.FORBIDDEN);
        }
        try {
            return await this.billsModel.update({ status: 'Canceled' }, { where: { uuid: uuid } });
        }
        catch (error) {
            throw new common_1.HttpException("Error occured while saving data", common_1.HttpStatus.FORBIDDEN);
        }
    }
    async validate(uuid) {
        if (!uuid) {
            throw new common_1.HttpException('Unable to find the requested data', common_1.HttpStatus.FORBIDDEN);
        }
        let billData = await this.findOne(uuid);
        if (billData.status.toString().toLowerCase() == 'canceled') {
            throw new common_1.HttpException("The bill was previously canceled and cannot be validated", common_1.HttpStatus.FORBIDDEN);
        }
        try {
            return await this.billsModel.update({ status: 'Closed', amount_paid: billData.amount_due, paid: '1', paidAt: uuidGenerator_helper_1.UuidGenerator.getDate(), end_date: uuidGenerator_helper_1.UuidGenerator.getDate() }, { where: { uuid: uuid } });
        }
        catch (error) {
            throw new common_1.HttpException("Error occured while saving data", common_1.HttpStatus.FORBIDDEN);
        }
    }
    async findAll(value) {
        var _a;
        let condition;
        if (value) {
            condition = { [sequelize_1.Op.or]: { uuid: value, sender_uuid: value, client_uuid: value, status: value } };
        }
        let result = [];
        let data = await this.billsModel.findAll({ where: condition, raw: true });
        for (let index = 0; index < data.length; index++) {
            let senderData = await this.userService.findAll(data[index].sender_uuid);
            let receiverData = await this.userService.findAll(data[index].client_uuid);
            result.push(Object.assign(Object.assign({}, data[index]), { sender: (_a = senderData[0]) !== null && _a !== void 0 ? _a : {}, receiver: receiverData[0] }));
        }
        return result;
    }
    async getStats(data) {
        if (!data.userUUID) {
            throw new common_1.HttpException('You must provide the userUUID to filter data', common_1.HttpStatus.FORBIDDEN);
        }
        let countSentPending = `SELECT COUNT(*) FROM Bills WHERE (sender_uuid=${data.userUUID}) AND status='pending'`;
        let countReceivedPending = `SELECT COUNT(*) FROM Bills WHERE (client_uuid=${data.userUUID}) AND status='pending'`;
        let countValidated = `SELECT COUNT(*) FROM Bills WHERE (sender_uuid=${data.userUUID} OR client_uuid=${data.userUUID}) AND status='closed'`;
        let countRefund = `SELECT COUNT(*) FROM Bills WHERE (sender_uuid=${data.userUUID} OR client_uuid=${data.userUUID}) AND status='refund'`;
        let countCanceled = `SELECT COUNT(*) FROM Bills WHERE (sender_uuid=${data.userUUID} OR client_uuid=${data.userUUID}) AND status='canceled'`;
        let countTotal = `SELECT COUNT(*) FROM Bills WHERE (sender_uuid=${data.userUUID} OR client_uuid=${data.userUUID})`;
        let query = `SELECT (${countSentPending}) AS sentPending, (${countReceivedPending}) as receivedPending, (${countValidated}) as countValidated,(${countRefund}) AS countRefund,(${countCanceled}) as countCanceled, (${countTotal}) as total`;
        let bills = await this.billsModel.sequelize.query(query, { type: sequelize_1.QueryTypes.SELECT });
        return bills[0];
    }
    async findOne(value, details = true) {
        var _a;
        let condition;
        if (value) {
            condition = { uuid: value };
        }
        let data = await this.billsModel.findOne({ where: condition, raw: true });
        if (!data) {
            return null;
        }
        let senderData = details == true ? await this.userService.findAll(data.sender_uuid) : {};
        let receiverData = details == true ? await this.userService.findAll(data.client_uuid) : {};
        let transactDetails = details == true ? await this.billDetailsService.findAll(data.uuid) : {};
        let payments = details == true ? await this.transService.findBillPayment(data.uuid) : {};
        let service = details == true ? await this.activityServicesService.findOne(data.service_uuid) : {};
        let response = Object.assign(Object.assign({}, data), { sender: (_a = senderData[0]) !== null && _a !== void 0 ? _a : {}, receiver: receiverData[0], details: transactDetails, payments: payments, service: service });
        return response;
    }
    async externalSystemBill(data) {
        var _a, _b, _c, _d, _e, _f, _g;
        if (!data.amount_due || !data.currency || !data.merchant_id || !data.confirmation_data || !data.confirmation_url || !data.confirmation_method) {
            throw new common_1.HttpException('Invalid data submitted', common_1.HttpStatus.FORBIDDEN);
        }
        data.uuid = (_a = data.uuid) !== null && _a !== void 0 ? _a : uuidGenerator_helper_1.UuidGenerator.uuidGenerator();
        data.amount_paid = (_b = data.amount_paid) !== null && _b !== void 0 ? _b : 0;
        data.sender_uuid = data.merchant_id;
        data.amount_remaining = data.amount_due - ((_c = data.amount_paid) !== null && _c !== void 0 ? _c : 0);
        data.status = (_d = data.status) !== null && _d !== void 0 ? _d : 'Pending';
        data.total_fees_percent = (_e = data.total_fees_percent) !== null && _e !== void 0 ? _e : 0;
        data.dp_fees = (_f = data.dp_fees) !== null && _f !== void 0 ? _f : 0;
        data.provider_fees = (_g = data.provider_fees) !== null && _g !== void 0 ? _g : 0;
        data.data_model = data.confirmation_data;
        data.confirmation_url = data.confirmation_url;
        data.confirmation_method = data.confirmation_method;
        data.origin = 'External';
        let transactionDetails = data.details;
        if (!transactionDetails || transactionDetails.constructor != Array) {
            throw new common_1.HttpException('Bill details must be an array', common_1.HttpStatus.FORBIDDEN);
        }
        if (!data.data_model || data.data_model.constructor != Object) {
            throw new common_1.HttpException('Bill confirmation data must be a valid JSON object', common_1.HttpStatus.FORBIDDEN);
        }
        data.data_model = (`${JSON.stringify(data.data_model)}`);
        for (let index = 0; index < transactionDetails.length; index++) {
            transactionDetails[index].bill_uuid = data.uuid;
        }
        try {
            this.notifService.create({
                from: data.sender_uuid,
                destination: data.receiver_uuid,
                content: `La facture de USD ${data.amount_due} a été créé avec succès. Ref : ${data.uuid}`,
                uuid: uuidGenerator_helper_1.UuidGenerator.uuidGenerator(),
                readed: 0
            });
            let detailsStatus = await this.billDetailsService.create(transactionDetails);
            if (detailsStatus.status == 200) {
                let sender = this.mailService.getUserData(data.sender_uuid);
                let receiver = this.mailService.getUserData(data.client_uuid);
                if (receiver && sender) {
                    this.mailService.sendInvocieMail(sender, receiver, data, uuidGenerator_helper_1.UuidGenerator.getDisplayDate());
                }
                return await this.billsModel.create(data);
            }
        }
        catch (error) {
            console.log(JSON.stringify(error.toString()));
            throw new common_1.HttpException("Error occured while saving data", common_1.HttpStatus.FORBIDDEN);
        }
    }
};
BillsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('BILLS_REPOSITORY')),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => transactions_service_1.TransactionsService))),
    __metadata("design:paramtypes", [Object, bill_details_service_1.BillDetailsService,
        user_service_1.UserService,
        transactions_service_1.TransactionsService,
        notifications_service_1.NotificationsService,
        websockets_gateway_1.WebsocketsGateway,
        activity_services_service_1.ActivityServicesService,
        mail_service_1.MailService])
], BillsService);
exports.BillsService = BillsService;
//# sourceMappingURL=bills.service.js.map