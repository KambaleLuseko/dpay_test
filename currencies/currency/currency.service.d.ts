import { RateService } from '../rate/rate.service';
import { Currencies } from './currency.model';
export declare class CurrencyService {
    private currencyModel;
    private rateService;
    constructor(currencyModel: typeof Currencies, rateService: RateService);
    findAll(value: any): Promise<{
        data: any[];
    }>;
    findAllRates(value: any): Promise<{
        data: any[];
    }>;
    create(data: any): Promise<{
        data: {
            currency: Currencies;
            rate: {};
        };
    }>;
}
