import { WebsocketsGateway } from "src/websockets/websockets.gateway";
export declare class NotificationsGateway {
    private socketGateway;
    constructor(socketGateway: WebsocketsGateway);
    handleNotif(data: any): void;
}
