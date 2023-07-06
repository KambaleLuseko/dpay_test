import { Model } from "sequelize-typescript";
export declare class TransactionDetails extends Model<TransactionDetails> {
    uuid: string;
    transaction_uuid: string;
    amount: number;
    total_fees_percent: number;
    dp_fees: number;
    provider_fees: number;
    type: string;
}
