import { UserService } from "./user.service";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    findAll(params: any): Promise<{
        data: any[];
    }>;
    linkAccount(data: any): Promise<{
        data: {
            user: import("./user.model").UserModel;
            token: string;
        };
    }>;
    initResetPassword(data: any): Promise<{
        message: string;
        name: any;
    }>;
    resetPassword(data: any): Promise<{
        data: string;
        message: string;
    }>;
    confirmEmail(data: any): Promise<{
        data: string;
        message: string;
    }>;
}
