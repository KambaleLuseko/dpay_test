import { UserCreationDTO } from "src/users/user.dto";
import { AuthService } from "./auth.service";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(data: any): Promise<{
        user: import("../users/user.model").UserModel;
        token?: undefined;
    } | {
        user: import("../users/user.model").UserModel;
        token: any;
    }>;
    signUp(data: UserCreationDTO): Promise<{
        user: {
            user: import("../users/user.model").UserModel;
            wallet: import("../wallets/wallet.dto").WalletCreationDTO;
        };
    }>;
}
