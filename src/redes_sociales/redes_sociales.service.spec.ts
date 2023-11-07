import { Test, TestingModule } from '@nestjs/testing';
import { RedesSocialesService } from './redes_sociales.service';

describe('RedesSocialesService', () => {
  let service: RedesSocialesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedesSocialesService],
    }).compile();

    service = module.get<RedesSocialesService>(RedesSocialesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
