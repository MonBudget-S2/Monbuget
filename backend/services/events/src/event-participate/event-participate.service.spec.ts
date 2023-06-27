import { Test, TestingModule } from '@nestjs/testing';
import { EventParticipateService } from './event-participate.service';

describe('EventParticipateService', () => {
  let service: EventParticipateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventParticipateService],
    }).compile();

    service = module.get<EventParticipateService>(EventParticipateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
