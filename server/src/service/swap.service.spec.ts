import { Test, TestingModule } from '@nestjs/testing';
import { ethers } from 'ethers';
import abi from '../config/abi.json';
import { BlockchainService } from './blockchain.service';
import { SwapService } from './swap.service';
// Mock the BlockchainService
const mockBlockchainService = () => ({
    getBlockByTimestamp: jest.fn(),
});

describe('SwapService', () => {
    let service: SwapService;
    let blockchainService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SwapService,
                { provide: BlockchainService, useFactory: mockBlockchainService },
            ],
        }).compile();

        service = module.get<SwapService>(SwapService);
        blockchainService = module.get<BlockchainService>(BlockchainService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getSwapFees', () => {
        it('should call getSwapEvents and return expected result', async () => {
            const provider = new ethers.providers.JsonRpcProvider('https://bscrpc.com', { name: 'binance', chainId: 56 });
            const wallet = new ethers.Wallet('0x6d58aaa1d544cdc6f17f38883220693889092d85453fe36b4b6a6db60786d67c', provider);
            const mainPoolAddress = '0x312Bc7eAAF93f1C60Dc5AfC115FcCDE161055fb0';
            const contract = new ethers.Contract(mainPoolAddress, abi, wallet);

            const swapDto = { toToken: '0x55d398326f99059fF775485246999027B3197955' }; // Modify this as needed
            const interval = { amount: 15, durationInSeconds: 60 }; // Modify this as needed
            const result = await service.getSwapFees(swapDto, interval);
            expect(result.length).toBeGreaterThan(0)
        }, 10 * 10 * 1000);
    });
});
