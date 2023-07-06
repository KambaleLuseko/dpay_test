import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notifications } from './entities/notification.entity';
import { WebsocketsGateway } from 'src/websockets/websockets.gateway';
export declare class NotificationsService {
    private notificationModel;
    private socketGateway;
    constructor(notificationModel: typeof Notifications, socketGateway: WebsocketsGateway);
    create(data: CreateNotificationDto): Promise<{
        status: number;
        data: Notifications;
        message: string;
    }>;
    findAll(value?: string): Promise<{
        data: Notifications[];
    }>;
}
