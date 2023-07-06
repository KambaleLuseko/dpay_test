import { Model } from "sequelize-typescript";
export declare class Wallet extends Model<Wallet> {
    uuid: string;
    owner_uuid: string;
    currency: string;
    balance: number;
    active: string;
}
