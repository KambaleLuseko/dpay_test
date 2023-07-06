import { Model } from "sequelize-typescript";
export declare class Account extends Model<Account> {
    uuid: string;
    client_uuid: string;
    fullname: string;
    address: string;
    city: string;
    postalCode: string;
    phone: string;
    verificationStatus: string;
    active: number;
}
