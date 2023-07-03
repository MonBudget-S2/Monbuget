import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Debt } from './debt.entity';
@Entity()
export class DebtPayment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({ type: 'boolean', default: false })
  isReceived: boolean;

  @ManyToOne(() => Debt, (debt) => debt.payments)
  debt: Debt;
}
