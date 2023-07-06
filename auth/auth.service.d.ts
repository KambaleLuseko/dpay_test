import { UserCreationDTO } from "src/users/user.dto";
import { UserModel } from "src/users/user.model";
import { UserService } from "src/users/user.service";
import { WalletCreationDTO } from "src/wallets/wallet.dto";
export declare class AuthService {
    private userService;
    constructor(userService: UserService);
    login(body: any): Promise<{
        user: UserModel;
        token?: undefined;
    } | {
        user: UserModel;
        token: any;
    }>;
    signUp(data: UserCreationDTO): Promise<{
        user: {
            user: UserModel;
            wallet: WalletCreationDTO;
        };
    }>;
}
