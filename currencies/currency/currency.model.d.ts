import { Model } from "sequelize-typescript";
export declare class Currencies extends Model<Currencies> {
    uuid: string;
    name: string;
    description: string;
    active: string;
}
