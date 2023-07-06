import { CreateVerificationCodeDto } from './dto/create-verification_code.dto';
import { VerificationCode } from './entities/verification_code.entity';
import { UserService } from 'src/users/user.service';
export declare class VerificationCodeService {
    private verificationModel;
    private userService;
    constructor(verificationModel: typeof VerificationCode, userService: UserService);
    create(data: CreateVerificationCodeDto): Promise<VerificationCode>;
    findAll(): string;
    findOne(uuid: string): Promise<VerificationCode>;
    update(uuid: string, owner_uuid: string): Promise<[affectedCount: number]>;
    remove(id: number): string;
    authCode(length?: number): string;
}
