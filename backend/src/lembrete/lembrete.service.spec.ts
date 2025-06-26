import { Test, TestingModule } from '@nestjs/testing';
import { LembreteService } from './lembrete.service';

describe('LembreteService', () => {
  let service: LembreteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LembreteService],
    }).compile();

    service = module.get<LembreteService>(LembreteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
