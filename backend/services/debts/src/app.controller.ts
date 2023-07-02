import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateDebtDto, UpdateDebtDto } from './debt.request';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ service: 'debt', action: 'create' })
  createDebt(@Payload() createDebtDto: CreateDebtDto) {
    return this.appService.createDebt(createDebtDto);
  }

  @MessagePattern({ service: 'debt', action: 'getAll' })
  findAllDebts() {
    return this.appService.findAllDebts();
  }

  @MessagePattern({ service: 'debt', action: 'getAllByUser' })
  findAllDebtsByUser(@Payload() userId: string) {
    return this.appService.findAllDebtsByUser(userId);
  }

  @MessagePattern({ service: 'debt', action: 'getById' })
  findDebtById(@Payload() id: string) {
    return this.appService.findDebtById(id);
  }

  @MessagePattern({ service: 'debt', action: 'update' })
  updateDebt(@Payload() payload: { id: string; updateDebtDto: UpdateDebtDto }) {
    const { id, updateDebtDto } = payload;
    return this.appService.updateDebt(id, updateDebtDto);
  }

  @MessagePattern({ service: 'debt', action: 'delete' })
  deleteDebt(@Payload() id: string) {
    return this.appService.deleteDebt(id);
  }

  @MessagePattern({ service: 'debt', action: 'pay' })
  addPayment(@Payload() payload: { debtId: string; amount: number }) {
    console.log('payload', payload);
    const { debtId, amount } = payload;
    return this.appService.addPayment(debtId, amount);
  }

  @MessagePattern({ service: 'debt', action: 'getPayments' })
  getDebtPayments(@Payload() debtId: string) {
    return this.appService.getDebtPayments(debtId);
  }

  @MessagePattern({ service: 'debt', action: 'getPayment' })
  getDebtPayment(@Payload() payload: { debtId: string; paymentId: string }) {
    const { debtId, paymentId } = payload;
    return this.appService.getDebtPayment(debtId, paymentId);
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
    return this.appService.updateDebtPayment(debtId, paymentId, amount);
  }

  @MessagePattern({ service: 'debt', action: 'deletePayment' })
  deleteDebtPayment(@Payload() payload: { debtId: string; paymentId: string }) {
    const { debtId, paymentId } = payload;
    return this.appService.deleteDebtPayment(debtId, paymentId);
  }
}
