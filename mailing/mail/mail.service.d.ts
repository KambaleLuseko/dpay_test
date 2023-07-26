import { MailerService } from '@nestjs-modules/mailer';
import { UserService } from 'src/users/user.service';
import { UserCreationDTO } from 'src/users/user.dto';
export declare class MailService {
    private mailerService;
    private userService;
    constructor(mailerService: MailerService, userService: UserService);
    sendResetMail(user: any, code: any): Promise<void>;
    sendConfirmMail(user: UserCreationDTO, code: any): Promise<void>;
    sendWelcomeMail(data: any): Promise<void>;
    sendInvocieMail(sender: any, receiver: any, data: any, createdAt: any): Promise<void>;
    sendPaymentMail(sender: any, receiver: any, data: any, createdAt: any): Promise<void>;
    sendInitiatePaymentMail(sender: any, receiver: any, data: any, paymentCode: any): Promise<void>;
    getUserData(uuid: string): Promise<any>;
}
