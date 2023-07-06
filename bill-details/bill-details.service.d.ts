import { BillDetails } from './bill-details.model';
export declare class BillDetailsService {
    private billDetailsModel;
    constructor(billDetailsModel: typeof BillDetails);
    create(data: any[]): Promise<{
        message: string;
        status: number;
    }>;
    findAll(value: any): Promise<BillDetails[]>;
    update(data: BillDetails, uuid: string): Promise<{
        message: string;
        status: number;
    }>;
    delete(uuid: string): Promise<{
        message: string;
        status: number;
    }>;
}
