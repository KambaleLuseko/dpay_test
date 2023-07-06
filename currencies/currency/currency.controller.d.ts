import { CurrencyService } from './currency.service';
export declare class CurrencyController {
    private currencyService;
    constructor(currencyService: CurrencyService);
    findAll(params: any): Promise<{
        data: any[];
    }>;
    findAllRates(params: any): Promise<{
        data: any[];
    }>;
    create(data: any): Promise<{
        data: {
            currency: import("./currency.model").Currencies;
            rate: {};
        };
    }>;
}
