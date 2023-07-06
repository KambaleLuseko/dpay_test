import { Transactions } from './transactions.model';
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
            id?: any;
            createdAt?: any;
            updatedAt?: any;
            deletedAt?: any;
            version?: any;
            _attributes: Transactions;
            dataValues: Transactions;
            _creationAttributes: Transactions;
            isNewRecord: boolean;
            sequelize: import("sequelize").Sequelize;
            _model: import("sequelize").Model<Transactions, Transactions>;
        };
    }>;
    create(data: any): Promise<{
        transaction: Transactions;
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
