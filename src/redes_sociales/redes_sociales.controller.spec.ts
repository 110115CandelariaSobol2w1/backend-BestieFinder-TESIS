import { Test, TestingModule } from '@nestjs/testing';
import { RedesSocialesController } from './redes_sociales.controller';
import { RedesSocialesService } from './redes_sociales.service';

describe('RedesSocialesController', () => {
  let controller: RedesSocialesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RedesSocialesController],
      providers: [RedesSocialesService],
    }).compile();

    controller = module.get<RedesSocialesController>(RedesSocialesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
