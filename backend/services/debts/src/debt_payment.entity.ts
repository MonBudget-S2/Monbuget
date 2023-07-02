import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Debt } from './debt.entity';
@Entity()
export class DebtPayment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @Column()
  date: Date;

  @Column()
  isReceived: boolean;

  @ManyToOne(() => Debt, (debt) => debt.payments)
  debt: Debt;
}
