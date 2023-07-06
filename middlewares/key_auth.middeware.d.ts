import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { AccountDetailsService } from "src/account-details/account-details.service";
import { AccountService } from "src/account/account.service";
import { UserService } from "src/users/user.service";
export declare class AuthKeyMiddleware implements NestMiddleware {
    private accountService;
    private accountDetailsService;
    private userService;
    constructor(accountService: AccountService, accountDetailsService: AccountDetailsService, userService: UserService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
