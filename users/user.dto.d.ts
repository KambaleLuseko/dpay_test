import { Wallet } from "src/wallets/wallet.model";
export declare class UserDTO {
    id: number;
    uuid: string;
    name: string;
    countryCode: string;
    phone: string;
    email: string;
    type: string;
    verificationMode: string;
    wallets: Wallet[];
    active?: 1;
}
export declare class UserCreationDTO {
    uuid: string;
    name: string;
    phone: string;
    countryCode: string;
    email: string;
    type: string;
    password: string;
    verificationMode: string;
    active?: number;
}
