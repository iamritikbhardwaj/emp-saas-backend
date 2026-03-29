import { Test, TestingModule } from '@nestjs/testing';
import { MusterService } from './muster.service';

describe('MusterService', () => {
  let service: MusterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MusterService],
    }).compile();

    service = module.get<MusterService>(MusterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
