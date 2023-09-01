import { PaymentMethodsService } from 'src/payment-methods/payment-methods.service';
import { TransactionDetailsService } from 'src/transaction-details/transaction-details.service';
import { UserService } from 'src/users/user.service';
import { Transactions } from './transactions.model';
import { BillsService } from 'src/bills/bills.service';
import { NotificationsService } from 'src/notifications/notifications.service';
import { MailService } from 'src/mailing/mail/mail.service';
export declare class TransactionsService {
    private transactionModel;
    private paymentMethodService;
    private transactionDetailsService;
    private userService;
    private billService;
    private notifService;
    private mailService;
    constructor(transactionModel: typeof Transactions, paymentMethodService: PaymentMethodsService, transactionDetailsService: TransactionDetailsService, userService: UserService, billService: BillsService, notifService: NotificationsService, mailService: MailService);
    findAll(value?: string): Promise<any[]>;
    getStats(data: any): Promise<object>;
    weekStats(data: any): Promise<any[]>;
    findOne(value: string): Promise<any[] | {
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
        _attributes: Transactions;
        dataValues: Transactions;
        _creationAttributes: Transactions;
        isNewRecord: boolean;
        sequelize: import("sequelize").Sequelize;
        _model: import("sequelize").Model<Transactions, Transactions>;
    }>;
    findBillPayment(value: string): Promise<any[]>;
    create(data: any): Promise<{
        transaction: Transactions;
        details: import("../transaction-details/transaction-details.model").TransactionDetails;
        message: string;
    }>;
    externalSystemPayment(data: any, key: string): Promise<{
        transaction: Transactions;
        message: string;
    }>;
    ValidateExternalPayment(data: any): Promise<{
        transaction: Transactions;
        details: import("../transaction-details/transaction-details.model").TransactionDetails;
        message: string;
    }>;
    cancel(uuid: any): Promise<{
        details: import("../transaction-details/transaction-details.model").TransactionDetails;
        message: string;
    }>;
    refund(uuid: any): Promise<{
        details: import("../transaction-details/transaction-details.model").TransactionDetails;
        message: string;
    }>;
    callExternalApi(body: any, headers: any, url: string): Promise<void>;
    testEAirtelMoney(): Promise<void>;
    processExternalMerchantPayment(url: string, data: string, method: string, rawData: any): Promise<{
        status: any;
        data: any;
        message: any;
    }>;
}
