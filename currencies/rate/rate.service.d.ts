import { Rates } from './rate.model';
export declare class RateService {
    private rateModel;
    constructor(rateModel: typeof Rates);
    find(value: any): Promise<{
        data: Rates[];
    }>;
    findAll(value: any): Promise<{
        data: Rates[];
    }>;
    create(data: any): Promise<Rates>;
}
