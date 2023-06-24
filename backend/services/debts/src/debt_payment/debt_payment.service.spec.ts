import { Test, TestingModule } from '@nestjs/testing';
import { DebtPaymentService } from './debt_payment.service';

describe('DebtPaymentService', () => {
  let service: DebtPaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DebtPaymentService],
    }).compile();

    service = module.get<DebtPaymentService>(DebtPaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
