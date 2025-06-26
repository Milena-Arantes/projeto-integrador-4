import { Test, TestingModule } from '@nestjs/testing';
import { LembreteController } from './lembrete.controller';
import { LembreteService } from './lembrete.service';

describe('LembreteController', () => {
  let controller: LembreteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LembreteController],
      providers: [LembreteService],
    }).compile();

    controller = module.get<LembreteController>(LembreteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
