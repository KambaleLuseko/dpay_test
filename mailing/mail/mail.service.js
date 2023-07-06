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
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const user_service_1 = require("../../users/user.service");
let MailService = class MailService {
    constructor(mailerService, userService) {
        this.mailerService = mailerService;
        this.userService = userService;
    }
    async sendResetMail(user, code) {
        console.log('init email sending...');
        await this.mailerService.sendMail({
            to: user.email,
            from: "DailyPay sarl <providencekambale@nalediservices.com>",
            subject: "Reset password request",
            template: '../../templates/reset-password',
            context: { name: user.name, code: code },
        });
        console.log('email sent');
    }
    async sendConfirmMail(user, code) {
        console.log('init email sending...');
        await this.mailerService.sendMail({
            to: user.email,
            from: "DailyPay sarl <providencekambale@nalediservices.com>",
            subject: "Email validation",
            template: '../../templates/confirm-email',
            context: { name: user.name, code: code },
        });
        console.log('email sent');
    }
    async sendWelcomeMail(data) {
        await this.mailerService.sendMail({
            to: data.email,
            subject: "Information",
            template: '../../templates/welcome',
            context: { user: data },
        });
    }
    async sendInvocieMail(sender, receiver, data, createdAt) {
        try {
            await this.mailerService.sendMail({
                to: receiver.email,
                from: "DailyPay sarl <providencekambale@nalediservices.com>",
                subject: "Invoice",
                template: '../../templates/bill_notification',
                context: { sender: sender, receiver: receiver, data: data, createdAt: createdAt },
            });
        }
        catch (error) {
            console.log(`sending mail failed due to ${error.toString()}`);
        }
    }
    async sendPaymentMail(sender, receiver, data, createdAt) {
        try {
            await this.mailerService.sendMail({
                to: receiver.email,
                from: "DailyPay sarl <providencekambale@nalediservices.com>",
                subject: "Payment",
                template: '../../templates/payment',
                context: { sender: sender, receiver: receiver, data: data, createdAt: createdAt },
            });
        }
        catch (error) {
            console.log(`sending mail failed due to ${error.toString()}`);
        }
    }
    async getUserData(uuid) {
        if (!uuid) {
            return null;
        }
        let userData = await this.userService.findAll(uuid);
        if (!userData) {
            return null;
        }
        return userData[0];
    }
};
MailService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [mailer_1.MailerService,
        user_service_1.UserService])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map