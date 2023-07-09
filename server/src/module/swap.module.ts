import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BlockchainService } from '../service/blockchain.service';
import { SwapService } from '../service/swap.service';
import { SwapController } from '../web/rest/swap.controller';

@Module({
    imports: [HttpModule],
    controllers: [SwapController],
    providers: [SwapService, BlockchainService],
    exports: [SwapService, BlockchainService],
})
export class SwapModule {}
