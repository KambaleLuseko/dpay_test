import { Model } from "sequelize-typescript";
export declare class Gateways extends Model<Gateways> {
    uuid: string;
    name: string;
    description: string;
    image_url: string;
    active: string;
    fees: number;
}
export declare class GatewaysDetails extends Model<GatewaysDetails> {
    uuid: string;
    gateway_uuid: string;
    url: string;
    private_api_key: string;
    public_api_key: string;
    url_test: string;
    test_private_api_key: string;
    test_public_api_key: string;
    active: string;
}
