"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationCodeProvider = void 0;
const verification_code_entity_1 = require("./verification_code.entity");
exports.VerificationCodeProvider = {
    provide: "VERIFICATION_REPOSITORY",
    useValue: verification_code_entity_1.VerificationCode
};
//# sourceMappingURL=verification_code.provider.js.map