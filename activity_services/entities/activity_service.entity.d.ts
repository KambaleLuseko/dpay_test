import { Model } from "sequelize-typescript";
export declare class ActivityService extends Model<ActivityService> {
    uuid: string;
    activity_uuid: string;
    name: string;
    description: string;
    active: string;
    comment: string;
}
