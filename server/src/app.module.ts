import { Module } from '@nestjs/common';
import { SwapModule } from './module/swap.module';

@Module({
    imports: [SwapModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
