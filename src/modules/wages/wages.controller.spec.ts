import { Test, TestingModule } from '@nestjs/testing';
import { WagesController } from './wages.controller';
import { WagesService } from './wages.service';

describe('WagesController', () => {
  let controller: WagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WagesController],
      providers: [WagesService],
    }).compile();

    controller = module.get<WagesController>(WagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
