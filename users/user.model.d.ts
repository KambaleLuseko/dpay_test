import { Model } from "sequelize-typescript";
export declare class UserModel extends Model<UserModel> {
    uuid: string;
    name: string;
    countryCode: string;
    phone: string;
    email: string;
    type: string;
    password: string;
    verificationMode: string;
    active: number;
}
