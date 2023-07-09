import { Controller, Get, Param, Query } from '@nestjs/common';
import { INTERVALS } from '../../config/interval';
import { SwapDto } from '../../service/dto/swap.dto';
import { SwapService } from '../../service/swap.service';

@Controller('swap')
export class SwapController {
    constructor(private readonly swapService: SwapService) {}

    @Get('fees/:intervalName')
    async getSwapFees(@Query() swapDto: SwapDto, @Param('intervalName') intervalName: string) {
        const interval = INTERVALS.find(i => i.name === intervalName)?.interval;
        if (!interval) {
            throw new Error(`Unknown interval: ${intervalName}`);
        }
        return await this.swapService.getSwapFees(swapDto, interval);
    }
}
