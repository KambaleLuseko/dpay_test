import { CreateActivityServiceDto } from './dto/create-activity_service.dto';
import { ActivityService } from './entities/activity_service.entity';
export declare class ActivityServicesService {
    private activityServiceModel;
    constructor(activityServiceModel: typeof ActivityService);
    create(data: CreateActivityServiceDto): Promise<ActivityService>;
    findAll(value?: string): Promise<ActivityService[]>;
    findOne(uuid: string): Promise<CreateActivityServiceDto>;
    update(uuid: string, data: CreateActivityServiceDto): Promise<[affectedCount: number]>;
}
