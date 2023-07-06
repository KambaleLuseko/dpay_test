import { Model } from "sequelize-typescript";
export declare class PaymentMethod extends Model<PaymentMethod> {
    uuid: string;
    user_uuid: string;
    gateway_uuid: string;
    number: string;
    expirationDate: string;
    cvv: string;
    active: number;
}
