import { ActivityServicesService } from './activity_services.service';
import { CreateActivityServiceDto } from './dto/create-activity_service.dto';
export declare class ActivityServicesController {
    private readonly activityServicesService;
    constructor(activityServicesService: ActivityServicesService);
    create(createActivityServiceDto: CreateActivityServiceDto): Promise<import("./entities/activity_service.entity").ActivityService>;
    findAll(params: any): Promise<{
        data: import("./entities/activity_service.entity").ActivityService[];
    }>;
    findOne(id: string): Promise<{
        data: {};
    }>;
    update(uuid: string, data: CreateActivityServiceDto): Promise<[affectedCount: number]>;
}
