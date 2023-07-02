import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateDebtDto, UpdateDebtDto } from './debt.request';
import { DebtService } from './debt.service';

@Controller()
export class DebtController {
  constructor(private readonly debtService: DebtService) {}

  @MessagePattern({ service: 'debt', action: 'create' })
  createDebt(@Payload() createDebtDto: CreateDebtDto) {
    return this.debtService.create(createDebtDto);
  }

  @MessagePattern({ service: 'debt', action: 'getAll' })
  getAllDebts() {
    return this.debtService.findAll();
  }

  @MessagePattern({ service: 'debt', action: 'getById' })
  getDebtById(@Payload() id: string) {
    return this.debtService.findById(id);
  }

  @MessagePattern({ service: 'debt', action: 'update' })
  updateDebt(@Payload() payload: { id: string; updateDebtDto: UpdateDebtDto }) {
    const { id, updateDebtDto } = payload;
    return this.debtService.update(id, updateDebtDto);
  }

  @MessagePattern({ service: 'debt', action: 'delete' })
  deleteDebt(@Payload() id: string) {
    return this.debtService.delete(id);
  }
}
