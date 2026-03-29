import { Test, TestingModule } from '@nestjs/testing';
import { PrincipalEmployerService } from './principal-employer.service';

describe('PrincipalEmployerService', () => {
  let service: PrincipalEmployerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrincipalEmployerService],
    }).compile();

    service = module.get<PrincipalEmployerService>(PrincipalEmployerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
