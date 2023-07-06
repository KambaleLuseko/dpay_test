import { WalletCreationDTO } from "./wallet.dto";
import { Wallet } from "./wallet.model";
export declare class WalletService {
    private walletModel;
    constructor(walletModel: typeof Wallet);
    create(data: WalletCreationDTO): Promise<WalletCreationDTO>;
    findAll(value?: string): Promise<WalletCreationDTO[]>;
}
