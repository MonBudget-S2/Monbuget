import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Debt } from './debt.entity';
import { CreateDebtDto, UpdateDebtDto } from './debt.request';
import { DebtPayment } from './debt_payment.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Debt)
    private readonly debtRepository: Repository<Debt>,
    @InjectRepository(DebtPayment)
    private readonly debtPaymentRepository: Repository<DebtPayment>,
  ) {}

  async createDebt(createDebtDto: CreateDebtDto): Promise<Debt> {
    const debt = this.debtRepository.create(createDebtDto);
    const currentDate = new Date(); // Get the current date
    const oneMonthLater = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      currentDate.getDate(),
    );

    debt.dueDate = oneMonthLater;

    return this.debtRepository.save(debt);
  }

  async findAllDebts(): Promise<Debt[]> {
    return this.debtRepository.find();
  }

  async findByDebtorId(userId: string): Promise<Debt[]> {
    const debts = await this.debtRepository.find({
      where: { debtorId: userId },
    });
    console.log('debts', debts);
    // return this.debtRepository.find({ where: { userId } });
    return debts;
  }

  async findByCreditorId(userId: string): Promise<Debt[]> {
    return this.debtRepository.find({ where: { creditorId: userId } });
  }

  async findDebtById(id: string): Promise<Debt> {
    return this.debtRepository.findOneBy({ id });
  }

  async updateDebt(id: string, updateDebtDto: UpdateDebtDto): Promise<Debt> {
    const debt = await this.findDebtById(id);
    if (!debt) {
      // Handle not found case, throw exception or return null/error
    }
    Object.assign(debt, updateDebtDto);
    return this.debtRepository.save(debt);
  }

  async deleteDebt(id: string): Promise<void> {
    await this.debtRepository.delete(id);
  }

  async addPayment(debtId: string, amount: number): Promise<Debt> {
    const debt = await this.findDebtById(debtId);
    if (!debt) {
      return null;
    }

    const debtPayment = new DebtPayment();
    debtPayment.amount = amount;
    debtPayment.debt = debt;

    const savedDebtPayment = await this.debtPaymentRepository.save(debtPayment);

    if (debt.remainingAmount - amount < 0) return null;
    debt.remainingAmount -= amount;

    const savedDebt = await this.debtRepository.save(debt);
    return savedDebt;
  }

  async getDebtPayments(debtId: string): Promise<DebtPayment[]> {
    const debt = await this.findDebtById(debtId);
    if (!debt) {
      return null;
    }

    return debt.payments;
  }

  async getDebtPayment(
    debtId: string,
    paymentId: string,
  ): Promise<DebtPayment> {
    const debt = await this.findDebtById(debtId);
    if (!debt) {
      return null;
    }

    const payment = debt.payments.find((p) => p.id === paymentId);
    if (!payment) {
      return null;
    }

    return payment;
  }

  async updateDebtPayment(
    debtId: string,
    paymentId: string,
    amount: number,
  ): Promise<DebtPayment> {
    const debt = await this.findDebtById(debtId);
    if (!debt) {
      return null;
    }

    const payment = debt.payments.find((p) => p.id === paymentId);
    if (!payment) {
      return null;
    }

    payment.amount = amount;
    return this.debtPaymentRepository.save(payment);
  }

  async deleteDebtPayment(debtId: string, paymentId: string): Promise<void> {
    const debt = await this.findDebtById(debtId);
    if (!debt) {
      return null;
    }

    const paymentIndex = debt.payments.findIndex((p) => p.id === paymentId);
    if (paymentIndex === -1) {
      return null;
    }

    debt.payments.splice(paymentIndex, 1);
    await this.debtRepository.save(debt);
  }
}
