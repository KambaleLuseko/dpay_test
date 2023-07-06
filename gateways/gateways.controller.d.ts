import { GatewaysService } from './gateways.service';
export declare class GatewaysController {
    private gatewayService;
    constructor(gatewayService: GatewaysService);
    create(body: any): Promise<{
        gateway: import("./gateway.model").Gateways;
        gatewayDetails: import("./gateway.model").GatewaysDetails;
    }>;
    find(params: any): Promise<{
        data: any[];
    }>;
    findSpecs(params: any): Promise<{
        data: any[];
    }>;
}
export declare class GatewaysDetailsController {
}
