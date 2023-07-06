import { Model } from "sequelize-typescript";
export declare class Notifications extends Model<Notifications> {
    uuid: string;
    from: string;
    destination: string;
    content: string;
    readed: number;
}
