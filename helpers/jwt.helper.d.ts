import { Request } from 'express';
export declare class JWTHelper {
    static generateToken(data: any): Promise<any>;
    static verifyToken(token: any): Promise<any>;
    static authMiddleware(req: Request, res: any, next: any): Promise<void>;
}
