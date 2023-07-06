"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationCodeModule = void 0;
const common_1 = require("@nestjs/common");
const verification_code_service_1 = require("./verification_code.service");
const verification_code_controller_1 = require("./verification_code.controller");
const verification_code_provider_1 = require("./entities/verification_code.provider");
const users_module_1 = require("../users/users.module");
let VerificationCodeModule = class VerificationCodeModule {
};
VerificationCodeModule = __decorate([
    (0, common_1.Module)({
        imports: [(0, common_1.forwardRef)(() => users_module_1.UsersModule)],
        controllers: [verification_code_controller_1.VerificationCodeController],
        providers: [verification_code_service_1.VerificationCodeService, verification_code_provider_1.VerificationCodeProvider],
        exports: [verification_code_service_1.VerificationCodeService]
    })
], VerificationCodeModule);
exports.VerificationCodeModule = VerificationCodeModule;
//# sourceMappingURL=verification_code.module.js.map