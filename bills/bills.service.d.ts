import { BillDetailsService } from 'src/bill-details/bill-details.service';
import { Bills } from './bills.model';
import { UserService } from 'src/users/user.service';
import { TransactionsService } from 'src/transactions/transactions.service';
import { NotificationsService } from 'src/notifications/notifications.service';
import { WebsocketsGateway } from 'src/websockets/websockets.gateway';
import { ActivityServicesService } from 'src/activity_services/activity_services.service';
import { MailService } from 'src/mailing/mail/mail.service';
export declare class BillsService {
    private billsModel;
    private billDetailsService;
    private userService;
    private transService;
    private notifService;
    private socketGateway;
    private activityServicesService;
    private mailService;
    constructor(billsModel: typeof Bills, billDetailsService: BillDetailsService, userService: UserService, transService: TransactionsService, notifService: NotificationsService, socketGateway: WebsocketsGateway, activityServicesService: ActivityServicesService, mailService: MailService);
    create(data: any): Promise<Bills>;
    cancel(uuid: any): Promise<[affectedCount: number]>;
    validate(uuid: any): Promise<[affectedCount: number]>;
    findAll(value: any): Promise<any[]>;
    getStats(data: any): Promise<object>;
    findOne(value: string, details?: boolean): Promise<{
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
        merchant_key: string;
        id?: any;
        createdAt?: any;
        updatedAt?: any;
        deletedAt?: any;
        version?: any;
        _attributes: Bills;
        dataValues: Bills;
        _creationAttributes: Bills;
        isNewRecord: boolean;
        sequelize: import("sequelize").Sequelize;
        _model: import("sequelize").Model<Bills, Bills>;
    }>;
    externalSystemBill(data: any): Promise<Bills>;
}
