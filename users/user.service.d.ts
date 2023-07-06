import { UserModel } from "./user.model";
import { UserCreationDTO } from "./user.dto";
import { WalletService } from "src/wallets/wallet.service";
import { WalletCreationDTO } from "src/wallets/wallet.dto";
import { MailService } from "src/mailing/mail/mail.service";
import { AccountService } from "src/account/account.service";
import { PaymentMethodsService } from "src/payment-methods/payment-methods.service";
import { VerificationCodeService } from "src/verification_code/verification_code.service";
export declare class UserService {
    private userModel;
    private walletService;
    private mailService;
    private accountService;
    private paymentMethodService;
    private verifService;
    constructor(userModel: typeof UserModel, walletService: WalletService, mailService: MailService, accountService: AccountService, paymentMethodService: PaymentMethodsService, verifService: VerificationCodeService);
    findAll(value?: string, details?: string): Promise<any[]>;
    create(data: UserCreationDTO, isDefaultClient?: boolean): Promise<{
        user: UserModel;
        wallet: WalletCreationDTO;
    }>;
    forgotPassword(data: any): Promise<{
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
    linkAccount(data: any): Promise<{
        user: UserModel;
        token: string;
    }>;
    login(body: any): Promise<{
        user: UserModel;
        token?: undefined;
    } | {
        user: UserModel;
        token: any;
    }>;
}
