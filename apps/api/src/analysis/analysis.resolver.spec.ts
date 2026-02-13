import { Test, TestingModule } from '@nestjs/testing';
import { AnalysisResolver } from './analysis.resolver';

describe('AnalysisResolver', () => {
  let resolver: AnalysisResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnalysisResolver],
    }).compile();

    resolver = module.get<AnalysisResolver>(AnalysisResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
