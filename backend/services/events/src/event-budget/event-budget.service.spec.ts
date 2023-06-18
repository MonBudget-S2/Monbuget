import { Test, TestingModule } from '@nestjs/testing';
import { EventBudgetService } from './event-budget.service';

describe('EventBudgetService', () => {
  let service: EventBudgetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventBudgetService],
    }).compile();

    service = module.get<EventBudgetService>(EventBudgetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
