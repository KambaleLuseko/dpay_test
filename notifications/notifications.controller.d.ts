import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
export declare class NotificationsController {
    private notificationsService;
    constructor(notificationsService: NotificationsService);
    create(createNotificationDto: CreateNotificationDto): Promise<{
        status: number;
        data: import("./entities/notification.entity").Notifications;
        message: string;
    }>;
    findAll(params: any): Promise<{
        data: import("./entities/notification.entity").Notifications[];
    }>;
}
