import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { SwapDto } from '../../service/dto/swap.dto';
import { SwapService } from '../../service/swap.service';
import { SwapController } from '../../web/rest/swap.controller';

describe('SwapController', () => {
    let swapController: SwapController;
    let swapService: SwapService;
    let httpService: HttpService;

    beforeEach(async () => {
        const mockHttpService = {
            get: jest.fn().mockReturnThis(),
            pipe: jest.fn().mockReturnThis(),
            toPromise: jest.fn().mockResolvedValue({ data: { result: "5000000" } }),
        };

        const app: TestingModule = await Test.createTestingModule({
            controllers: [SwapController],
            providers: [
                SwapService,
                {
                    provide: HttpService,
                    useValue: mockHttpService,
                },
                {
                    provide: SwapService,
                    useValue: {
                        getSwapFees: jest.fn().mockResolvedValue([0.01, 0.02, 0.03]),
                    },
                },
            ],
        }).compile();

        swapController = app.get<SwapController>(SwapController);
        swapService = app.get<SwapService>(SwapService);
        httpService = app.get<HttpService>(HttpService);
    });

    describe('getSwapFees', () => {
        it('should return an array of swap fees', async () => {
            const result = await swapController.getSwapFees(new SwapDto(), 'last_15_minutes');
            expect(result).toEqual([0.01, 0.02, 0.03]);
            expect(swapService.getSwapFees).toHaveBeenCalled();
        });
    });
});

