import { Model } from "sequelize-typescript";
export declare class Activity extends Model<Activity> {
    uuid: string;
    owner_uuid: string;
    name: string;
    description: string;
    active: string;
}
