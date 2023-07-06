import { BillsService } from './bills.service';
export declare class BillsController {
    private billsService;
    constructor(billsService: BillsService);
    get(params: any): Promise<{
        data: any[];
    }>;
    findOne(params: any): Promise<{
        data: {
            sender: any;
            receiver: any;
            details: {};
            payments: {};
            service: {};
            uuid: string;
            sender_uuid: string;
            client_uuid: string;
            amount_due: number;
            amount_paid: number;
            amount_remaining: number;
            currency: string;
            total_fees_percent: number;
            dp_fees: number;
            provider_fees: number;
            total_discount: number;
            total_tax: number;
            status: string;
            paid: string;
            paidAt: string;
            end_date: string;
            made_by: string;
            service_uuid: string;
            origin: string;
            data_model: string;
            confirmation_url: string;
            confirmation_method: string;
            id?: any;
            createdAt?: any;
            updatedAt?: any;
            deletedAt?: any;
            version?: any;
            _attributes: import("./bills.model").Bills;
            dataValues: import("./bills.model").Bills;
            _creationAttributes: import("./bills.model").Bills;
            isNewRecord: boolean;
            sequelize: import("sequelize").Sequelize;
            _model: import("sequelize").Model<import("./bills.model").Bills, import("./bills.model").Bills>;
        };
    }>;
    create(data: any): Promise<import("./bills.model").Bills>;
    externalSystemBill(data: any): Promise<import("./bills.model").Bills>;
}
