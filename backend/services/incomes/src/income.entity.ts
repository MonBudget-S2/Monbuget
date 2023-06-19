import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IncomeType } from './income.enum';

@Entity()
export class Income {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column({
    type: 'enum',
    enum: IncomeType,
    default: IncomeType.SALAIRE,
  })
  type: IncomeType;

  @Column()
  amount: number;

  @Column()
  date: Date;
}
