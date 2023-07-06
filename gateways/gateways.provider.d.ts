import { Gateways, GatewaysDetails } from "./gateway.model";
export declare const gatewayProvider: {
    provide: string;
    useValue: typeof Gateways;
};
export declare const gatewayDetailsProvider: {
    provide: string;
    useValue: typeof GatewaysDetails;
};
