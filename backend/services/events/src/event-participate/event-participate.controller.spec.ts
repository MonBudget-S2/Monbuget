import { Test, TestingModule } from '@nestjs/testing';
import { EventParticipateController } from './event-participate.controller';
import { EventParticipateService } from './event-participate.service';

describe('EventParticipateController', () => {
  let controller: EventParticipateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventParticipateController],
      providers: [EventParticipateService],
    }).compile();

    controller = module.get<EventParticipateController>(EventParticipateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
