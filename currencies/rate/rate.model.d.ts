import { Model } from "sequelize-typescript";
export declare class Rates extends Model<Rates> {
    uuid: string;
    currency_uuid: string;
    from_usd_rate: number;
    to_usd_rate: number;
    active: number;
}
