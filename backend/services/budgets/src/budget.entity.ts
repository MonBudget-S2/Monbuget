import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Budget {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  amount: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  userId: string;

  @Column()
  categoryId: string;
}
