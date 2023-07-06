import { Model } from "sequelize-typescript";
export declare class BillDetails extends Model<BillDetails> {
    uuid: string;
    bill_uuid: string;
    product_uuid: string;
    amount: string;
    description: string;
    quantity: string;
    tax_amount: string;
    recurring: string;
    type: string;
}
