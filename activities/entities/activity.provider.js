"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityProvider = void 0;
const activity_entity_1 = require("./activity.entity");
exports.ActivityProvider = {
    provide: 'ACTIVITY_REPOSITORY',
    useValue: activity_entity_1.Activity
};
//# sourceMappingURL=activity.provider.js.map