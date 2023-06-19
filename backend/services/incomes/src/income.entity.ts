import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Income {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  type: string;

  @Column()
  amount: number;

  @Column()
  date: Date;
}
