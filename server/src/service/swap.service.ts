import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import abi from '../config/abi.json';
import { Interval } from '../config/interval';
import { BlockchainService } from './blockchain.service';
import { SwapDto } from './dto/swap.dto';
@Injectable()
export class SwapService {
    constructor(private readonly blockchainService: BlockchainService) {}

    provider = new ethers.providers.JsonRpcProvider('https://bscrpc.com', { name: 'binance', chainId: 56 });
    wallet = new ethers.Wallet('0x6d58aaa1d544cdc6f17f38883220693889092d85453fe36b4b6a6db60786d67c', this.provider);
    mainPoolAddress = '0x312Bc7eAAF93f1C60Dc5AfC115FcCDE161055fb0';
    implementationAddress = '0x2c3c340233338d875637304b06f4f6faf9bebd20';
    abi = abi;
    contract = new ethers.Contract(this.mainPoolAddress, this.abi, this.wallet);

    async getSwapEvents(swapDto: SwapDto, interval: Interval): Promise<any> {
        const now = Math.floor(new Date().getTime() / 1000);

        const eventsForAllPeriods = [];

        for (let i = 0; i < interval.amount; i++) {
            const periodStartTimestamp = now - (i + 1) * interval.durationInSeconds;
            const periodEndTimestamp = now - i * interval.durationInSeconds;
            const fromBlock = await this.getBlockNumberFromTimestamp(periodStartTimestamp);
            const toBlock = await this.getBlockNumberFromTimestamp(periodEndTimestamp);
            if (fromBlock < toBlock) {
                const filter = this.contract.filters.Swap();
                const events = await this.contract.queryFilter(filter, fromBlock, toBlock);
                const filteredEvents = events.filter(event => event.args.toToken === swapDto.toToken);

                eventsForAllPeriods.push({
                    filteredEvents,
                    fromBlock,
                    toBlock,
                });
            }
        }

        return eventsForAllPeriods;
    }

    async getSwapFees(swapDto: SwapDto, interval: Interval): Promise<any> {
        const feePercentage = 0.01;
        const allEvents = await this.getSwapEvents(swapDto, interval);

        return allEvents.map(period => {
            const fees = period.filteredEvents.reduce((acc, event) => {
                const decimals = 18;
                const readableValue = ethers.utils.formatUnits(event.args.fromAmount, decimals);
                return (acc + Number(readableValue)) * feePercentage;
            }, 0);

            const latestEvents = period.filteredEvents.slice(Math.max(period.filteredEvents.length - 5, 0));

            return {
                fees,
                latestEvents,
            };
        });
    }

    async getBlockNumberFromTimestamp(timestamp) {
        const blockNumber = await this.blockchainService.getBlockByTimestamp(timestamp, 'after');
        if (!blockNumber) {
            return this.provider.getBlockNumber();
        }
        return blockNumber;
    }
}
