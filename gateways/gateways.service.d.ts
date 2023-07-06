import { Gateways, GatewaysDetails } from './gateway.model';
export declare class GatewaysDetailsService {
    private gatewayDetailsModel;
    constructor(gatewayDetailsModel: typeof GatewaysDetails);
    find(value: any): Promise<GatewaysDetails[]>;
    viewAll(): Promise<GatewaysDetails[]>;
    create(data: any): Promise<GatewaysDetails>;
}
export declare class GatewaysService {
    private gateWayModel;
    private gatewayDetailsService;
    constructor(gateWayModel: typeof Gateways, gatewayDetailsService: GatewaysDetailsService);
    find(value: any): Promise<{
        data: any[];
    }>;
    findForSale(value: any): Promise<{
        data: any[];
    }>;
    create(data: any, isPrimaryGateway?: boolean): Promise<{
        gateway: Gateways;
        gatewayDetails: GatewaysDetails;
    }>;
}
