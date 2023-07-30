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
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
const uuidGenerator_helper_1 = require("../helpers/uuidGenerator.helper");
const payment_methods_service_1 = require("../payment-methods/payment-methods.service");
const transaction_details_service_1 = require("../transaction-details/transaction-details.service");
const user_service_1 = require("../users/user.service");
const bills_service_1 = require("../bills/bills.service");
const notifications_service_1 = require("../notifications/notifications.service");
const axios_1 = require("axios");
const mail_service_1 = require("../mailing/mail/mail.service");
let TransactionsService = class TransactionsService {
    constructor(transactionModel, paymentMethodService, transactionDetailsService, userService, billService, notifService, mailService) {
        this.transactionModel = transactionModel;
        this.paymentMethodService = paymentMethodService;
        this.transactionDetailsService = transactionDetailsService;
        this.userService = userService;
        this.billService = billService;
        this.notifService = notifService;
        this.mailService = mailService;
    }
    async findAll(value) {
        var _a, _b;
        let condition;
        if (value) {
            condition = { [sequelize_1.Op.or]: { uuid: value, sender_uuid: value, receiver_uuid: value, wallet: value, status: value, bill_uuid: value } };
        }
        let result = [];
        let data = await this.transactionModel.findAll({ where: condition, raw: true });
        for (let index = 0; index < data.length; index++) {
            let senderData = await this.userService.findAll(data[index].sender_uuid);
            let receiverData = await this.userService.findAll((_a = data[index].receiver_uuid) !== null && _a !== void 0 ? _a : 'unknown');
            result.push(Object.assign(Object.assign({}, data[index]), { sender: (_b = senderData[0]) !== null && _b !== void 0 ? _b : {}, receiver: receiverData[0] }));
        }
        return result;
    }
    async findOne(value) {
        var _a, _b;
        let condition;
        if (value) {
            condition = { uuid: value };
        }
        let result = [];
        let data = await this.transactionModel.findOne({ where: condition, raw: true });
        if (!data) {
            return [];
        }
        let paymentMetods = await this.paymentMethodService.findAll(data.payment_method_uuid);
        let senderData = await this.userService.findAll(data.sender_uuid);
        let receiverData = await this.userService.findAll((_a = data.receiver_uuid) !== null && _a !== void 0 ? _a : 'unknown');
        let transactDetails = await this.transactionDetailsService.findAll(data.uuid);
        let response = Object.assign(Object.assign({}, data), { sender: (_b = senderData[0]) !== null && _b !== void 0 ? _b : {}, receiver: receiverData[0], payment_method: paymentMetods ? paymentMetods[0] : null, details: transactDetails });
        return response;
    }
    async findBillPayment(value) {
        let condition;
        if (value) {
            condition = { bill_uuid: value };
        }
        let result = [];
        let data = await this.transactionModel.findAll({ where: condition, raw: true });
        if (!data) {
            return [];
        }
        for (let index = 0; index < data.length; index++) {
            let paymentMetods = await this.paymentMethodService.findAll(data[0].payment_method_uuid);
            let transactDetails = await this.transactionDetailsService.findAll(data[0].uuid);
            let response = Object.assign(Object.assign({}, data[index]), { payment_method: paymentMetods ? paymentMetods[0] : null, details: transactDetails });
            result.push(response);
        }
        return result;
    }
    async create(data) {
        var _a, _b, _c, _d, _e, _f;
        if (!data.type || !data.sender_uuid || !data.amount || !data.currency || !data.payment_method_uuid) {
            throw new common_1.HttpException('Invalid data submitted', common_1.HttpStatus.FORBIDDEN);
        }
        if (data.amount == 0) {
            throw new common_1.HttpException('The amount cannot be equal to zero', common_1.HttpStatus.FORBIDDEN);
        }
        if (!data.receiver_uuid && data.type.toString().toLowerCase() != 'recharge') {
            throw new common_1.HttpException('No provider account was found. Please, provide the receiver', common_1.HttpStatus.FORBIDDEN);
        }
        if (!data.status) {
            data.status = 'Validated';
        }
        let uuid = (_a = data.uuid) !== null && _a !== void 0 ? _a : uuidGenerator_helper_1.UuidGenerator.uuidGenerator();
        data.uuid = uuid;
        if (data.bill_uuid) {
        }
        let transData = {
            uuid: uuid,
            type: data.type,
            sender_uuid: data.sender_uuid,
            receiver_uuid: data.receiver_uuid,
            bill_uuid: data.bill_uuid,
            amount: data.amount,
            currency: data.currency,
            description: data.bill_uuid != null ? 'Paiement facture' : data.description,
            payment_method_uuid: data.payment_method_uuid,
            wallet: data.wallet,
            status: data.status,
            refunded: data.refunded,
            shipping: data.shipping,
            made_by: (_b = data.made_by) !== null && _b !== void 0 ? _b : 'Owner',
        };
        if (data.bill_uuid) {
            let billData = await this.billService.findOne(data.bill_uuid, false);
            if (!billData) {
                throw new common_1.HttpException('The targeted bill was not found in the system', common_1.HttpStatus.FORBIDDEN);
            }
            if (billData.status.toString().toLowerCase() == 'canceled') {
                throw new common_1.HttpException('The bill is already canceled. There\'s no way to add payment', common_1.HttpStatus.FORBIDDEN);
            }
            if (billData.status.toString().toLowerCase() == 'closed') {
                throw new common_1.HttpException('The bill is already closed. There\'s no way to add new payment', common_1.HttpStatus.FORBIDDEN);
            }
            let billPayments = await this.transactionModel.findAll({ where: { bill_uuid: data.bill_uuid } });
            let totalPayment;
            totalPayment = billPayments.map(item => parseFloat(item.amount.toString())).reduce((prev, next) => prev + next, 0);
            if (totalPayment == billData.amount_due) {
                throw new common_1.HttpException('The bill was completely paid. There\'s no way to add new payment', common_1.HttpStatus.FORBIDDEN);
            }
            if ((parseFloat((_c = data.amount) !== null && _c !== void 0 ? _c : 0) + totalPayment) > billData.amount_due) {
                throw new common_1.HttpException('The provided amount cannot be added to this bill because is great than the remaining amount', common_1.HttpStatus.FORBIDDEN);
            }
            if (billData.data_model && billData.confirmation_method && billData.confirmation_url) {
                let externalApiResponse = await this.processExternalMerchantPayment(billData.confirmation_url, billData.data_model, billData.confirmation_method);
                if (externalApiResponse.status != 200) {
                    throw new common_1.HttpException('The merchant system cannot complete the request', common_1.HttpStatus.FORBIDDEN);
                }
            }
            if ((parseFloat((_d = data.amount) !== null && _d !== void 0 ? _d : 0) + totalPayment) == billData.amount_due) {
                this.billService.validate(data.bill_uuid);
            }
        }
        let transactResponse = await this.transactionModel.create(transData);
        let bodyDetails = data.details ? data.details[0] : {};
        this.notifService.create({
            from: data.sender_uuid,
            destination: data.receiver_uuid,
            content: data.bill_uuid ? `Un nouveau paiement de la facture ${data.bill_uuid} vient d'être effectué avec un montant de ${data.currency} ${data.amount}. Ref : ${uuid}` : `La transaction de type ${data.type.toLowerCase()} avec un montant de ${data.currency} ${data.amount} a été effectuée avec succès. Ref : ${uuid}`,
            uuid: uuidGenerator_helper_1.UuidGenerator.uuidGenerator(),
            readed: 0
        });
        const detailsData = {
            transaction_uuid: uuid,
            amount: data.amount,
            uuid: uuidGenerator_helper_1.UuidGenerator.uuidGenerator(),
            total_fees_percent: parseFloat(bodyDetails.dp_fees) >= 0 && parseFloat(bodyDetails.provider_fees) >= 0 ? (bodyDetails.dp_fees + bodyDetails.provider_fees) : 0,
            dp_fees: (_e = bodyDetails.dp_fees) !== null && _e !== void 0 ? _e : 0,
            provider_fees: (_f = bodyDetails.provider_fees) !== null && _f !== void 0 ? _f : 0,
            type: 'Validation',
        };
        let transactDetailsResponse = await this.transactionDetailsService.create(detailsData);
        let sender = await this.mailService.getUserData(data.sender_uuid);
        let receiver = await this.mailService.getUserData(data.receiver_uuid);
        if (receiver.email && sender.email) {
            this.mailService.sendPaymentMail(sender, receiver, data, uuidGenerator_helper_1.UuidGenerator.getDisplayDate());
        }
        return { transaction: transactResponse, details: transactDetailsResponse, message: "Data saved successfuly" };
    }
    async externalSystemPayment(data, key) {
        var _a;
        if (!data.merchant_id || !data.amount || !data.currency) {
            throw new common_1.HttpException('Invalid data submitted', common_1.HttpStatus.FORBIDDEN);
        }
        if (data.amount == 0) {
            throw new common_1.HttpException('The amount cannot be equal to zero', common_1.HttpStatus.FORBIDDEN);
        }
        if (!data.confirmation_data || !data.confirmation_method || !data.confirmation_url) {
            throw new common_1.HttpException('The transaction cannot be initiated without confirmation data and URL for merchant payment confirmation', common_1.HttpStatus.FORBIDDEN);
        }
        if (!data.notificationMethod || !data.notificationValue) {
            throw new common_1.HttpException("DailyPay cannot process the payment without notification informations on which we'll send the payment code", common_1.HttpStatus.FORBIDDEN);
        }
        let uuid = uuidGenerator_helper_1.UuidGenerator.uuidGenerator();
        data.uuid = uuid;
        let paymentCode = uuidGenerator_helper_1.UuidGenerator.hexCode();
        let transData = {
            uuid: uuid,
            type: "Paiement",
            sender_uuid: paymentCode,
            receiver_uuid: data.merchant_id,
            amount: data.amount,
            currency: data.currency,
            description: (_a = data.description) !== null && _a !== void 0 ? _a : 'Paiement',
            payment_method_uuid: "Unknown",
            wallet: "Main",
            status: 'Pending',
            made_by: 'Client',
            data_model: JSON.stringify(data.confirmation_data),
            confirmation_url: data.confirmation_url,
            confirmation_method: data.confirmation_method,
            merchant_key: key,
        };
        let transactResponse = await this.transactionModel.create(transData);
        let receiver = { name: data.notificationValue, countryCode: "00243", phone: "000 000 000", email: data.notificationValue };
        let sender = await this.mailService.getUserData(data.merchant_id);
        if (data.notificationMethod.toString().toLowerCase() == 'email') {
            if (receiver.email && sender.email) {
                this.mailService.sendInitiatePaymentMail(sender, receiver, data, paymentCode);
            }
        }
        return { transaction: transactResponse, message: "Data saved successfuly" };
    }
    async ValidateExternalPayment(data) {
        var _a, _b;
        if (!data.amount || !data.currency || !data.payment_method_uuid) {
            throw new common_1.HttpException('Invalid data submitted', common_1.HttpStatus.FORBIDDEN);
        }
        if (data.amount == 0) {
            throw new common_1.HttpException('The amount cannot be equal to zero', common_1.HttpStatus.FORBIDDEN);
        }
        if (!data.paymentCode && !data.sender_uuid) {
            throw new common_1.HttpException("We can't identify the requested resource, please send the identifier", common_1.HttpStatus.BAD_REQUEST);
        }
        let paymentData = await this.transactionModel.findOne({ where: { sender_uuid: data.paymentCode } });
        if (!paymentData) {
            throw new common_1.HttpException("Invalid identifier submitted", common_1.HttpStatus.NOT_FOUND);
        }
        if (parseFloat(paymentData.amount.toString()) > parseFloat(data.amount.toString())) {
            throw new common_1.HttpException("The amount is not valid as sent by the merchant", common_1.HttpStatus.FORBIDDEN);
        }
        if (data.currency != paymentData.currency) {
            throw new common_1.HttpException("The currency must match the value sent by the merchant", common_1.HttpStatus.FORBIDDEN);
        }
        if (!paymentData.data_model || !paymentData.confirmation_method || !paymentData.confirmation_url) {
            throw new common_1.HttpException("We haven't found merchant confirmation data on this transaction for validation", common_1.HttpStatus.NOT_FOUND);
        }
        let externalApiResponse = await this.processExternalMerchantPayment(paymentData.confirmation_url, paymentData.data_model, paymentData.confirmation_method);
        if (externalApiResponse.status != 200) {
            await this.transactionModel.update({ status: "Refund", }, { where: { sender_uuid: (_a = data.paymentCode) !== null && _a !== void 0 ? _a : data.sender_uuid, } });
            throw new common_1.HttpException('The merchant system cannot process the request', common_1.HttpStatus.FORBIDDEN);
        }
        const detailsData = {
            transaction_uuid: paymentData.uuid,
            amount: paymentData.amount,
            uuid: uuidGenerator_helper_1.UuidGenerator.uuidGenerator(),
            total_fees_percent: 0,
            dp_fees: 0,
            provider_fees: 0,
            type: 'Validation',
        };
        let detailsResponse = await this.transactionDetailsService.create(detailsData);
        await this.transactionModel.update({ status: "Validated", payment_method_uuid: data.payment_method_uuid }, { where: { sender_uuid: (_b = data.paymentCode) !== null && _b !== void 0 ? _b : data.sender_uuid, } });
        paymentData.status = "Validated";
        let sender = { name: "Client", countryCode: "00243", phone: "000 000 000", email: "client@dailypaysarl.com" };
        let receiver = await this.mailService.getUserData(paymentData.receiver_uuid);
        if (receiver.email && sender.email) {
            this.mailService.sendPaymentMail(sender, receiver, data, uuidGenerator_helper_1.UuidGenerator.getDisplayDate());
        }
        return { transaction: paymentData, details: detailsResponse, message: "Data saved successfuly" };
    }
    async cancel(uuid) {
        let transData = await this.transactionModel.findAll({ where: { uuid: uuid }, raw: true });
        const detailsData = {
            transaction_uuid: uuid,
            amount: transData[0].amount,
            uuid: uuidGenerator_helper_1.UuidGenerator.uuidGenerator(),
            total_fees_percent: 0,
            dp_fees: 0,
            provider_fees: 0,
            type: 'Cancelation',
        };
        if (!detailsData.amount || detailsData.amount == 0) {
            throw new common_1.HttpException('The amount cannot be null or equal to zero', common_1.HttpStatus.FORBIDDEN);
        }
        await this.transactionModel.update({ status: 'Canceled' }, { where: { uuid: uuid } });
        let transactDetailsResponse = await this.transactionDetailsService.create(detailsData);
        return { details: transactDetailsResponse, message: "Transaction canceled successfuly" };
    }
    async refund(uuid) {
        let transData = await this.transactionModel.findAll({ where: { uuid: uuid }, raw: true });
        const detailsData = {
            transaction_uuid: uuid,
            amount: transData[0].amount,
            uuid: uuidGenerator_helper_1.UuidGenerator.uuidGenerator(),
            total_fees_percent: 3.5,
            dp_fees: 1.5,
            provider_fees: 2,
            type: 'Refunding',
        };
        if (!detailsData.amount || detailsData.amount == 0) {
            throw new common_1.HttpException('The amount cannot be null or equal to zero', common_1.HttpStatus.FORBIDDEN);
        }
        await this.transactionModel.update({ refunded: 'True' }, { where: { uuid: uuid } });
        let transactDetailsResponse = await this.transactionDetailsService.create(detailsData);
        return { details: transactDetailsResponse, message: "Transaction refunded successfuly" };
    }
    async callExternalApi(body, headers, url) {
        const res = await (0, axios_1.default)({
            method: "POST",
            url: url,
            headers: headers
        }).then((data) => {
            console.log(data);
            return data;
        }).catch((error) => {
            console.log(error.message);
            throw new common_1.HttpException('Error occured while calling this service', common_1.HttpStatus.FORBIDDEN);
        });
    }
    async testEAirtelMoney() {
        return await this.callExternalApi({
            "client_id": "b9a2b3b1-6af3-4d99-8efb-7e455609e9be",
            "client_secret": "****************************",
            "grant_type": "client_credentials"
        }, { 'Content-Type': 'application/json', 'Accept': '*/*' }, "https://openapi.airtel.africa/auth/oauth2/token");
    }
    async processExternalMerchantPayment(url, data, method) {
        var _a, _b;
        try {
            let dataModel = JSON.parse(data.replace("\\", ''));
            let modelKeys = Object.keys(dataModel);
            let modelValues = Object.values(dataModel);
            let dataObject = {};
            for (let index = 0; index < modelKeys.length; index++) {
                console.log(modelValues[index]);
                dataObject[`${modelKeys[index]}`] = modelValues[index];
            }
            console.log((dataObject));
            console.log(url);
            console.log(method);
            const res = await (0, axios_1.default)({
                method: (_a = method.toUpperCase()) !== null && _a !== void 0 ? _a : "POST",
                url: url,
                data: (dataObject),
                headers: { 'Content-Type': 'application/json', 'Accept': '*/*' }
            });
            console.log(res.data);
            return { status: res.status, data: res.data, message: "Success" };
        }
        catch (error) {
            console.log((_b = error.message) !== null && _b !== void 0 ? _b : error.toString());
            return { status: 403, data: {}, message: "Error occured while processing the request" };
        }
    }
};
TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('TRANSACTIONS_REPOSITORY')),
    __param(4, (0, common_1.Inject)((0, common_1.forwardRef)(() => bills_service_1.BillsService))),
    __metadata("design:paramtypes", [Object, payment_methods_service_1.PaymentMethodsService,
        transaction_details_service_1.TransactionDetailsService,
        user_service_1.UserService,
        bills_service_1.BillsService,
        notifications_service_1.NotificationsService,
        mail_service_1.MailService])
], TransactionsService);
exports.TransactionsService = TransactionsService;
//# sourceMappingURL=transactions.service.js.map