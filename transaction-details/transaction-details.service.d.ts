import { TransactionDetails } from './transaction-details.model';
export declare class TransactionDetailsService {
    private transactionDetails;
    constructor(transactionDetails: typeof TransactionDetails);
    findAll(value: any): Promise<TransactionDetails[]>;
    create(data: any): Promise<TransactionDetails>;
}
