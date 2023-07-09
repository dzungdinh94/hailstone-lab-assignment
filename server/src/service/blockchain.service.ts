import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class BlockchainService {
    constructor(private httpService: HttpService) {}

    getBlockByTimestamp(timestamp: number, closest: string): Promise<any> {
        const API_KEY = '3VFJ8HCQM8DJH19J6PNF1ABA193DHWMS53';
        const URL = `https://api.bscscan.com/api?module=block&action=getblocknobytime&timestamp=${timestamp}&closest=${closest}&apikey=${API_KEY}`;

        return this.httpService
            .get(URL)
            .pipe(map(response => parseInt(response.data.result)))
            .toPromise();
    }
}
