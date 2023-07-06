import { PaymentMethodsService } from './payment-methods.service';
export declare class PaymentMethodsController {
    private paymentMethodService;
    constructor(paymentMethodService: PaymentMethodsService);
    findAll(params: any): Promise<{
        data: any[];
    }>;
    create(data: any): Promise<import("./payment-methods.model").PaymentMethod>;
    update(data: any, params: any): Promise<[affectedCount: number]>;
}
