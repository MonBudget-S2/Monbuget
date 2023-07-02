import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { DebtPayment } from './debt_payment.entity';

@Entity()
export class Debt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  motif: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column('decimal', { precision: 10, scale: 2 })
  remainingAmount: number;

  @Column({ nullable: true })
  dueDate: Date;

  @Column({ nullable: true })
  debtType: string;

  @Column()
  debtorId: string;

  @Column()
  creditorId: string;

  @Column()
  eventBudgetId: string;

  @OneToMany(() => DebtPayment, (payment) => payment.debt, { eager: true })
  payments: DebtPayment[];
}
