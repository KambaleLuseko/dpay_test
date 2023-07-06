"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVerificationCodeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_verification_code_dto_1 = require("./create-verification_code.dto");
class UpdateVerificationCodeDto extends (0, mapped_types_1.PartialType)(create_verification_code_dto_1.CreateVerificationCodeDto) {
}
exports.UpdateVerificationCodeDto = UpdateVerificationCodeDto;
//# sourceMappingURL=update-verification_code.dto.js.map