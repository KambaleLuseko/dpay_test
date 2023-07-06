import { AccountDetailsService } from 'src/account-details/account-details.service';
import { Account } from './account.model';
export declare class AccountService {
    private accountModel;
    private accountDetailService;
    constructor(accountModel: typeof Account, accountDetailService: AccountDetailsService);
    findAll(value: any): Promise<any[]>;
    create(data: any): Promise<{
        account: Account;
        accountDetails: import("../account-details/account-details.model").AccountDetails[];
    }>;
}
