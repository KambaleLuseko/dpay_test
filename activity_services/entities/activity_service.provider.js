"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityServiceProvider = void 0;
const activity_service_entity_1 = require("./activity_service.entity");
exports.ActivityServiceProvider = {
    provide: 'ACTIVITY_SERVICE_REPOSITORY',
    useValue: activity_service_entity_1.ActivityService
};
//# sourceMappingURL=activity_service.provider.js.map