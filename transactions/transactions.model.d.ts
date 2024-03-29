import { Model } from "sequelize-typescript";
export declare class Transactions extends Model<Transactions> {
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
}
