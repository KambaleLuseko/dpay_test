import { GatewaysService } from 'src/gateways/gateways.service';
import { PaymentMethod } from './payment-methods.model';
export declare class PaymentMethodsService {
    private paymentMethodObject;
    private gatewayService;
    constructor(paymentMethodObject: typeof PaymentMethod, gatewayService: GatewaysService);
    create(data: any, isSignup?: boolean): Promise<PaymentMethod>;
    update(data: any, uuid: any): Promise<[affectedCount: number]>;
    findAll(value?: string): Promise<any[]>;
}
