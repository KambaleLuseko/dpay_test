import { WalletCreationDTO } from "./wallet.dto";
import { WalletService } from "./wallet.service";
export declare class WalletController {
    private walletService;
    constructor(walletService: WalletService);
    findAll(param: any): Promise<WalletCreationDTO[]>;
    create(body: WalletCreationDTO): Promise<WalletCreationDTO>;
}
