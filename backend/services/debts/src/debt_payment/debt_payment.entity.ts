import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class DebtPayment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @Column()
  date: Date;

  @Column()
  debtId: string;
}
