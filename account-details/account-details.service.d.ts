import { AccountDetails } from './account-details.model';
export declare class AccountDetailsService {
    private accountDetailsModel;
    constructor(accountDetailsModel: typeof AccountDetails);
    findAll(value: any): Promise<AccountDetails[]>;
    create(data: any): Promise<AccountDetails>;
    createMultiple(data: any[]): Promise<AccountDetails[]>;
}
