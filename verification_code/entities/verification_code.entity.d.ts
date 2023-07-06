import { Model } from "sequelize-typescript";
export declare class VerificationCode extends Model<VerificationCode> {
    uuid: string;
    user_uuid: string;
    verification_code: string;
    invalid_at: string;
    used: number;
}
