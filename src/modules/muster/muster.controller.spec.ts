import { Test, TestingModule } from '@nestjs/testing';
import { MusterController } from './muster.controller';
import { MusterService } from './muster.service';

describe('MusterController', () => {
  let controller: MusterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MusterController],
      providers: [MusterService],
    }).compile();

    controller = module.get<MusterController>(MusterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
