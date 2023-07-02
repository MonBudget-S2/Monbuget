import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DebtService } from './debt.service';
import { CreateDebtDto, UpdateDebtDto } from './debt.request';

@Controller()
export class DebtController {
  constructor(private readonly debtService: DebtService) {}

  @MessagePattern({ service: 'debt', action: 'create' })
  createDebt(@Payload() createDebtDto: CreateDebtDto) {
    return this.debtService.createDebt(createDebtDto);
  }

  @MessagePattern({ service: 'debt', action: 'findAll' })
  findAllDebts() {
    return this.debtService.findAllDebts();
  }

  @MessagePattern({ service: 'debt', action: 'findById' })
  findDebtById(@Payload() id: string) {
    return this.debtService.findDebtById(id);
  }

  @MessagePattern({ service: 'debt', action: 'update' })
  updateDebt(@Payload() payload: { id: string; updateDebtDto: UpdateDebtDto }) {
    const { id, updateDebtDto } = payload;
    return this.debtService.updateDebt(id, updateDebtDto);
  }

  @MessagePattern({ service: 'debt', action: 'delete' })
  deleteDebt(@Payload() id: string) {
    return this.debtService.deleteDebt(id);
  }

  @MessagePattern({ service: 'debt', action: 'addPayment' })
  addPayment(@Payload() payload: { debtId: string; amount: number }) {
    const { debtId, amount } = payload;
    return this.debtService.addPayment(debtId, amount);
  }

  @MessagePattern({ service: 'debt', action: 'getPayments' })
  getDebtPayments(@Payload() debtId: string) {
    return this.debtService.getDebtPayments(debtId);
  }

  @MessagePattern({ service: 'debt', action: 'getPayment' })
  getDebtPayment(@Payload() payload: { debtId: string; paymentId: string }) {
    const { debtId, paymentId } = payload;
    return this.debtService.getDebtPayment(debtId, paymentId);
  }

  @MessagePattern({ service: 'debt', action: 'updatePayment' })
  updateDebtPayment(
    @Payload()
    payload: {
      debtId: string;
      paymentId: string;
      amount: number;
    },
  ) {
    const { debtId, paymentId, amount } = payload;
    return this.debtService.updateDebtPayment(debtId, paymentId, amount);
  }

  @MessagePattern({ service: 'debt', action: 'deletePayment' })
  deleteDebtPayment(@Payload() payload: { debtId: string; paymentId: string }) {
    const { debtId, paymentId } = payload;
    return this.debtService.deleteDebtPayment(debtId, paymentId);
  }
}
