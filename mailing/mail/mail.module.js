"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailModule = void 0;
const common_1 = require("@nestjs/common");
const mail_service_1 = require("./mail.service");
const mail_controller_1 = require("./mail.controller");
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const path_1 = require("path");
const users_module_1 = require("../../users/users.module");
let MailModule = class MailModule {
};
MailModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: "smtp.ipage.com",
                    secure: false,
                    ignoreTLS: true,
                    auth: { user: 'providencekambale@nalediservices.com', pass: "Naledi2021@" },
                },
                defaults: {
                    from: "DailyPay sarl <providencekambale@nalediservices.com>",
                },
                template: {
                    dir: (0, path_1.join)(__dirname, 'templates'),
                    adapter: new handlebars_adapter_1.HandlebarsAdapter()
                }
            }), (0, common_1.forwardRef)(() => users_module_1.UsersModule)
        ],
        providers: [mail_service_1.MailService],
        controllers: [mail_controller_1.MailController],
        exports: [mail_service_1.MailService]
    })
], MailModule);
exports.MailModule = MailModule;
//# sourceMappingURL=mail.module.js.map