import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { DebtPayment } from './debt_payment.entity';

@Entity()
export class Debt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  motif: string;

  @Column()
  amount: number;

  @Column()
  remainingAmount: number;

  @Column()
  dueDate: Date;

  @Column()
  debtType: string;

  @Column()
  userId: string;

  @Column()
  eventBudgetId: string;

  @OneToMany(() => DebtPayment, (payment) => payment.debt)
  payments: DebtPayment[];
}
