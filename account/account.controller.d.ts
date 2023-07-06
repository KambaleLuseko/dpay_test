import { AccountService } from './account.service';
export declare class AccountController {
    private accountService;
    constructor(accountService: AccountService);
    create(data: any): Promise<{
        account: import("./account.model").Account;
        accountDetails: import("../account-details/account-details.model").AccountDetails[];
    }>;
    find(params: any): Promise<{
        data: any[];
    }>;
}
