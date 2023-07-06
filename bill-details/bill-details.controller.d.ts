import { BillDetailsService } from 'src/bill-details/bill-details.service';
export declare class BillDetailsController {
    private billDetailsService;
    constructor(billDetailsService: BillDetailsService);
    get(params: any): Promise<import("./bill-details.model").BillDetails[]>;
    create(data: any): Promise<{
        message: string;
        status: number;
    }>;
    update(data: any, params: any): Promise<{
        message: string;
        status: number;
    }>;
    delete(params: any): Promise<{
        message: string;
        status: number;
    }>;
}
