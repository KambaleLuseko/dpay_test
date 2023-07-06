import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { AccountDetailsService } from "src/account-details/account-details.service";
export declare class JWTAuthMiddleware implements NestMiddleware {
    private accountDetailService;
    constructor(accountDetailService: AccountDetailsService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
