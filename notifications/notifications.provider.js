"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationProvider = void 0;
const notification_entity_1 = require("./entities/notification.entity");
exports.NotificationProvider = [
    {
        provide: 'NOTIFICATIONS_REPOSITORY',
        useValue: notification_entity_1.Notifications
    }
];
//# sourceMappingURL=notifications.provider.js.map