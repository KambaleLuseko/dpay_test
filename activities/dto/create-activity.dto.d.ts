import { CreateActivityServiceDto } from "src/activity_services/dto/create-activity_service.dto";
export declare class CreateActivityDto {
    uuid?: string;
    owner_uuid: string;
    name: string;
    description?: string;
    active?: string;
    services?: CreateActivityServiceDto[];
}
