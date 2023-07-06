import { RateService } from './rate.service';
export declare class RateController {
    private rateService;
    constructor(rateService: RateService);
    find(params: any): Promise<{
        data: import("./rate.model").Rates[];
    }>;
    findAll(params: any): Promise<{
        data: import("./rate.model").Rates[];
    }>;
    create(data: any): Promise<import("./rate.model").Rates>;
}
