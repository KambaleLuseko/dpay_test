import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class WebsocketsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor();
    handleDisconnect(client: any): void;
    afterInit(server: Server): void;
    handleConnection(client: Socket, ...args: any[]): void;
    io: Server;
}
