import { BillsService } from 'src/bills/bills.service';
import { TransactionsService } from 'src/transactions/transactions.service';
export declare class DashboardService {
    private transServcie;
    private billService;
    constructor(transServcie: TransactionsService, billService: BillsService);
    getAllStats(data: any): Promise<{
        transaction: object;
        bill: {};
        weekStats: {
            weekStats: any[];
        };
    }>;
}
