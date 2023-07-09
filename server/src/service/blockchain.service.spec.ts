import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { BlockchainService } from './blockchain.service';

describe('BlockchainService', () => {
  let service: BlockchainService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [BlockchainService, HttpService],
    })
      .overrideProvider(HttpService)
      .useValue({
        get: jest.fn().mockImplementation(() => of({ data: { result: '1234' } })),
      })
      .compile();

    service = module.get<BlockchainService>(BlockchainService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getBlockByTimestamp', () => {
    it('should return parsed result', async () => {
      const timestamp = 1234567890;
      const closest = 'before';
      const result = await service.getBlockByTimestamp(timestamp, closest);

      expect(result).toEqual(1234);
      expect(httpService.get).toBeCalledWith(
        `https://api.bscscan.com/api?module=block&action=getblocknobytime&timestamp=${timestamp}&closest=${closest}&apikey=3VFJ8HCQM8DJH19J6PNF1ABA193DHWMS53`
      );
    });
  });
});
