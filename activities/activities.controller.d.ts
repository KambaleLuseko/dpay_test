import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
export declare class ActivitiesController {
    private readonly activitiesService;
    constructor(activitiesService: ActivitiesService);
    create(createActivityDto: CreateActivityDto): Promise<import("./entities/activity.entity").Activity>;
    findAll(params: any): Promise<{
        data: import("./entities/activity.entity").Activity[];
    }>;
    findOne(uuid: string): Promise<{
        data: {};
    }>;
    update(uuid: string, updateActivityDto: CreateActivityDto): Promise<[affectedCount: number]>;
}
