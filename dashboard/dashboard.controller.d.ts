import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getData(data: any): Promise<{
        transaction: object;
        bill: {};
        weekStats: {
            weekStats: any[];
        };
    }>;
}
