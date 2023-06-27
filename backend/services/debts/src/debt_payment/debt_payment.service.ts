import { Injectable } from '@nestjs/common';
import {
  CreateDebtPaymentDto,
  UpdateDebtPaymentDto,
} from './debt_payment.request';

@Injectable()
export class DebtPaymentService {
  create(createDebtPaymentDto: CreateDebtPaymentDto) {
    return 'This action adds a new debtPayment';
  }

  findAll() {
    return `This action returns all debtPayment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} debtPayment`;
  }

  update(id: number, updateDebtPaymentDto: UpdateDebtPaymentDto) {
    return `This action updates a #${id} debtPayment`;
  }

  remove(id: number) {
    return `This action removes a #${id} debtPayment`;
  }
}
