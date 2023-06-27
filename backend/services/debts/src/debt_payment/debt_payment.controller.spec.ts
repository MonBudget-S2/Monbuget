import { Test, TestingModule } from '@nestjs/testing';
import { DebtPaymentController } from './debt_payment.controller';
import { DebtPaymentService } from './debt_payment.service';

describe('DebtPaymentController', () => {
  let controller: DebtPaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DebtPaymentController],
      providers: [DebtPaymentService],
    }).compile();

    controller = module.get<DebtPaymentController>(DebtPaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
