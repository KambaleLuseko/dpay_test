"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateActivityServiceDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_activity_service_dto_1 = require("./create-activity_service.dto");
class UpdateActivityServiceDto extends (0, mapped_types_1.PartialType)(create_activity_service_dto_1.CreateActivityServiceDto) {
}
exports.UpdateActivityServiceDto = UpdateActivityServiceDto;
//# sourceMappingURL=update-activity_service.dto.js.map