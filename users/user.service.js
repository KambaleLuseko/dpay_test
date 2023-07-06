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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
const uuidGenerator_helper_1 = require("../helpers/uuidGenerator.helper");
const wallet_service_1 = require("../wallets/wallet.service");
const wallet_dto_1 = require("../wallets/wallet.dto");
const jwt_helper_1 = require("../helpers/jwt.helper");
const mail_service_1 = require("../mailing/mail/mail.service");
const account_service_1 = require("../account/account.service");
const payment_methods_service_1 = require("../payment-methods/payment-methods.service");
const verification_code_service_1 = require("../verification_code/verification_code.service");
let UserService = class UserService {
    constructor(userModel, walletService, mailService, accountService, paymentMethodService, verifService) {
        this.userModel = userModel;
        this.walletService = walletService;
        this.mailService = mailService;
        this.accountService = accountService;
        this.paymentMethodService = paymentMethodService;
        this.verifService = verifService;
        this.create({
            uuid: "00000000000000",
            name: "Client anonyme",
            phone: "000 000 000",
            countryCode: "+0",
            email: "walkincustomer@dpay.com",
            type: "Client",
            password: uuidGenerator_helper_1.UuidGenerator.uuidGenerator(),
            verificationMode: 'email',
            active: 1
        }, true);
    }
    async findAll(value, details) {
        let condition = {};
        if (value) {
            condition = { [sequelize_1.Op.or]: { uuid: value, name: value, email: value, phone: value } };
        }
        let results = [];
        let data = await this.userModel.findAll({ where: condition, raw: true });
        for (let index = 0; index < data.length; index++) {
            delete data[index]['password'];
            results.push(Object.assign(Object.assign({}, data[index]), { wallets: details == 'true' ? await this.walletService.findAll(data[index].uuid) : [], accounts: details == 'true' ? await this.accountService.findAll(data[index].uuid) : [], paymentMethods: details == 'true' ? await this.paymentMethodService.findAll(data[index].uuid) : [] }));
        }
        return results;
    }
    async create(data, isDefaultClient = false) {
        if (!data.name || !data.phone || !data.verificationMode || !data.countryCode) {
            throw new common_1.BadRequestException();
        }
        if (data.email && data.email.indexOf('@') == -1) {
            if (isDefaultClient == true)
                return;
            throw new common_1.HttpException('The entered email is invalid', common_1.HttpStatus.FORBIDDEN);
        }
        let exists = await this.userModel.findAll({ where: { [sequelize_1.Op.or]: { phone: data.phone, email: data.email } } });
        if (exists.length > 0) {
            if (isDefaultClient == true)
                return;
            throw new common_1.HttpException('Phone number or email used', common_1.HttpStatus.FORBIDDEN);
        }
        let uuid = data.uuid || uuidGenerator_helper_1.UuidGenerator.uuidGenerator();
        data.uuid = uuid;
        data.password = data.password || uuidGenerator_helper_1.UuidGenerator.uuidGenerator();
        data.phone = data.phone.replace(' ', '');
        let savedUser = await this.userModel.create(data);
        let wallet = new wallet_dto_1.WalletCreationDTO();
        wallet.owner_uuid = uuid;
        wallet.balance = 0;
        wallet.currency = 'USD';
        wallet.active = 'Active';
        wallet.uuid = uuidGenerator_helper_1.UuidGenerator.uuidGenerator();
        let userWallet = await this.walletService.create(wallet);
        this.paymentMethodService.create({
            "user_uuid": uuid,
            "gateway_uuid": "00000000000000",
            "number": "CASH",
            "expirationDate": "",
            "cvv": "",
            "active": 1
        }, true);
        if (isDefaultClient == false && data.email) {
            this.mailService.sendWelcomeMail(data);
            let generatedCode = await this.verifService.create({ user_uuid: uuid, used: 0, invalid_at: '5', verification_code: '' });
            this.mailService.sendConfirmMail(data, generatedCode.verification_code);
        }
        return { user: savedUser, wallet: userWallet };
    }
    async forgotPassword(data) {
        if (!data || !data.email) {
            throw new common_1.HttpException('Invalid data submitted', common_1.HttpStatus.BAD_REQUEST);
        }
        let userExists = await this.findAll(data.email);
        if (!userExists || userExists.length != 1) {
            throw new common_1.HttpException("We don't find the user in the system", common_1.HttpStatus.FORBIDDEN);
        }
        let generatedCode = await this.verifService.create({ user_uuid: userExists[0].uuid, used: 0, invalid_at: '', verification_code: '' });
        this.mailService.sendResetMail(userExists[0], generatedCode.verification_code);
        return { message: 'An email with a verification code was sent to you', name: data.email || data.phone };
    }
    async resetPassword(data) {
        if (!data || !data.email || !data.code) {
            throw new common_1.HttpException('Invalid data submitted', common_1.HttpStatus.BAD_REQUEST);
        }
        let generatedCode = await this.verifService.findOne(data.code);
        if (!generatedCode.verification_code) {
            throw new common_1.HttpException("You're not authorized to perform this action", common_1.HttpStatus.FORBIDDEN);
        }
        if (!data.password) {
            throw new common_1.HttpException('No password supplied', common_1.HttpStatus.FORBIDDEN);
        }
        let userData = await this.userModel.findOne({ where: { email: data.email } });
        if (!userData) {
            throw new common_1.HttpException("We are unable to find the user's data", common_1.HttpStatus.NOT_FOUND);
        }
        let updatedData = await this.userModel.update({ password: data.password }, { where: { uuid: userData.uuid } });
        this.verifService.update(data.code, userData.uuid);
        if (!updatedData) {
            throw new common_1.HttpException("We are unable to update the user's data", common_1.HttpStatus.NOT_FOUND);
        }
        return { data: generatedCode.verification_code, message: "Password reset completed successfuly" };
    }
    async confirmEmail(data) {
        if (!data || !data.email || !data.code) {
            throw new common_1.HttpException('Invalid data submitted', common_1.HttpStatus.BAD_REQUEST);
        }
        let generatedCode = await this.verifService.findOne(data.code);
        if (!generatedCode.verification_code) {
            throw new common_1.HttpException("You're not authorized to perform this action", common_1.HttpStatus.FORBIDDEN);
        }
        let userData = await this.userModel.findOne({ where: { email: data.email } });
        if (!userData) {
            throw new common_1.HttpException("We are unable to find the user's data", common_1.HttpStatus.NOT_FOUND);
        }
        let updatedData = await this.userModel.update({ active: 1 }, { where: { uuid: userData.uuid } });
        this.verifService.update(data.code, userData.uuid);
        if (!updatedData) {
            throw new common_1.HttpException("We are unable to update the user's data", common_1.HttpStatus.NOT_FOUND);
        }
        return { data: generatedCode.verification_code, message: "Password reset completed successfuly" };
    }
    async linkAccount(data) {
        if (!data.email && !data.phone) {
            throw new common_1.HttpException('Invalid data', common_1.HttpStatus.FORBIDDEN);
        }
        if (!data.password) {
            throw new common_1.HttpException('Invalid data', common_1.HttpStatus.FORBIDDEN);
        }
        let searchValue = "";
        if (data.email) {
            if (data.email.toString().indexOf('@') < 0) {
                throw new common_1.HttpException('Invalid email', common_1.HttpStatus.UNAUTHORIZED);
            }
            searchValue = data.email;
        }
        else if (data.phone) {
            searchValue = data.phone;
        }
        let result = await this.userModel.findAll({ where: { password: data.password, [sequelize_1.Op.or]: { email: searchValue, phone: searchValue } }, raw: true, type: sequelize_1.QueryTypes.SELECT });
        if (result && result.length > 0) {
            let user = result.filter(e => e.password.toString().trim() == data.password.toString().trim());
            if (user && user.length == 1) {
                delete user[0]['id'];
                delete user[0]['password'];
                return { user: user[0], token: "Unknown" };
            }
            throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
        }
        throw new common_1.HttpException('Invalid credentials submitted', common_1.HttpStatus.UNAUTHORIZED);
    }
    async login(body) {
        if (!body.email && !body.phone) {
            throw new common_1.HttpException('Invalid data', common_1.HttpStatus.UNAUTHORIZED);
        }
        if (!body.password) {
            throw new common_1.HttpException('Invalid data', common_1.HttpStatus.UNAUTHORIZED);
        }
        let searchValue = "";
        if (body.email) {
            if (body.email.toString().indexOf('@') < 0) {
                throw new common_1.HttpException('Invalid email', common_1.HttpStatus.UNAUTHORIZED);
            }
            searchValue = body.email;
        }
        else if (body.phone) {
            searchValue = body.phone;
        }
        let result = await this.userModel.findAll({ where: { password: body.password, [sequelize_1.Op.or]: { email: searchValue, phone: searchValue } }, raw: true, type: sequelize_1.QueryTypes.SELECT });
        if (result && result.length > 0) {
            let user = result.filter(e => e.password.toString().trim() == body.password.toString().trim());
            if (user && user.length == 1) {
                if (user[0].active != 1) {
                    let generatedCode = await this.verifService.create({ user_uuid: user[0].uuid, used: 0, invalid_at: '5', verification_code: '' });
                    this.mailService.sendConfirmMail(user[0], generatedCode.verification_code);
                    return { user: user[0] };
                }
                delete user[0]['password'];
                user[0]['wallets'] = await this.walletService.findAll(user[0].uuid);
                user[0]['accounts'] = await this.accountService.findAll(user[0].uuid);
                user[0]['paymentMethods'] = await this.paymentMethodService.findAll(user[0].uuid);
                return { user: user[0], token: await jwt_helper_1.JWTHelper.generateToken({ identifier: user[0].email || user[0].phone, credential: user[0].password, uuid: user[0].uuid }) };
            }
            throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
        }
        throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.FORBIDDEN);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('USERS_REPOSITORY')),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => mail_service_1.MailService))),
    __param(5, (0, common_1.Inject)((0, common_1.forwardRef)(() => verification_code_service_1.VerificationCodeService))),
    __metadata("design:paramtypes", [Object, wallet_service_1.WalletService,
        mail_service_1.MailService,
        account_service_1.AccountService, payment_methods_service_1.PaymentMethodsService,
        verification_code_service_1.VerificationCodeService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map