import { Test, TestingModule } from '@nestjs/testing';
import { EventBudgetController } from './event-budget.controller';
import { EventBudgetService } from './event-budget.service';

describe('EventBudgetController', () => {
  let controller: EventBudgetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventBudgetController],
      providers: [EventBudgetService],
    }).compile();

    controller = module.get<EventBudgetController>(EventBudgetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
