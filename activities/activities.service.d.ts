import { CreateActivityDto } from './dto/create-activity.dto';
import { Activity } from './entities/activity.entity';
import { ActivityServicesService } from 'src/activity_services/activity_services.service';
export declare class ActivitiesService {
    private activityModel;
    private serviceActivity;
    constructor(activityModel: typeof Activity, serviceActivity: ActivityServicesService);
    create(data: CreateActivityDto): Promise<Activity>;
    findAll(value?: string): Promise<Activity[]>;
    findOne(value: string): Promise<CreateActivityDto>;
    update(uuid: string, data: CreateActivityDto): Promise<[affectedCount: number]>;
}
