import { Model } from "sequelize-typescript";
export declare class Bills extends Model<Bills> {
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
}
