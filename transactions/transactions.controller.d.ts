import { TransactionsService } from './transactions.service';
export declare class TransactionsController {
    private transactionService;
    constructor(transactionService: TransactionsService);
    findAll(params: any): Promise<{
        data: any[];
    }>;
    findOne(params: any): Promise<{
        data: any[] | {
            sender: any;
            receiver: any;
            payment_method: any;
            details: import("../transaction-details/transaction-details.model").TransactionDetails[];
            uuid: string;
            type: string;
            sender_uuid: string;
            receiver_uuid: string;
            bill_uuid: string;
            amount: number;
            currency: string;
            description: string;
            payment_method_uuid: string;
            wallet: string;
            status: string;
            refunded: string;
            shipping: string;
            made_by: string;
            data_model: string;
            confirmation_url: string;
            confirmation_method: string;
            merchant_key: string;
            auth_type: string;
            auth_prefix: string;
            auth_token: string;
            id?: any;
            createdAt?: any;
            updatedAt?: any;
            deletedAt?: any;
            version?: any;
            _attributes: import("./transactions.model").Transactions;
            dataValues: import("./transactions.model").Transactions;
            _creationAttributes: import("./transactions.model").Transactions;
            isNewRecord: boolean;
            sequelize: import("sequelize").Sequelize;
            _model: import("sequelize").Model<import("./transactions.model").Transactions, import("./transactions.model").Transactions>;
        };
    }>;
    create(data: any): Promise<{
        transaction: import("./transactions.model").Transactions;
        details: import("../transaction-details/transaction-details.model").TransactionDetails;
        message: string;
    }>;
    merchantPayment(data: any, headers: any): Promise<{
        transaction: import("./transactions.model").Transactions;
        message: string;
    }>;
    validateMerchantPayment(data: any): Promise<{
        transaction: import("./transactions.model").Transactions;
        details: import("../transaction-details/transaction-details.model").TransactionDetails;
        message: string;
    }>;
    cancel(params: any): Promise<{
        details: import("../transaction-details/transaction-details.model").TransactionDetails;
        message: string;
    }>;
    refund(params: any): Promise<{
        details: import("../transaction-details/transaction-details.model").TransactionDetails;
        message: string;
    }>;
    testAirtel(): Promise<void>;
}
