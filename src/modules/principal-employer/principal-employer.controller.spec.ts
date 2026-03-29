import { Test, TestingModule } from '@nestjs/testing';
import { PrincipalEmployerController } from './principal-employer.controller';
import { PrincipalEmployerService } from './principal-employer.service';

describe('PrincipalEmployerController', () => {
  let controller: PrincipalEmployerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrincipalEmployerController],
      providers: [PrincipalEmployerService],
    }).compile();

    controller = module.get<PrincipalEmployerController>(PrincipalEmployerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
