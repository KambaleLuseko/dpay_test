import { Model } from "sequelize-typescript";
export declare class AccountDetails extends Model<AccountDetails> {
    uuid: string;
    account_uuid: string;
    mode: string;
    status: string;
    sold: string;
    key: string;
    storeKey: string;
    start_date: string;
    end_date: string;
}
